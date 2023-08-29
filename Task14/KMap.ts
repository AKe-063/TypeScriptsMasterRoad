// 自己实现一个 Map，要求实现如下方法，不允许使用原生 Map，需要手动计算哈希值，并在有冲突的时候解决哈希冲突（任选一种）
class ValuePair<K, V> {
    constructor(public key: K, public value: V) {}

    toString() {
        return `[#${this.key}: ${this.value}]`;
    }
}

interface IKMap<K, V> {
    hasKey(key: K): boolean;
    set?(key: K, value: V): boolean;
    put?(key: K, value: V): boolean;
    hashCode?(key: K): number;
    remove(key: K): boolean;
    get(key: K): V | undefined;
    keyValues(): ValuePair<K, V>[];
    keys(): K[];
    values(): V[];
    forEach(callbackFn: (key: K, value: V) => any): void;
    size(): number;
    isEmpty(): boolean;
    clear(): void;
    toString(): string;
}

class KMap<K, V> implements IKMap<K, V> {
    private table: { [hashCode: number]: ValuePair<K, V> } = {};

    public constructor(public pairs: [K, V][] = []) {
        pairs.forEach((pair) => {
            this.set(pair[0], pair[1]);
        });
    }

    hasKey(key: K): boolean {
        return this.table[this.hashCode(key)] != undefined;
    }

    set(key: K, value: V): boolean {
        this.table[this.hashCode(key)] = new ValuePair(key, value);
        return true;
    }

    // 直接找一个现成的，好的 hash 函数，省一半冲突
    hashCode(key: K): number {
        if (typeof key === "number") {
            return key;
        }

        const tableKey = toStringFunc(key);
        let hash = 5381;
        for (let i = 0; i < tableKey.length; i++) {
            hash = hash * 33 + tableKey.charCodeAt(i);
        }
        return hash % 1013;
    }

    remove(key: K): boolean {
        const hashCode = this.hashCode(key);
        if (this.table[hashCode] === undefined) return false;

        delete this.table[hashCode];
        return true;
    }

    get(key: K): V | undefined {
        return this.table[this.hashCode(key)]?.value;
    }

    keyValues(): ValuePair<K, V>[] {
        let result: ValuePair<K, V>[] = [];
        Object.keys(this.table).forEach((key) => {
            result.push(new ValuePair(this.table[parseFloat(key)].key, this.table[parseFloat(key)].value));
        });
        return result;
    }

    keys(): K[] {
        return Object.keys(this.table)
            .map((key) => parseFloat(key))
            .map((key) => this.table[key].key);
    }

    values(): V[] {
        return Object.keys(this.table)
            .map((key) => parseFloat(key))
            .map((key) => this.table[key].value);
    }

    forEach(callbackFn: (key: K, value: V) => any): void {
        Object.keys(this.table)
            .map((hashCode) => parseFloat(hashCode))
            .forEach((hashCode) => {
                callbackFn(this.table[hashCode].key, this.table[hashCode].value);
            });
    }

    size(): number {
        return Object.keys(this.table).length;
    }

    isEmpty(): boolean {
        return Object.keys(this.table).length === 0;
    }

    clear(): void {
        this.table = {};
    }

    toString(): string {
        return Object.keys(this.table)
            .map((hashCode) => parseFloat(hashCode))
            .reduce((accumulator, hashCode) => {
                return accumulator + this.table[hashCode].toString();
            }, ``);
    }
}

function toStringFunc(item: any): string {
    if (item === null) {
        return "null";
    } else if (item === undefined) {
        return "undefined";
    } else if (typeof item === "string" || item instanceof String) {
        return `${item}`;
    }
    return item.toString();
}

const a = new KMap<number, number>([
    [1, 1],
    [2, 2],
]);

a.forEach((key, value) => {
    console.log(key + "\t" + value);
});
