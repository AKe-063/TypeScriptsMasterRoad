// 类装饰器
function classDecorator(target: any) {
    console.log(target);
}

// @classDecorator
// class ClassDecoratorExample {
//     public getName() {
//         return this.name;
//     }

//     private name: string;
// }