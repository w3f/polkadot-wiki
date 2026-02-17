import importlib
import sys
import types
import unittest
from pathlib import Path


def load_rpc_module():
    # Keep tests independent from substrate-interface installation.
    fake_substrate = types.ModuleType("substrateinterface")

    class FakeSubstrateInterface:
        def __init__(self, url):
            self.url = url

    fake_substrate.SubstrateInterface = FakeSubstrateInterface
    sys.modules["substrateinterface"] = fake_substrate

    repo_root = str(Path(__file__).resolve().parents[1])
    if repo_root not in sys.path:
        sys.path.insert(0, repo_root)

    if "macros.rpc" in sys.modules:
        del sys.modules["macros.rpc"]

    return importlib.import_module("macros.rpc")


class HumanReadableTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.rpc = load_rpc_module()

    def test_human_readable_uses_short_precision_by_default_for_dot(self):
        self.assertEqual(self.rpc.human_readable(10, 12345678901), "1.23")

    def test_human_readable_keeps_full_precision_when_not_rounded_for_dot(self):
        self.assertEqual(
            self.rpc.human_readable(10, 12345678901, rounded=False),
            "1.2345678901",
        )

    def test_human_readable_keeps_full_precision_for_small_values(self):
        self.assertEqual(
            self.rpc.human_readable(10, 12345, rounded=False),
            "0.0000012345",
        )

    def test_format_precise_dot_uses_full_precision(self):
        self.assertEqual(
            self.rpc.format(12345678901, "precise_dot"),
            "1.2345678901 DOT",
        )


if __name__ == "__main__":
    unittest.main()
