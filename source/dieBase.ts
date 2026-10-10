import * as e from './enum.ts';

export interface Point {
    x: number;
    y: number;
}

export abstract class DieBase {
    //#region Firse Word
    //#region Die Test Result
    /** @description 第 [1] 字節的第 [1] 區段 `Die Test Result` 占 [2] 個 `Bit` 位置為 [1, 2] */
    get dieTestResult(): e.DieTestResult {
        return ((this.currentByties[0] & 0b11000000) >> 6) as e.DieTestResult;
    }
    set dieTestResult(value: e.DieTestResult) {
        this.currentByties[0] = (this.currentByties[0] & 0b00111111) | (((value as number) << 6) & 0b11000000);
    }
    //#endregion

    //#region Marking
    /** @description 第 [1] 字節的第 [2] 區段 `Marking` 占 [1] 個 `Bit` 位置為 [3] */
    get marking(): e.Marking {
        return ((this.currentByties[0] & 0b00100000) >> 5) as e.Marking;
    }
    set marking(value: e.Marking) {
        this.currentByties[0] = (this.currentByties[0] & 0b11011111) | (((value as number) << 5) & 0b00100000);
    }
    //#endregion

    //#region Fail Mark Inspection
    /** @description 第 [1] 字節的第 [3] 區段 `Fail Mark Inspection` 占 [1] 個 `Bit` 位置為 [4] */
    get failMarkInspection(): e.FailMarkInspection {
        return ((this.currentByties[0] & 0b00010000) >> 4) as e.FailMarkInspection;
    }
    set failMarkInspection(value: e.FailMarkInspection) {
        this.currentByties[0] = (this.currentByties[0] & 0b11101111) | (((value as number) << 4) & 0b00010000);
    }
    //#endregion

    //#region ReProbing Result
    /** @description 第 [1] 字節的第 [4] 區段 `ReProbing Result` 占 [2] 個 `Bit` 位置為 [5,6] */
    get reProbingResult(): e.ReProbingResult {
        return ((this.currentByties[0] & 0b00001100) >> 2) as e.ReProbingResult;
    }
    set reProbingResult(value: e.ReProbingResult) {
        this.currentByties[0] = (this.currentByties[0] & 0b11110011) | ((value as number) << 2) & 0b00001100;
    }
    //#endregion

    //#region Needle Mark Inspection Result
    /** @description 第 [1] 字節的第 [5] 區段 `Needle Mark Inspection Result` 占  [1] 個 `Bit` 位置為 [7] */
    get needleMarkInspectionResult(): e.NeedleMarkInspectionResult {
        return ((this.currentByties[0] & 0b00000010) >> 1) as e.NeedleMarkInspectionResult;
    }
    set needleMarkInspectionResult(value: e.NeedleMarkInspectionResult) {
        this.currentByties[0] = (this.currentByties[0] & 0b11111101) | ((value as number) << 1) & 0b00000010;
    }
    //#endregion

    //#region Die Coordinator X
    /** @description 第 [1] 字節的第 [6] 區段 `Die Corrdinator Values X` 占 [9] 個 `Bit` 位置為第[1]個 `Byte` 的 [8] 與第[2]個 `Byte` 的 [1~8] */
    get dieCoordinatorX(): number {
        return ((this.currentByties[0] & 0b00000001) << 8) | (this.currentByties[1]);
    }
    set dieCoordinatorX(value: number) {
        this.currentByties[0] = (this.currentByties[0] & 0b11111110) | ((value & 0b00000001_00000000) >> 8);
        this.currentByties[1] = this.currentByties[1] | (value & 0b11111111);
    }
    //#endregion

    //#region First Word
    /** @description 第 [1] 字節，[2] 個 `Byte`， [16] 個 `Bit` */
    get firstWord(): Uint8Array {
        return this.currentByties.subarray(0, 2);
    }
    set firstWord(value: Uint8Array) {
        this.currentByties[0] = value[0];
        this.currentByties[1] = value[1];
    }
    //#endregion
    //#endregion

    //#region Second Word
    //#region Die Property
    /** @description 第 [2] 字節的第 [1] 區段 `Die Property` 占 [2] 個 `Bit` 位置為 [1, 2] */
    get dieProperty(): e.DieProperty {
        return ((this.currentByties[2] & 0b11000000) >> 6) as e.DieProperty;
    }
    set dieProperty(value: e.DieProperty) {
        this.currentByties[2] = (this.currentByties[2] & 0b00111111) | (((value as number) << 6) & 0b11000000);
    }
    //#endregion

    //#region Needle Marking Inspection Execution Die Selection
    /** @description 第 [2] 字節的第 [2] 區段 `Needle Marking Inspection Execution Die Selection` 占 [1] 個 `Bit` 位置為 [3] */
    get needleMarkingInspectionExecutionDieSelection(): e.NeedleMarkingInspectionExecutionDieSelection {
        return ((this.currentByties[2] & 0b00100000) >> 5) as e.NeedleMarkingInspectionExecutionDieSelection;
    }
    set needleMarkingInspectionExecutionDieSelection(value: e.NeedleMarkingInspectionExecutionDieSelection) {
        this.currentByties[2] = (this.currentByties[2] & 0b11011111) | (((value as number) << 5) & 0b00100000);
    }
    //#endregion

    //#region Sampling Die
    /** @description 第 [2] 字節的第 [3] 區段 `Sampling Die` 占 [1] 個 `Bit` 位置為 [4] */
    get samplingDie(): e.SampleDie {
        return ((this.currentByties[2] & 0b00010000) >> 4) as e.SampleDie;
    }
    set samplingDie(value: e.SampleDie) {
        this.currentByties[2] = (this.currentByties[2] & 0b11101111) | (((value as number) << 4) & 0b00010000);
    }
    //#endregion

    //#region Code Bit of Coordinator Value X
    /** @description 第 [2] 字節的第 [4] 區段 `Code Bit of Coordinatior Value X` 占 [1] 個 `Bit` 位置為 [5] */
    get codeBitOfCoordinatorValueX(): e.CodeBit {
        return ((this.currentByties[2] & 0b00001000) >> 3) as e.CodeBit;
    }
    set codeBitOfCoordinatorValueX(value: e.CodeBit) {
        this.currentByties[2] = (this.currentByties[2] & 0b11110111) | (((value as number) << 3) & 0b00001000);
    }
    //#endregion

    //#region Code Bit of Coordinator Value Y
    /** @description 第 [2] 字節的第 [5] 區段 `Code Bit of Coordinator Value Y` 占  [1] 個 `Bit` 位置為 [6] */
    get codeBitOfCoordinatorValueY(): e.CodeBit {
        return ((this.currentByties[2] & 0b00000100) >> 2) as e.CodeBit;
    }
    set codeBitOfCoordinatorValueY(value: e.CodeBit) {
        this.currentByties[2] = (this.currentByties[2] & 0b11111011) | (((value as number) << 2) & 0b00000100);
    }
    //#endregion

    //#region Dummy Data
    /** @description 第 [2] 字節的第 [6] 區段 `Dummy Data` 占 [1] 個 `Bit` 位置為 [7] */
    get dummyData(): e.DummyData {
        return ((this.currentByties[2] & 0b00000010) >> 1) as e.DummyData;
    }
    set dummyData(value: e.DummyData) {
        this.currentByties[2] = (this.currentByties[2] & 0b11111101) | (((value as number) << 1) & 0b00000010);
    }
    //#endregion

    //#region Die Coordinator Y
    /** @description  第 [2] 字節的第 [7] 區段 `Die Coordinator Y` 占 [9] 個 `Bit` 位置為第[1]個 `Byte` 的 [8] 與第[2]個 `Byte` 的 [1~8] */
    get dieCoordinatorY(): number {
        return ((this.currentByties[2] & 0b00000001) << 8) | (this.currentByties[3]);
    }
    set dieCoordinatorY(value: number) {
        this.currentByties[2] = (this.currentByties[2] & 0b11111110) | ((value & 0b00000001_00000000) >> 8);
        this.currentByties[3] = this.currentByties[3] | (value & 0b11111111);
    }
    //#endregion

    //#region Second Word
    /** @description 第 [2] 字節，[2] 個 `Byte`，[16] 個 `Bit` */
    get secondWord(): Uint8Array {
        return this.currentByties.subarray(2, 3);
    }
    set secondWord(value: Uint8Array) {
        this.currentByties[2] = value[0];
        this.currentByties[3] = value[1];
    }
    //#endregion
    //#endregion

    //#region Third Word
    //#region Measurement Finish Flag
    /** @description 第 [3] 字節的的第 [1] 區段 `Measurement Finish Flag` 占 [1] 個 `Bit` 位置為 [1] */
    get measurementFinishFlag(): e.FinishFlag {
        return ((this.currentByties[4] & 0b10000000) >> 7) as e.FinishFlag;
    }
    set measurementFinishFlag(value: e.FinishFlag) {
        this.currentByties[4] = (this.currentByties[4] & 0b01111111) | (((value as number) << 7) & 0b10000000);
    }
    //#endregion

    //#region Reject Chip Flag
    /** @description 第 [3] 字節的第 [2] 區段 `Reject Chip Flag` 占 [1] 個 `Bit` 位置為 [2] */
    get rejectChipFlag(): number {
        return (this.currentByties[4] & 0b01000000) >> 6;
    }
    set rejectChipFlag(value: number) {
        this.currentByties[4] = (this.currentByties[4] & 0b10111111) | ((value << 6) & 0b01000000);
    }
    //#endregion

    //#region Test Execution Site Number
    /** @description 第 [3] 字節的第 [3] 區段 `Test Execution Site Number` 占 [6] 個 `Bit` 位置為 [3~8] */
    get testExecutionSiteNumber(): number {
        return this.currentByties[4] & 0b00111111;
    }
    set testExecutionSiteNumber(value: number) {
        this.currentByties[4] = (this.currentByties[4] & 0b11000000) | (value & 0b00111111);
    }
    //#endregion

    //#region Block Area
    /** @description 第 [3] 字節的第 [4] 區段 `Block Area` 占 [2] 個 `Bit` 位置為 [1, 2] */
    get blockArea(): e.BlockArea {
        return ((this.currentByties[5] & 0b11000000) >> 6) as e.BlockArea;
    }
    set blockArea(value: e.BlockArea) {
        this.currentByties[5] = (this.currentByties[5] & 0b00111111) | (((value as number) << 6) & 0b11000000);
    }
    //#endregion

    //#region Category Data
    /** @description 第 [3] 字節的第 [5] 區段 `Category Data` 占 [6] 個 `Bit` 位置為 [3~8] */
    get categoryData(): number {
        return this.currentByties[5] & 0b00111111;
    }
    set categoryData(value: number) {
        this.currentByties[5] = (this.currentByties[5] & 0b11000000) | (value & 0b00111111);
    }
    //#endregion

    //#region Third Word
    /** @description 第 [3] 字節，[2] 個 `Byte`，[16] 個 `Bit` */
    get ThirdWord(): Uint8Array {
        return this.currentByties.subarray(4, 5);
    }
    set ThirdWord(value: Uint8Array) {
        this.currentByties[4] = value[0];
        this.currentByties[5] = value[1];
    }
    //#endregion
    //#endregion

    //#region Die Character
    /** @description 獲取當前 `DieBase` 的代號字元 */
    get dieCharacter(): string {
        if (this.dieProperty === e.DieProperty.SkipDie && this.dummyData === e.DummyData.TestArea) {
            return 'S';
        }

        if (this.dieProperty === e.DieProperty.CompulsoryMarkingDie) {
            return 'M';
        }

        //TODO extendedDieData
        return this.categoryData.toString();
        // switch (this.dieProperty)
        // {
        //     default:
        //         return this.ExtendedDieData is null
        //             ? this.CategoryData.ToString()
        //             : this.ExtendedDieData.MapVersion4ExtendedBinaryCategory.ToString();
        // }
    }
    //#endregion

    //#region Site Number
    /** @description Site Number */
    get siteNumber(): number {
        return this.testExecutionSiteNumber;
        // return this.ExtendedDieData is null
        //     ? this.TestExecutionSiteNumber
        //     : this.ExtendedDieData.MapVersion4ExtendedTestExecutionSite;
    }
    set siteNumber(value: number) {
        // if (this.ExtendedDieData is null)
        // {
        this.testExecutionSiteNumber = value;
        // }
        // else
        // {
        //     this.ExtendedDieData.MapVersion4ExtendedTestExecutionSite = value;
        // }
    }
    //#endregion

    //#region Coordination
    /**
     * @description 獲取當前 `DieBase` 的座標
     * @returns {Point} 用 `Point` 持有的座標資料
     */
    get coordination(): Point {
        return {
            x: this.codeBitOfCoordinatorValueX == e.CodeBit.MinusData ? -1 * this.dieCoordinatorX : this.dieCoordinatorX,
            y: this.codeBitOfCoordinatorValueY == e.CodeBit.MinusData ? -1 * this.dieCoordinatorY : this.dieCoordinatorY,
        };
    }
    //#endregion

    //#region Is Pass Die
    /** 
     * @description 獲取當前的 `DieBase` 是否為 Pass Die 
     * @returns {boolean} 若為 Pass Die 則回傳 `true`，否則 false`.
    */
    get isPassDie() : boolean {
        return this.dieTestResult == e.DieTestResult.PassDie;
    }
    //#endregion

    public currentByties: Uint8Array;
    constructor(currentDieByties: Uint8Array) {
        this.currentByties = currentDieByties;
    }
}
