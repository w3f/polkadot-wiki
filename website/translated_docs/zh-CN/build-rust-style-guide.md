---
id: build-rust-style-guide
title: Style Guide for Rust in Polkadot
sidebar_label: Style Guide for Rust in Polkadot
---

- 使用制表符缩进
- 只有在特殊情况下，每行才应该超过80个字符但当然不能超过120个。为此，制表符应为4个字符宽度。
- 只有在特殊情况下，缩排格数才应该大于5，但当然不能大于8。大于5时，可以考虑使用let或辅助函数来删除复杂的内联表达式。
- 切勿在非空格字符之前的行中输入空格
- 下一行与原始行之间只有一个缩进。
```rust
fn calculation(some_long_variable_a: i8, some_long_variable_b: i8) -bool {
 let x = some_long_variable_a * some_long_variable_b
        - some_long_variable_b / some_long_variable_a
        + sqrt(some_long_variable_a) - sqrt(some_long_variable_b);
 x 10
}
```
- 应在左括号后输入缩进格数，但应折叠为实际使用的最小格数：
```rust
fn calculate(
 some_long_variable_a: f32,
 some_long_variable_b: f32,
 some_long_variable_c: f32,
) -f32 {
 (-some_long_variable_b + sqrt(
     // 这里有两个左括号，但因为我们把对应的两个右括号放在同一行，所以只需要缩进一级
     some_long_variable_b * some_long_variable_b
        - 4 * some_long_variable_a * some_long_variable_c
 // 两个括号都在这里结束了，所以回到最初的缩进级别
 )) / (2 * some_long_variable_a)
}
```
- `where`及其项需
- 过长的参数列表或函数调用无法在一行中使用，需缩进为与代码区块类似。一旦某参数被以这种方式缩进，那么其它所有参数都应该进行相同操作。此外，运行参数列表也适用于基础函数调用的单行运行。

```rust
// OK
fn foo(
    really_long_parameter_name_1: SomeLongTypeName,
    really_long_parameter_name_2: SomeLongTypeName,
    shrt_nm_1: u8,
    shrt_nm_2: u8,
) {
   ...
}

// NOT OK
fn foo(really_long_parameter_name_1: SomeLongTypeName, really_long_parameter_name_2: SomeLongTypeName,
    shrt_nm_1: u8, shrt_nm_2: u8) {
   ...
}

```

```rust
{
    // 符合语句（不仅有函数调用，还有一个let声明），采用完整结构
    let (a, b) = bar(
        really_long_parameter_name_1,
        really_long_parameter_name_2,
        shrt_nm_1,
        shrt_nm_2,
    );

    // 很长，但仅是函数调用
    waz(
        really_long_parameter_name_1, 
        really_long_parameter_name_2,
        shrt_nm_1, 
        shrt_nm_2,
    );

    // 短的函数调用
    baz(a, b);
}
```

- 合理情况下，逗号分隔的多行集合永远以“ ,”结尾：
```rust
struct Point<T{
 x: T,
 y: T,    // <-- 多行的逗号分隔的列表，用“,”结尾
}

// 单行的不需要用“,”结尾
enum Meal { Breakfast, Lunch, Dinner };
```

- 避免在不需要的地方使用 “;”结尾。
```rust
if condition {
 return 1    // <--这里不需要“；”
}
```

- `match` arm可以是采用代码块，也可以用结尾符号，但不要同时使用两种表现方式。
- 必要时才使用区块。
```rust
match meal {
 Meal::Breakfast ="eggs",
 Meal::Lunch ={ check_diet(); recipe() },
//  Meal::Dinner ={ return Err("Fasting") }   // 错误的方式
 Meal::Dinner =return Err("Fasting"),
}
```
