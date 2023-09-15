// 请实现一个函数 createDeepProxy，可以对一个对象进行深度监听，并在对象的任意属性被读取或设置时触发回调函数。具体要求如下：
// 使用 Proxy 对象来实现深度监听对象。
// 回调函数的参数包括：被读取/设置的属性名、属性的旧值和新值。
// 要求监听对象的子对象也能够触发回调函数

function createDeepProxy<T extends Object>(obj: T, handler: (prop: any, inOldValue: any, inNewValue: any) => void) {
    return new Proxy(obj, {
        get(target, prop): any {
            const type = typeof target[prop as keyof T];
            if (type === "object" && type !== null && !Array.isArray(target[prop as keyof T]))
                return createDeepProxy((target as unknown as any)[prop], handler);
            return Reflect.get(target, prop);
        },
        set(target, prop, inNewValue) {
            if (target.hasOwnProperty(prop)) handler(prop as keyof T, target[prop as keyof T], inNewValue);
            return Reflect.set(target, prop, inNewValue);
        },
    });
}

// 测试代码
const obj = {
    name: "Tom",
    age: 18,
    info: {
        address: "Beijing",
    },
};

const proxy = createDeepProxy(obj, (prop, oldValue, newValue) => {
    console.log(`属性 ${prop} 从 ${oldValue} 变成了 ${newValue}`);
});

proxy.name = "Jerry"; // 属性 name 从 Tom 变成了 Jerry
proxy.age = 19; // 属性 age 从 18 变成了 19
proxy.info.address = "Shanghai"; // 属性 info.address 从 Beijing 变成了 Shanghai
