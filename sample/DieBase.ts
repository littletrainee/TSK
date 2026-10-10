import {
    DieTestResult,
    Marking,
    FailMarkInspection,
    ReProbingResult,
    NeedleMarkInspectionResult,
    DieProperty,
    NeedleMarkingInspectionExecutionDieSelection,
    SampleDie,
    CodeBit,
    DummyData,
    FinishFlag,
    BlockArea,
} from './enums.ts';

/**
 * ExtendedDieBase 在此類別實際需要的兩個屬性。
 * 正式專案可改為 import type { ExtendedDieBase } from './ExtendedDieBase.ts'。
 */
export interface ExtendedDieDataLike {
    mapVersion4ExtendedBinaryCategory: number;
    mapVersion4ExtendedTestExecutionSite: number;
}

/**
 * TSK Normal Map 的單一 Die（6 Bytes / 3 Words）。
 * 所有位元操作都直接修改來源 Uint8Array，沒有複製原始資料。
 */
export abstract class DieBase {
    /** 當前 Die 對應的 6 Bytes 共用檢視。 */
    public readonly currentBytes: Uint8Array;

    /** 當前 Die 的延伸資料；沒有時為 null。 */
    public extendedDieData: ExtendedDieDataLike | null = null;

    /**
     * @param source TSK 的原始二進位資料，或單一 Die 的 6 Bytes。
     * @param offset Die 在 source 中的起始 Byte 位置。
     */
    constructor(source: Uint8Array, offset: number = 0) {
        if (!Number.isSafeInteger(offset) || offset < 0 || offset + 6 > source.length) {
            throw new RangeError('DieBase: 需要從 offset 開始的完整 6 Bytes');
        }

        // subarray 是共享原始記憶體的 view；slice 才會複製。
        this.currentBytes = source.subarray(offset, offset + 6);
    }

    /** 從指定 Byte 的 mask 所在位置讀取無號位元欄位。 */
    private readBits(index: number, mask: number, shift: number): number {
        return (this.currentBytes[index]! & mask) >>> shift;
    }

    /** 修改指定 Bit，保留同一 Byte 的其他 Bit。 */
    private writeBits(index: number, mask: number, shift: number, value: number): void {
        const maxValue = mask >>> shift;
        if (!Number.isInteger(value) || value < 0 || value > maxValue) {
            throw new RangeError(`位元欄位值必須介於 0 與 ${maxValue} 之間：${value}`);
        }

        this.currentBytes[index] =
            (this.currentBytes[index]! & (~mask & 0xff)) |
            ((value << shift) & mask);
    }

    private setWord(start: number, value: Uint8Array): void {
        if (value.length !== 2) {
            throw new RangeError('Word 必須正好包含 2 Bytes');
        }
        this.currentBytes.set(value, start);
    }

    //#region First Word（Byte 0–1）

    /** 第 1 Byte，Bit 7–6：Die 的測試結果。 */
    get dieTestResult(): DieTestResult {
        return this.readBits(0, 0b11000000, 6) as DieTestResult;
    }
    set dieTestResult(value: DieTestResult) {
        this.writeBits(0, 0b11000000, 6, value);
    }

    /** 第 1 Byte，Bit 5：Marking。 */
    get marking(): Marking {
        return this.readBits(0, 0b00100000, 5) as Marking;
    }
    set marking(value: Marking) {
        this.writeBits(0, 0b00100000, 5, value);
    }

    /** 第 1 Byte，Bit 4：Fail Mark Inspection。 */
    get failMarkInspection(): FailMarkInspection {
        return this.readBits(0, 0b00010000, 4) as FailMarkInspection;
    }
    set failMarkInspection(value: FailMarkInspection) {
        this.writeBits(0, 0b00010000, 4, value);
    }

    /** 第 1 Byte，Bit 3–2：Re-Probing Result。 */
    get reProbingResult(): ReProbingResult {
        return this.readBits(0, 0b00001100, 2) as ReProbingResult;
    }
    set reProbingResult(value: ReProbingResult) {
        this.writeBits(0, 0b00001100, 2, value);
    }

    /** 第 1 Byte，Bit 1：Needle Mark Inspection Result。 */
    get needleMarkInspectionResult(): NeedleMarkInspectionResult {
        return this.readBits(0, 0b00000010, 1) as NeedleMarkInspectionResult;
    }
    set needleMarkInspectionResult(value: NeedleMarkInspectionResult) {
        this.writeBits(0, 0b00000010, 1, value);
    }

    /** 第 1 Byte Bit 0 + 第 2 Byte：9-bit X 座標絕對值。 */
    get dieCoordinatorX(): number {
        return (this.readBits(0, 0b00000001, 0) << 8) |
            this.currentBytes[1]!;
    }
    set dieCoordinatorX(value: number) {
        if (!Number.isInteger(value) || value < 0 || value > 0x1ff) {
            throw new RangeError('DieCoordinatorX 必須介於 0–511');
        }
        this.writeBits(0, 0b00000001, 0, value >>> 8);
        this.currentBytes[1] = value & 0xff;
    }

    /** 第 1 個 Word（2 Bytes），讀取會產生副本，寫入會覆寫原始資料。 */
    get firstWord(): Uint8Array {
        return this.currentBytes.slice(0, 2);
    }
    set firstWord(value: Uint8Array) {
        this.setWord(0, value);
    }

    //#endregion

    //#region Second Word（Byte 2–3）

    /** 第 3 Byte，Bit 7–6：Die Property。 */
    get dieProperty(): DieProperty {
        return this.readBits(2, 0b11000000, 6) as DieProperty;
    }
    set dieProperty(value: DieProperty) {
        this.writeBits(2, 0b11000000, 6, value);
    }

    /** 第 3 Byte，Bit 5：Needle Marking Inspection Execution Die Selection。 */
    get needleMarkingInspectionExecutionDieSelection(): NeedleMarkingInspectionExecutionDieSelection {
        return this.readBits(2, 0b00100000, 5) as NeedleMarkingInspectionExecutionDieSelection;
    }
    set needleMarkingInspectionExecutionDieSelection(value: NeedleMarkingInspectionExecutionDieSelection) {
        this.writeBits(2, 0b00100000, 5, value);
    }

    /** 第 3 Byte，Bit 4：Sampling Die。 */
    get samplingDie(): SampleDie {
        return this.readBits(2, 0b00010000, 4) as SampleDie;
    }
    set samplingDie(value: SampleDie) {
        this.writeBits(2, 0b00010000, 4, value);
    }

    /** 第 3 Byte，Bit 3：X 座標的正負號。 */
    get codeBitOfCoordinatorValueX(): CodeBit {
        return this.readBits(2, 0b00001000, 3) as CodeBit;
    }
    set codeBitOfCoordinatorValueX(value: CodeBit) {
        this.writeBits(2, 0b00001000, 3, value);
    }

    /** 第 3 Byte，Bit 2：Y 座標的正負號。 */
    get codeBitOfCoordinatorValueY(): CodeBit {
        return this.readBits(2, 0b00000100, 2) as CodeBit;
    }
    set codeBitOfCoordinatorValueY(value: CodeBit) {
        this.writeBits(2, 0b00000100, 2, value);
    }

    /** 第 3 Byte，Bit 1：Dummy Data。 */
    get dummyData(): DummyData {
        return this.readBits(2, 0b00000010, 1) as DummyData;
    }
    set dummyData(value: DummyData) {
        this.writeBits(2, 0b00000010, 1, value);
    }

    /** 第 3 Byte Bit 0 + 第 4 Byte：9-bit Y 座標絕對值。 */
    get dieCoordinatorY(): number {
        return (this.readBits(2, 0b00000001, 0) << 8) |
            this.currentBytes[3]!;
    }
    set dieCoordinatorY(value: number) {
        if (!Number.isInteger(value) || value < 0 || value > 0x1ff) {
            throw new RangeError('DieCoordinatorY 必須介於 0–511');
        }
        this.writeBits(2, 0b00000001, 0, value >>> 8);
        this.currentBytes[3] = value & 0xff;
    }

    /** 第 2 個 Word（2 Bytes）。 */
    get secondWord(): Uint8Array {
        return this.currentBytes.slice(2, 4);
    }
    set secondWord(value: Uint8Array) {
        this.setWord(2, value);
    }

    //#endregion

    //#region Third Word（Byte 4–5）

    /** 第 5 Byte，Bit 7：Measurement Finish Flag。 */
    get measurementFinishFlag(): FinishFlag {
        return this.readBits(4, 0b10000000, 7) as FinishFlag;
    }
    set measurementFinishFlag(value: FinishFlag) {
        this.writeBits(4, 0b10000000, 7, value);
    }

    /** 第 5 Byte，Bit 6：Reject Chip Flag。 */
    get rejectChipFlag(): number {
        return this.readBits(4, 0b01000000, 6);
    }
    set rejectChipFlag(value: number) {
        this.writeBits(4, 0b01000000, 6, value);
    }

    /** 第 5 Byte，Bit 5–0：原始 Test Execution Site Number（0–63）。 */
    get testExecutionSiteNumber(): number {
        return this.readBits(4, 0b00111111, 0);
    }
    set testExecutionSiteNumber(value: number) {
        this.writeBits(4, 0b00111111, 0, value);
    }

    /** 第 6 Byte，Bit 7–6：Block Area。 */
    get blockArea(): BlockArea {
        return this.readBits(5, 0b11000000, 6) as BlockArea;
    }
    set blockArea(value: BlockArea) {
        this.writeBits(5, 0b11000000, 6, value);
    }

    /** 第 6 Byte，Bit 5–0：原始 Category Data（0–63）。 */
    get categoryData(): number {
        return this.readBits(5, 0b00111111, 0);
    }
    set categoryData(value: number) {
        this.writeBits(5, 0b00111111, 0, value);
    }

    /** 第 3 個 Word（2 Bytes）。 */
    get thirdWord(): Uint8Array {
        return this.currentBytes.slice(4, 6);
    }
    set thirdWord(value: Uint8Array) {
        this.setWord(4, value);
    }

    //#endregion

    /** 將原始 Die 結果轉成顯示字元；保留原 C# 分支邏輯。 */
    get dieCharacter(): string {
        if (this.dieProperty === DieProperty.SkipDie && this.dummyData === DummyData.TestArea) {
            return 'S';
        }
        if (this.dieProperty === DieProperty.CompulsoryMarkingDie) {
            return 'M';
        }
        return this.extendedDieData === null
            ? this.categoryData.toString()
            : this.extendedDieData.mapVersion4ExtendedBinaryCategory.toString();
    }

    /** Site Number；有 ExtendedDieData 時採用延伸資料。 */
    get siteNumber(): number {
        return this.extendedDieData === null
            ? this.testExecutionSiteNumber
            : this.extendedDieData.mapVersion4ExtendedTestExecutionSite;
    }
    set siteNumber(value: number) {
        if (this.extendedDieData === null) {
            this.testExecutionSiteNumber = value;
        } else {
            this.extendedDieData.mapVersion4ExtendedTestExecutionSite = value;
        }
    }

    /** 正負號分開存放的 Die 座標。 */
    get coordination(): { x: number; y: number } {
        return {
            x: this.codeBitOfCoordinatorValueX === CodeBit.MinusData
                ? -this.dieCoordinatorX
                : this.dieCoordinatorX,
            y: this.codeBitOfCoordinatorValueY === CodeBit.MinusData
                ? -this.dieCoordinatorY
                : this.dieCoordinatorY,
        };
    }

    /** 是否為 Pass Die。 */
    get isPassDie(): boolean {
        return this.dieTestResult === DieTestResult.PassDie;
    }
}
