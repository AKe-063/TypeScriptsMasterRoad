// 实现一个 parallelLimit 函数，接收三个参数：一个异步函数数组，
// 一个并发限制数 limit 和一个可选的参数 timeout。parallelLimit 函数会并发地执行异步函数数组中的所有函数，并
// 且限制并发数量。如果某个异步函数执行时间超过了 timeout 参数指定的时间，则该异步函数会被取消执行，
// 并且返回一个 Promise 对象，拒绝原因为字符串 "timeout"

import { rejects } from "assert";
import { time } from "console";

let cancelFn = false;
// 函数签名：
async function parallelLimit<T>(fnArray: (() => Promise<T>)[], limit: number, timeout?: number): Promise<T[]> {
    setTimeout(() => {
        cancelFn = true;
    }, timeout);

    let results: T[] = [];
    const newTaskQueue = fnArray.map((item) => {
        return async () => {
            try {
                const result = await item();
                results.push(result);
                console.log(result);
            } catch (error) {
                console.log(error);
            }
        };
    });

    // 构建并发组
    let newParallelTask = Array.from({ length: Math.ceil(newTaskQueue.length / limit) }, (_, index) => {
        return newTaskQueue.slice(index * limit, (index + 1) * limit);
    });
    for (const task of newParallelTask) {
        await Promise.allSettled(task.map((fn) => fn()));
    }

    return results;
}

async function mockAsyncTask(i: number): Promise<number> {
    const time = Math.random() * 1000 + 1000;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (cancelFn) reject(`timeout`);
            else resolve(i);
        }, time);
    });
}

async function test() {
    const fnArray = [1, 2, 3, 4, 5].map((i) => () => mockAsyncTask(i));
    const result = await parallelLimit(fnArray, 2, 2000);
    console.log(result); // [3, 1, 2, 4, 5] 不知道什么顺序
}

test();
