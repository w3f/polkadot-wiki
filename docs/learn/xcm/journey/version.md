---
id: learn-xcm-docs-journey-version
title: Version Subscription
sidebar_label: Version Subscription
description: Get Notified about XCM Version Updates.
keywords: [xcm, cross-consensus messaging, version]
slug: ../journey-version
---

# Version Subscription

XCM is a versioned messaging format. One version may contain more or different instructions than
another, so for parties to communicate via XCM, it is important to know which version the other
party is using. XCM enables a version subscription model, where parties can subscribe to each other
to get notified of version updates. XCM has two instructions to enable this:

- `SubscribeVersion`
- `UnsubscribeVersion`

The version subscription model can differ per XCVM implementation. The `xcm-executor` has a
`SubscriptionService` [config item](../executor_config/config.md#subscriptionservice). Any type
specified as the `SubscriptionService` must implement the `VersionChangeNotifier` trait. The XCM
pallet is one such implementor. When the `SubscribeVersion` instruction is sent to a consensus
system that uses the XCM pallet as the `SubscriptionService` in the XCM executor, the system will
send back its currently `AdvertisedVersion` and will keep the subscribed location up to date when
the version changes. The subscribed location can unsubscribe to version changes by sending the
`UnsubscribeVersion` instruction.

```rust
SubscribeVersion {
    #[codec(compact)]
    query_id: QueryId,
    max_response_weight: Weight,
}

UnsubscribeVersion
```

Check out the [example](https://github.com/paritytech/xcm-docs/tree/main/examples).
