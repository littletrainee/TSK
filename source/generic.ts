declare global {
    interface Uint8Array {
        /**
         * @description 從 `Uint8Array` 中提取指定範圍的資料。
         * @param startIndex 陣列中開始的位置
         * @param length 所需的範圍
         * @returns 返回包含指定範圍的新的陣列
         */
        subUint8Array(startIndex: number, length?: number): Uint8Array;
        /**
         * @description 將 `Uint8Array` 轉換為 `string`
         * @returns `ASCII` 的 `string`
         */
        toASCIIString(): string;
        /**
         * @description 將 `Uint8Array` 轉換為 `number`
         * @returns `number`
         */
        toNumber(): number;
    }
    interface String {
        /**
         * @description `string` 轉換為長度 `length` 的 `Uint8Array`
         * @param length `Uint8Array` 的長度
         * @returns `Uint8Array`
         */
        toUint8Array(length: number): Uint8Array;
    }
    interface Number {
        /**
         * @description `number` 轉換為長度 `length` 的 `Uint8Array`
         * @param length `Uint8Array` 的長度
         * @returns `Uint8Array`
         */
        toUint8Array(length?: number): Uint8Array;
    }
}

Uint8Array.prototype.subUint8Array = function (
    startIndex: number,
    length?: number,
): Uint8Array {
    return this.slice(
        startIndex,
        length === undefined ? undefined : startIndex + length,
    );
};

Uint8Array.prototype.toASCIIString = function (): string {
    return new TextDecoder().decode(this).trim();
};

Uint8Array.prototype.toNumber = function (): number {
    return Buffer.from(this).readUIntBE(0, this.length);
};

String.prototype.toUint8Array = function (length: number): Uint8Array {
    const result = new Uint8Array(length);
    const copyLength = Math.min(this.length, length);
    for (let i = 0; i < copyLength; i++) {
        // 取出 ASCII 編碼（若超出 0-127 範圍則會截斷為 8-bit）
        result[i] = this.charCodeAt(i) & 0xff;
    }
    return result;
};

Number.prototype.toUint8Array = function (
    this: number,
    length: number = 1,
): Uint8Array {
    const result = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
        const shift = (length - 1 - i) * 8;
        result[i] = shift < 32 ? (this >>> shift) & 0xff : 0;
    }
    return result;
};

export {};
