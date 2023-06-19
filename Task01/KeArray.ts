function testArr(){
    let arr = [1,2,3,4,5,6,7,8,9,10];

    // foreach
    arr.forEach((value, index) => {
        console.log(`value: ${value}, index: ${index}`);
    });

    // concat
    const arr2 = [11,12,13,14,15];
    const arr3 = arr.concat(arr2);
    console.log(arr3);

    // copyWithin
    arr = [1,2,3,4,5,6,7,8,9,10];
    arr.copyWithin(0, 3, 5);
    console.log(arr);

    // filter
    console.log(arr.filter((value, index) => value > 5 && index > 5));

    // map
    const arr4 = arr.map((value, index) => value + index);
    console.log(arr4);

    // shift
    const firstEle = arr.shift();
    console.log(firstEle);

    // unshift
    console.log(arr);
    arr.unshift(10086);
    console.log(arr);

    // reduce
    const sum = arr.reduce((prev, cur, index) => prev + cur + index, 10000);
    console.log(sum);

    // reverse
    arr.reverse();
    console.log(arr);

    // flat
    const arr5 = [1,2, ,9,10, [11,12,[13, ,14],15]];
    console.log(arr5.flat());
    console.log(arr5.flat(-1));
    console.log(arr5.flat(Infinity));

    // findIndex
    console.log(arr.findIndex((value, index) => value > 5 && index > 5));

    // find
    console.log(arr.find((value, index) => value > 5 && index > 5));

    // some
    console.log(arr.some((value, index) => value > 5 && index > 5));

    // every
    console.log(arr.every((value, index) => value > -1 && index < 100));

    // sort
    console.log(arr.sort((a, b) => a - b));

    // slice
    console.log(arr.slice(0, -5));

    // splice
    console.log(arr.splice(0, 5, 20086, 20010));
    console.log(arr);
}

testArr();