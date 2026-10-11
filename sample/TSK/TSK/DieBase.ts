/**
 * TSK Extended Header 基底類別。
 *
 * 傳入的 Uint8Array 可為原始檔案的 subarray 檢視，
 * 所有 setter 都會直接修改底層的二進位資料。
 */
export abstract class ExtendedHeaderBase {
    /** Extended Header 區塊的原始位元組。 */
    public readonly currentBytes: Uint8Array;

    /**
     * 多位元組整數的位元組順序。
     * true = Little Endian；false = Big Endian。
     * 原始 C# 未提供 ByteArrayToInteger 的實作，請依 Generic 的定義確認。
     */
    protected readonly littleEndian: boolean;

    constructor(extendedHeaderBlock: Uint8Array, littleEndian = true) {
        this.currentBytes = extendedHeaderBlock;
        this.littleEndian = littleEndian;
    }

    /** 依 Extended Header 起點的相對位移讀取無號整數。 */
    protected readUInt32(offset: number): number {
        this.ensureRange(offset, 4);
        return new DataView(
            this.currentBytes.buffer,
            this.currentBytes.byteOffset,
            this.currentBytes.byteLength,
        ).getUint32(offset, this.littleEndian);
    }

    /** 依 Extended Header 起點的相對位移寫入無號整數。 */
    protected writeUInt32(offset: number, value: number): void {
        this.ensureRange(offset, 4);
        if (!Number.isInteger(value) || value < 0 || value > 0xFFFFFFFF) {
            throw new RangeError(`Unsigned 32-bit integer out of range: ${value}`);
        }
        new DataView(
            this.currentBytes.buffer,
            this.currentBytes.byteOffset,
            this.currentBytes.byteLength,
        ).setUint32(offset, value, this.littleEndian);
    }

    /** 讀取 2-byte 無號整數。 */
    protected readUInt16(offset: number): number {
        this.ensureRange(offset, 2);
        return new DataView(
            this.currentBytes.buffer,
            this.currentBytes.byteOffset,
            this.currentBytes.byteLength,
        ).getUint16(offset, this.littleEndian);
    }

    /** 寫入 2-byte 無號整數。 */
    protected writeUInt16(offset: number, value: number): void {
        this.ensureRange(offset, 2);
        if (!Number.isInteger(value) || value < 0 || value > 0xFFFF) {
            throw new RangeError(`Unsigned 16-bit integer out of range: ${value}`);
        }
        new DataView(
            this.currentBytes.buffer,
            this.currentBytes.byteOffset,
            this.currentBytes.byteLength,
        ).setUint16(offset, value, this.littleEndian);
    }

    protected ensureRange(offset: number, length: number): void {
        if (!Number.isInteger(offset) || offset < 0 || offset + length > this.currentBytes.byteLength) {
            throw new RangeError(`Invalid Extended Header byte range: ${offset}..${offset + length}`);
        }
    }

    /**
     * 讀取 5 組各 2 Byte ASCII 數字（yy MM dd HH mm）。
     * 原始 C# 中此欄位屬於「暫時未用到」；這裡提供可直接使用的實作。
     */
    protected readDateTime(offset: number): Date {
        this.ensureRange(offset, 10);
        const str = new TextDecoder('ascii').decode(this.currentBytes.subarray(offset, offset + 10));
        if (!/^\d{10}$/.test(str)) {
            throw new RangeError(`Invalid yyMMddHHmm value: ${str}`);
        }
        const year2 = Number(str.slice(0, 2));
        // 兩位年份解讀規則採用 2000–2099；與 C# ParseExact 的文化設定可能不同。
        const year = 2000 + year2;
        const month = Number(str.slice(2, 4));
        const day = Number(str.slice(4, 6));
        const hour = Number(str.slice(6, 8));
        const minute = Number(str.slice(8, 10));
        const date = new Date(year, month - 1, day, hour, minute);
        if (date.getFullYear() !== year || date.getMonth() !== month - 1 ||
            date.getDate() !== day || date.getHours() !== hour || date.getMinutes() !== minute) {
            throw new RangeError(`Invalid yyMMddHHmm date: ${str}`);
        }
        return date;
    }

    protected writeDateTime(offset: number, value: Date): void {
        this.ensureRange(offset, 10);
        if (Number.isNaN(value.getTime()) || value.getFullYear() < 2000 || value.getFullYear() > 2099) {
            throw new RangeError('Date must be valid and between 2000 and 2099');
        }
        const two = (v: number) => v.toString().padStart(2, '0');
        const formatted = two(value.getFullYear() % 100) + two(value.getMonth() + 1) +
            two(value.getDate()) + two(value.getHours()) + two(value.getMinutes());
        this.currentBytes.set(new TextEncoder().encode(formatted), offset);
    }

    //#region Wafer Test Time / Continuous Fail（原 C# 暫時未用到）

    /** Wafer Test Start Time。開始位置 [20]，長度 [10] Byte。 */
    get waferTestStartTime(): Date { return this.readDateTime(20); }
    set waferTestStartTime(value: Date) { this.writeDateTime(20, value); }

    /** Wafer Test End Time。開始位置 [32]，長度 [10] Byte。 */
    get waferTestEndTime(): Date { return this.readDateTime(32); }
    set waferTestEndTime(value: Date) { this.writeDateTime(32, value); }

    /** Continuous Fail。開始位置 [44]，長度 [2] Byte。 */
    get continuousFail(): number { return this.readUInt16(44); }
    set continuousFail(value: number) { this.writeUInt16(44, value); }

    //#endregion

    //#region Wafer Test Result

    /** Wafer Test Result Tested Die。開始位置 [52]，長度 [4] Byte。 */
    get waferTestResultTestedDie(): number { return this.readUInt32(52); }
    set waferTestResultTestedDie(value: number) { this.writeUInt32(52, value); }

    /** Wafer Test Result Pass Die。開始位置 [56]，長度 [4] Byte。 */
    get waferTestResultPassDie(): number { return this.readUInt32(56); }
    set waferTestResultPassDie(value: number) { this.writeUInt32(56, value); }

    /** Wafer Test Result Fail Die。開始位置 [60]，長度 [4] Byte。 */
    get waferTestResultFailDie(): number { return this.readUInt32(60); }
    set waferTestResultFailDie(value: number) { this.writeUInt32(60, value); }

    //#endregion

    //#region Special User / Multiple Pass Probing（原 C# 暫時未用到）

    /** Special User Fail 1 Die。開始位置 [64]，長度 [4] Byte。 */
    get waferTestResultForSpecialUserFail1Die(): number { return this.readUInt32(64); }
    set waferTestResultForSpecialUserFail1Die(value: number) { this.writeUInt32(64, value); }

    /** Special User Fail 2 Die。開始位置 [68]，長度 [4] Byte。 */
    get waferTestResultForSpecialUserFail2Die(): number { return this.readUInt32(68); }
    set waferTestResultForSpecialUserFail2Die(value: number) { this.writeUInt32(68, value); }

    /** Before Direct Total Die。開始位置 [72]，長度 [4] Byte。 */
    get testResultOfNormalOrMutiPassProbingBeforeDirectTotalDie(): number { return this.readUInt32(72); }
    set testResultOfNormalOrMutiPassProbingBeforeDirectTotalDie(value: number) { this.writeUInt32(72, value); }

    /** Before Direct Pass Die。開始位置 [76]，長度 [4] Byte。 */
    get testResultOfNormalOrMutiPassProbingBeforeDirectPassDie(): number { return this.readUInt32(76); }
    set testResultOfNormalOrMutiPassProbingBeforeDirectPassDie(value: number) { this.writeUInt32(76, value); }

    /** Before Direct Fail Die。開始位置 [80]，長度 [4] Byte。 */
    get testResultOfNormalOrMutiPassProbingBeforeDirectFailDie(): number { return this.readUInt32(80); }
    set testResultOfNormalOrMutiPassProbingBeforeDirectFailDie(value: number) { this.writeUInt32(80, value); }

    /** Multiple Pass Total Die。開始位置 [84]，長度 [4] Byte。 */
    get testResultOfNormalOrMutiPassProbingTotalDie(): number { return this.readUInt32(84); }
    set testResultOfNormalOrMutiPassProbingTotalDie(value: number) { this.writeUInt32(84, value); }

    /** Multiple Pass Pass Die。開始位置 [88]，長度 [4] Byte。 */
    get testResultOfNormalOrMutiPassProbingPassDie(): number { return this.readUInt32(88); }
    set testResultOfNormalOrMutiPassProbingPassDie(value: number) { this.writeUInt32(88, value); }

    /** Multiple Pass Fail Die。開始位置 [92]，長度 [4] Byte。 */
    get testResultOfNormalOrMutiPassProbingFailDie(): number { return this.readUInt32(92); }
    set testResultOfNormalOrMutiPassProbingFailDie(value: number) { this.writeUInt32(92, value); }

    //#endregion
}
