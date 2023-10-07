// 给定 5 个 txt 文件，内容自定义，要求异步读取其中的数据，并当所有内容都加载完后，
// 异步写到另外一个文件中，要求了解 await 和 async，并包含异常处理，要求使用 promiseAll
import fs from "fs";
import path from "path";

const FILES_FOLD_PATH = path.dirname(__filename).replace(/\\/g, `/`).replace(`/src`, ``) + `/readFile`;
const PATHS = fs.readdirSync(FILES_FOLD_PATH).map((path) => FILES_FOLD_PATH + `/` + path);
const WRITE_FILE_PATH = path.dirname(__filename).replace(/\\/g, `/`).replace(`/src`, ``) + `/total.txt`;

async function readFileAsync(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
        fs.readFile(path, "utf8", (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

async function readFiles() {
    try {
        let data: string[] = [];
        data.push(await readFileAsync(PATHS[0]));
        data.push(await readFileAsync(PATHS[1]));
        data.push(await readFileAsync(PATHS[2]));
        data.push(await readFileAsync(PATHS[3]));
        data.push(await readFileAsync(PATHS[4]));
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
}
// readFiles();

Promise.all([
    readFileAsync(PATHS[0]),
    readFileAsync(PATHS[1]),
    readFileAsync(PATHS[2]),
    readFileAsync(PATHS[3]),
    readFileAsync(PATHS[4]),
]).then((values) => {
    console.log(values);
    const content = values.join();
    fs.writeFile(WRITE_FILE_PATH, content, "utf8", (err) => {
        if (err) {
            console.log(`write file failed.`);
            return;
        }
        console.log(`write file successfully.`);
    });
});
