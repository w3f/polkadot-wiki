# XCM Simulator

Setting up a live network with multiple connected parachains for testing XCM is not straight
forward. The `xcm-simulator` was created as a solution to this problem. It's a network simulator
specifically designed for testing and tinkering with XCM. It uses mock runtimes for a relay chain
and parachains.

Although it's a great tool to learn and test XCMs, it shouldn't be the only thing you use to
actually test your XCM-powered solution. We'll get into tools and best practices for testing in the
[testing](../testing/index.md) chapter.

We'll use the simulator throughout the documentation to show different XCMs in action. In the next
section we will take a first look at an XCM.
