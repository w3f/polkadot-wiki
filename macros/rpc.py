"""
Polkadot Wiki Macro functionality with connection caching
"""

import substrateinterface
import os
from functools import lru_cache

# Global connection cache to reuse connections by network
_connection_cache = {}

def enable_rpc():
    return os.environ.get("ENABLE_RPC", "false") == "true"

def format(value, filter):
    match filter:
        case "percentage":
            return f"{value / 10000}%"
        case "human_readable":
            return f"{human_readable(10, value)} DOT"
        case "human_readable_kusama":
            return f"{human_readable(12, value)} KSM"
        case "blocks_to_days":
            return str(blocks_to_days(value))
        case "precise_ksm":
            return f"{human_readable(12, value, rounded=False)} KSM"
        case "precise_dot":
            return f"{human_readable(10, value, rounded=False)} DOT"
        case _:
            return str(value)
        
def blocks_to_days(blocks): 
    return (blocks * 6) / 86400

def get_network_url(network):
    match network:
        case "polkadot":
            return "wss://rpc.polkadot.io"
        case "kusama":
            return "wss://kusama-rpc.publicnode.com"
        case "polkadot-assethub":
            return "wss://polkadot-asset-hub-rpc.polkadot.io"
        case "kusama-assethub":
            return "wss://kusama-asset-hub-rpc.polkadot.io"
        case "polkadot-people":
            return "wss://polkadot-people-rpc.polkadot.io"
        case "kusama-people":
            return "wss://kusama-people-rpc.polkadot.io"
        
def human_readable(decimals_amount, number, rounded=True):
    balance_str = str(number)

    # Keep full chain precision when rounded=False.
    if not rounded:
        display_decimals = decimals_amount
    elif decimals_amount == 10:  # DOT
        display_decimals = 2
    elif decimals_amount == 12:  # KSM
        display_decimals = 6
    else:
        display_decimals = 2  # Default to 2 decimals for other cases
    
    if len(balance_str) <= decimals_amount:
        # Add leading zeros if necessary
        padded_balance = "0" * (decimals_amount - len(balance_str)) + balance_str
        # Get the decimal representation with appropriate precision
        decimal_display = padded_balance[:display_decimals]
        return f"0.{decimal_display}" 
    else:
        # Split the string at the decimal point
        whole_part = balance_str[:-decimals_amount]
        decimal_part = balance_str[-decimals_amount:]
        
        # Limit decimal part to display_decimals
        decimal_display = decimal_part[:display_decimals]
        
        return f"{whole_part}.{decimal_display}"

def get_connection(network):
    """
    Get or create a connection to the specified network.
    Uses a cache to avoid creating multiple connections to the same network.
    """
    if network not in _connection_cache:
        url = get_network_url(network)
        _connection_cache[network] = substrateinterface.SubstrateInterface(url)
    return _connection_cache[network]

def close_connections():
    """
    Close all open connections in the cache.
    Should be called when processing of a page is complete.
    """
    for conn in _connection_cache.values():
        if hasattr(conn, 'close') and callable(conn.close):
            conn.close()
    _connection_cache.clear()

def query_chain(network, module, call, is_constant=False):
    """
    Query the chain for data, reusing connections when possible.
    """
    api = get_connection(network)
    result = None
    
    if is_constant:
        result = api.get_constant(module, call)
    else:
        result = api.query(module, call)
        
    return result.value if result and hasattr(result, 'value') else None

# Dictionary to store query results - further reduces RPC calls
# by caching results across multiple macro calls
_query_cache = {}

def cached_query(network, module, call, is_constant=False):
    """
    Cache query results to further reduce RPC calls
    """
    cache_key = f"{network}:{module}:{call}:{is_constant}"
    if cache_key not in _query_cache:
        _query_cache[cache_key] = query_chain(network, module, call, is_constant)
    return _query_cache[cache_key]

def define_env(env):
    # Reset the caches at the beginning of each page
    _connection_cache.clear()
    _query_cache.clear()
    
    # Track if we've registered atexit handler
    if not hasattr(define_env, '_atexit_registered'):
        import atexit
        atexit.register(close_connections)
        define_env._atexit_registered = True
    
    @env.macro
    def rpc(network, module, call, default_value, is_constant=False, readable=""):
        if enable_rpc():
            try:
                result = cached_query(network, module, call, is_constant)
                if result is None:
                    return "NOT_FOUND"
                return format(result, readable)
            except Exception as e:
                # Log the exception if needed
                return f"ERROR: {str(e)}"
        else:
            return "DEV_MODE"
