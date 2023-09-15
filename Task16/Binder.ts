// 写一个 binder，解决代码调用的错误问题
class Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    speak() {
        console.log(`Hello, my name is ${this.name}`);
    }

    binder(this: Object, func: Function) {
        return func.bind(this);
    }
}

class Dog extends Animal {
    speak() {
        console.log(`Hello, my name is ${this.name} and I'm a dog`);
    }
}

const dog = new Dog("Fido");
const speak = dog.binder(dog.speak);
speak();
