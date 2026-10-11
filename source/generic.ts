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
    // return new TextDecoder().decode(this).trim();
    let result = '';
    for(const byte of this){
        if (byte=== 0){
            continue;
        }
        result += String.fromCharCode(byte);
    }

    return result.trim();
};

Uint8Array.prototype.toNumber = function (): number {
    // return Buffer.from(this).readUIntBE(0, this.length);
    let result = 0;
    for(let i = 0; i < this.length;i++){
        result |= this[i] << (8 * (this.length - 1 - i));
    }

    return result;
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

/**
 * @description 從 `Uint8Array` 指定位置解析 TSK 日期資料。
 *
 * 日期格式為 `yyMMddHHmm`，共占用 `10 Byte`，
 * 每個日期欄位以 `2 Byte ASCII` 表示。
 *
 * 年份以 `2000` 為基準，例如 `26` 表示 `2026` 年。
 *
 * @param bytes TSK 原始二進位資料
 * @param offset 日期資料的起始位置
 * @returns 解析後的 `Date` 物件
 */
export function getDateTime(bytes : Uint8Array, offset : number) : Date{
    return new Date(
        Number(bytes.subUint8Array(offset, 2).toASCIIString()) + 2000,
        Number(bytes.subUint8Array(offset + 2, 2).toASCIIString()) - 1,
        Number(bytes.subUint8Array(offset + 4, 2).toASCIIString()),
        Number(bytes.subUint8Array(offset + 6, 2).toASCIIString()),
        Number(bytes.subUint8Array(offset + 8, 2).toASCIIString()),
    );
}

/**
 * @description 將 `Date` 物件轉換為 TSK 日期格式的 `Uint8Array`。
 *
 * 日期格式為 `yyMMddHHmm`，共占用 `10 Byte`，
 * 每個日期欄位以 `2 Byte ASCII` 表示。
 *
 * 例如 `2026/10/11 19:30` 轉換為 `2610111930`。
 *
 * @param value 要轉換的 `Date` 物件
 * @returns 長度為 `10 Byte` 的 ASCII `Uint8Array`
 */
export function getDateTimeString(value: Date): Uint8Array {
    const year = String(value.getFullYear() % 100).padStart(2, '0');
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const day = String(value.getDate()).padStart(2, '0');
    const hour = String(value.getHours()).padStart(2, '0');
    const minute = String(value.getMinutes()).padStart(2, '0');

    return `${year}${month}${day}${hour}${minute}`.toUint8Array(10);
}
export {};
