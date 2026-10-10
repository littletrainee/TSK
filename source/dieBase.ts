import * as e from './enum.ts';
export abstract class DieBase {
    //#region Firse Word
    /** @description 第 [1] 字節的第 [1] 區段 `DieTestResult` 占 [2] 個 `Bit` 位置為 [1,2] */
    get dieTestResult(): e.DieTestResult {
        return ((this.currentByties[0] & 0b11000000) >> 6) as e.DieTestResult;
    }
    set dieTestResult(value: e.DieTestResult) {
        this.currentByties[0] = (this.currentByties[0] & 0b00111111) | (((value as number) << 6) & 0b11000000);
    }

    /** @description 第 [1] 字節的第 [2] 區段 `Marking` 占 [1] 個 `Bit` 位置為 [3] */
    get marking(): e.Marking {
        return ((this.currentByties[0] & 0b00100000) >> 5) as e.Marking;
    }
    set marking(value: e.Marking) {
        this.currentByties[0] = (this.currentByties[0] & 0b11011111) | (((value as number) << 5) & 0b00100000);
    }

    /** @description 第 [1] 字節的第 [3] 區段 `FailMarkInspection` 占 [1] 個 `Bit` 位置為 [4] */ 
    get failMarkInspection(): e.FailMarkInspection {
        return ((this.currentByties[0] & 0b00010000) >> 4) as e.FailMarkInspection;
    }
    set failMarkInspection(value: e.FailMarkInspection) {
        this.currentByties[0] = (this.currentByties[0] & 0b11101111) | (((value as number) << 4) & 0b00010000);
    }
    
    /** @description 第 [1] 字節的第 [4] 區段 `ReProbingResult` 占 [2] 個 `Bit` 位置為 [5,6] */ 
    get reProbingResult(): e.ReProbingResult {
        return ((this.currentByties[0] & 0b00001100) >> 2) as e.ReProbingResult;
    }
    set reProbingResult(value: e.ReProbingResult) {
        this.currentByties[0] = (this.currentByties[0] & 0b11110011) | ((value as number) << 2) & 0b00001100;
    }
    
    /** @description 第 [1] 字節的第 [5] 區段 `NeedleMarkInspectionResult` 占  [1] 個 `Bit` 位置為 [7] */ 
    get needleMarkInspectionResult() : e.NeedleMarkInspectionResult {
        return ((this.currentByties[0] & 0b00000010) >> 1) as e.NeedleMarkInspectionResult;
    }
    set needleMarkInspectionResult(value : e.NeedleMarkInspectionResult) {
        this.currentByties[0] = ((this.currentByties[0] & 0b11111101) | ((value as number) << 1) & 0b00000010);
    }
    
    /** @description 第 [1] 字節的第 [6] 區段 Die Corrdinator Values X 占 [9] 個 `Bit` 位置為第[1]個 `Byte` 的 [8] 與第[2]個 `Byte 的 [1~8] */ 
    get dieCoordinatorX() : number {
        return ((this.currentByties[0] & 0b00000001) << 8) | (this.currentByties[1]);
    }
    set dieCoordinatorX(value : number ) {
        this.currentByties[0] = ((this.currentByties[0] & 0b11111110) | ((value & 0b00000001_00000000) >> 8));
        this.currentByties[1] = this.currentByties[1] | (value & 0b11111111);
    }
    
    /** @description 第 [1] 字節，[2] 個 `Byte`， [16] 個 `Bit` */ 
    get firstWord() : Uint8Array {
        return this.currentByties.subarray(0, 2);
    }
    set firstWord(value : Uint8Array) {
        this.currentByties[0] = value[0];
        this.currentByties[1] = value[1];
    }
    //#endregion
    public currentByties: Uint8Array;
    constructor(currentDieByties: Uint8Array) {
        this.currentByties = currentDieByties;
    }
}
