function catchError(target: any) {
    const orgMethods = Object.getOwnPropertyNames(target.prototype).filter(
        (item) => target.prototype[item] instanceof Function && item !== "constructor",
    );

    orgMethods.forEach((orgMethodName) => {
        const orgMethod = target.prototype[orgMethodName];
        target.prototype[orgMethod] = function (...args: any[]) {
            try {
                return orgMethod.apply(this, args);
            } catch (error) {
                console.error(`Error called by ${orgMethod}.`);
                return;
            }
        };
    });
}

@catchError
class Calculator {
    public add(a: number, b?: number): number {
        if (b === undefined) {
            throw new Error(`b: ${b}`);
        }

        return a + b;
    }
}

const calculator = new Calculator();
console.log(calculator.add(1, 2)); // 3
calculator.add(2); // catch
