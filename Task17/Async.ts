// 给定 5 个 txt 文件，内容自定义，要求异步读取其中的数据，并当所有内容都加载完后，
// 异步写到另外一个文件中，要求了解 await 和 async，并包含异常处理，要求使用 promiseAll
import fs from "fs";

const readFilePaths = fs.readdirSync("./readFile");
console.log(readFilePaths);
