// 在上面的基础上，同样支持循环引用的对象
function deepCloneCircleRef<T extends Object>(proto: T, objWeakMap: WeakMap<Object, Object> = new WeakMap()): any {
    if (Array.isArray(proto)) return proto.map((element) => deepCloneCircleRef(element, objWeakMap));

    if (proto instanceof Map) {
        let copyMap = new Map();
        proto.forEach((value, key) =>
            copyMap.set(deepCloneCircleRef(key, objWeakMap), deepCloneCircleRef(value, objWeakMap)),
        );
        return copyMap;
    }

    if (typeof proto === `object`) {
        if (objWeakMap.has(proto)) return objWeakMap.get(proto);

        let copy: any = {};
        objWeakMap.set(proto, copy);
        Object.keys(proto).forEach((property) => {
            copy[property] = deepCloneCircleRef((proto as unknown as any)[property], objWeakMap);
        });
        return copy;
    }

    return proto;
}

// 循环引用对象
const obj7: any = { a: 1 };
obj7.b = obj7;
const cloned7 = deepCloneCircleRef(obj7);
console.log(cloned7.a); // 1
console.log(cloned7.b === cloned7); // true
