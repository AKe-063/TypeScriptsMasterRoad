// 实现一个 convert 函数，它接受一个数字或一个字符串，并根据输入的不同类型返回相应的结果：
// 如果输入是数字，返回该数字乘以 2 的结果；
// 如果输入是字符串，返回该字符串转为大写字母并用感叹号结尾的结果。

type OverloadType = number | string;

function convert(arg0: OverloadType) {
    if (typeof arg0 == "number") return arg0 * 2;
    if (typeof arg0 == "string") return arg0.toUpperCase();

    throw new Error("Type is illegal.");
}

console.log(convert(10)); // 输出 20
console.log(convert("hello")); // 输出 HELLO!
