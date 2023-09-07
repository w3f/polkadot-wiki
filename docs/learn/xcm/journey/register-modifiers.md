---
id: learn-xcm-docs-journey-register
title: Register Modifiers
sidebar_label: More Register Modifiers
description: More Instructions to Change the XCVM Registers.
keywords: [xcm, cross-consensus messaging, register]
slug: ../journey-register
---

# Register Modifiers

In the previous chapters we already saw instructions that modified the XCVM registers. This chapter
contains more instructions that change the XCVM registers. We will discuss the following
instructions:

- `SetErrorHandler`
- `SetAppendixHandler`
- `ClearError`
- `ClearTransactStatus`
- `SetTopic`
- `ClearTopic`

## SetErrorHandler

```rust
SetErrorHandler(Xcm<Call>)
```

The `SetErrorHandler` instructions is used to set the Error Handler Register. As discussed in the
[XCVM chapter](../fundamentals/xcvm.md), the Error Handler is executed when an error is thrown
during the regular instruction execution.

## SetAppendix

```rust
SetAppendix(Xcm<Call>)
```

The `SetAppendix` instruction is used to set the Appendix Register. As discussed in the
[XCVM chapter](../fundamentals/xcvm.md), the Appendix instructions are executed after the regular
and error handler instruction are executed. These instructions are executed regardless of whether an
error occurred.

## ClearError

```rust
ClearError
```

The `ClearError` instruction clears the Error Register by setting it to None.

## ClearTransactStatus

```rust
ClearTransactStatus
```

The `ClearTransactStatus` instruction sets the Transact Status Register to its default, cleared,
value.

## SetTopic

```rust
SetTopic([u8; 32])
```

The `SetTopic` instruction sets the Topic Register.

## ClearTopic

```rust
ClearTopic
```

The `ClearTopic` instruction clears the Topic Register.
