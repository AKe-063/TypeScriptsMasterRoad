import "reflect-metadata";

type keyType = StringConstructor | NumberConstructor;

function hasWithTypes(obj: any, key: string, type: keyType) {
    return Reflect.has(obj, key) && Reflect.get(obj, key) instanceof type;
}

class Example {
    public name: String = new String();
}

const example = new Example();

console.debug(hasWithTypes(example, "name", String)); // true
console.debug(hasWithTypes(example, "name", Number)); // false
console.debug(hasWithTypes(example, "age", Number)); // false
