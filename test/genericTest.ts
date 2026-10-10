import "../source/generic.ts";

function subArrayTest() {
    const t1: Uint8Array = new Uint8Array([10, 20, 30, 40, 50, 60, 70]);
    console.log(t1);
    const t2: Uint8Array = t1.subArray(2, 3);
    console.log(t2);
}

function toASCIIString() {
    // Hello, World!
    const t1: Uint8Array = new Uint8Array([
        72,
        101,
        108,
        108,
        111,
        44,
        32,
        87,
        111,
        114,
        108,
        100,
        33,
    ]);
    console.log(t1);
    const t2: String = t1.toASCIIString();
    console.log(t2);
}

function toNumber() {
    const t1: Uint8Array = new Uint8Array([0, 5, 157, 128]);
    console.log(t1);
    const t2: number = t1.toNumber();
    console.log(t2);
}

function toUint8Array_String() {
    const t1: String = "Hello, World!";
    console.log(t1);
    const t2: Uint8Array = t1.toUint8Array(20);
    console.log(t2);
}

function toUint8Array() {
    const t1: number = 120;
    console.log(t1);
    const t2: Uint8Array = t1.toUint8Array(2);
    console.log(t2);
}

subArrayTest();
