type Filter1<T> = {
    [key in keyof T]: T[key];
};
type Filter2<T, U> = {
    [key in keyof T]: T[key] extends U ? T[key] : never;
};
type Fruit = "apple" | "banana" | "orange";
type Fruits = ["apple", "banana", "orange", "cherry"];
type OnlyFruits1 = Filter1<Fruit>; // ['apple', 'banana', 'orange']
type OnlyFruits2 = Filter2<Fruits, Fruit>;
