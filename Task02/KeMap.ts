function keys<T, U>(map: Map<T, U>) {
    let result: T[] = [];
    for (let key of map.keys()) {
        result.push(key);
    }
    return result;
}

function values<T, U>(map: Map<T, U>) {
    let result: U[] = [];
    for (let value of map.values()) {
        result.push(value);
    }
    return result;
}

function testMap(){
    const myMap = new Map([
        ['key1', 'value1'],
        ['key2', 'value2'],
        ['key3', 'value3']
      ]);
      console.log(keys(myMap));
      console.log(values(myMap));
}

testMap();