class Person1 {
    constructor(public name: string, public age: number) {}

    greet() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
}

(Person1.prototype as any).celebrateBirthday = function () {
    console.log(`Happy birthday ${this.name}, ! You are now ${this.age} years old.`);
};

const person1 = new Person1("Alice", 30) as any;
person1.greet(); // 输出 "Hello, my name is Alice and I am 30 years old."
person1.celebrateBirthday(); // 输出 "Happy birthday, Alice! You are now 31 years old."
person1.greet(); // 输出 "Hello, my name is Alice and I am 31 years old."
