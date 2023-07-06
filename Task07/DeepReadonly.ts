// 定义一个范型类型 DeepReadonly<T>，用来将类型 T 中的所有属性变为只读属性
type DeepReadonly<T> = {
    readonly [K in keyof T]: T[K] extends Object ? DeepReadonly<T[K]> : T[K];
};

interface Person {
    name: string;
    address: {
        city: string;
    };
}
type ReadonlyPerson = DeepReadonly<Person>;
let person: ReadonlyPerson = {
    name: `2`,
    address: {
        city: `1`,
    },
};
// person.address.city = `3`;  // 它是一个只读属性
