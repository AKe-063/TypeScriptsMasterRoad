// 实现一个 createArray 函数，它接受两个或三个参数，并根据输入参数的不同类型返回不同的函数签名：
// 如果输入参数有两个，它需要返回一个新的数组类型；
// 如果输入参数有三个，它需要返回一个新的函数类型，该函数接受一个数字类型的参数

function createArgsArray(...args: any) {
    let newArray: any[] = [];
    Array.from(args).forEach((arg) => {
        newArray = newArray.concat(arg);
    });
    return newArray;
}

function createArray(arg1: any, arg2: any): any[];
function createArray(arg1: any, arg2: any, arg3: any): (repeatCount: number) => any[];

function createArray(...args: any) {
    const func = (repeatCount: number) => {
        let newArray: any[] = [];
        let repeatSource = createArgsArray(...args);
        for (let i = 0; i < repeatCount; i++) newArray = newArray.concat(repeatSource);

        return newArray;
    };

    return args.length == 2 ? createArgsArray(...args) : func;
}

const arr1 = [1, 2, 3];
const arr2 = ["a", "b", "c"];

const newArr1 = createArray(arr1, arr2);
console.log(newArr1); // 输出 [1, 2, 3, "a", "b", "c"]

const newArr2 = createArray(1, "a", true)(3);
console.log(newArr2); // 输出 [1, "a", true, 1, "a", true, 1, "a", true]
