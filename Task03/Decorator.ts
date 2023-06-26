// 普通类装饰器
function ClassDecorator(target: any) {
    target.anyKey = "xx";
    console.log(target);
}

// 装饰器工厂
function ClassDecoratorFactory(name: string) {
    return function(target: any) {
        console.log(`Hello ${name} has Class name ${target["name"]}!`);
    }
}

// 属性装饰器
function PropertyDecorator(propertyName: string) {
    return function(target: any, propertyKey: string) {
        console.log(`propertyName: ${propertyName}, propertyKey: ${propertyKey}`);
        console.log("constructor name: " + target.constructor.name);
    }
}

// 方法装饰器
function FuncDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("FuncDecorator: ");
    console.log(target);
    console.log(propertyKey);
    console.log(descriptor);
}

// 参数装饰器
function ParamDecorator(target: any, propertyKey: string, parameterIndex: number) {
    console.log("ParamDecorator: ");
    console.log(target);
    console.log(propertyKey);
    console.log(parameterIndex);
}

// @ClassDecorator
@ClassDecoratorFactory("decoratorFactoryTest")
class ClassDecoratorExample {
    constructor(testName: string) {
        this.testName = testName;
    }

    @FuncDecorator
    public testFunc(@ParamDecorator testParam: number) {}

    @PropertyDecorator("PropertyDecoratorTest")
    public testName: string = "decorator";
}
