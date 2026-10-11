export abstract class ExtendedHeaderBase {
    //#region 暫時未用到
    //#region Wafer Test Start Time
    /**
     * @description Wafer Test Start Time
     * 開始位置 [20]，長度 [10] `Byte`
     * 若需使用需使用以下程式碼覆寫
     *
     * @example
     * ```typescript
     * override get waferTestStartTime(): Date {
     *     return new Date(
     *         Number(this.currentByties.subUint8Array(20, 2).toASCIIString()) + 2000,
     *         Number(this.currentByties.subUint8Array(22, 2).toASCIIString()) - 1,
     *         Number(this.currentByties.subUint8Array(24, 2).toASCIIString()),
     *         Number(this.currentByties.subUint8Array(26, 2).toASCIIString()),
     *         Number(this.currentByties.subUint8Array(28, 2).toASCIIString()),
     *     );
     * }
     * override set waferTestStartTime(value: Date) {
     *     const temp = getDateTimeString(value);
     *     for (let i = 0; i < temp.length; i++) {
     *         this.currentByties[20 + i] = temp[i];
     *     }
     * }
     * ```
    */
    get waferTestStartTime(): Date  {
        return new Date(0);
    }
    set waferTestStartTime(value: Date) {
    }
    //#endregion

    //#region Wafer Test End Time
    /**
     * @description Wafer Test End Time
     * 開始位置 [32]，長度 [10] `Byte`
     * 若需使用需使用以下程式碼覆寫
     *
     * @example
     * ```typescript
     * override get waferTestEndTime(): Date {
     *     return new Date(
     *         Number(this.currentByties.subUint8Array(32, 2).toASCIIString()) + 2000,
     *         Number(this.currentByties.subUint8Array(34, 2).toASCIIString()) - 1,
     *         Number(this.currentByties.subUint8Array(36, 2).toASCIIString()),
     *         Number(this.currentByties.subUint8Array(38, 2).toASCIIString()),
     *         Number(this.currentByties.subUint8Array(40, 2).toASCIIString()),
     *     );
     * }
     * override set waferTestEndTime(value: Date) {
     *     const temp = getDateTimeString(value);
     *     for (let i = 0; i < temp.length; i++) {
     *         this.currentByties[32 + i] = temp[i];
     *     }
     * }
     * ```
    */
    get waferTestEndTime(): Date  {
        return new Date(0);
    }
    set waferTestEndTime(value: Date) {
    }
    //#endregion

    //#region Continuous Fail
    /**
     * @description Continuous Fail
     * 開始位置 [44]，長度 [2] `Byte`
     *
     * 若需使用需使用以下程式碼覆寫
     * @example
     * ```typescript
     * override get continuousFail(): number {
     *     return this.currentByties.subUint8Array(44, 2).toNumber();
     * }
     * override set continuousFail(value: number) {
     *     const temp: Uint8Array = value.toUint8Array(2);
     *     for (let i = 0; i < temp.length; i++) {
     *         this.currentByties[44 + i] = temp[i];
     *     }
     * }
     * ```
     */
    get continuousFail(): number {
        return 0;
    }
    set continuousFail(value: number) {
    }
    //#endregion
    //#endregion

    //#region Wafer Test Result Tested
    /**
     * @description Wafer Test Result
     * 開始位置 [52] 占 [4] `Byte`
     */
    get waferTestResultTestedDie(): number {
        return this.currentByties.subUint8Array(52, 4).toNumber();
    }
    set waferTestResultTestedDie(value: number) {
        const temp: Uint8Array = value.toUint8Array(4);
        for (let i = 0; i < temp.length; i++) {
            this.currentByties[52 + i] = temp[i];
        }
    }
    //#endregion

    //#region Wafer Test Result Pass
    /**
     * @description Wafer Test Result Pass
     * 開始位置 [56] 占 [4] `Byte`
     */
    get waferTestResultPassDie(): number {
        return this.currentByties.subUint8Array(56, 4).toNumber();
    }
    set waferTestResultPassDie(value: number) {
        const temp: Uint8Array = value.toUint8Array(4);
        for (let i = 0; i < temp.length; i++) {
            this.currentByties[56 + i] = temp[i];
        }
    }
    //#endregion

    //#region Wafer Test Result Fail
    /**
     * @description Wafer Test Result Fail
     * 開始位置 [60] 占 [4] `Byte`
     */
    get waferTestResultFailDie(): number {
        return this.currentByties.subUint8Array(60, 4).toNumber();
    }
    set waferTestResultFailDie(value: number) {
        const temp: Uint8Array = value.toUint8Array(4);
        for (let i = 0; i < temp.length; i++) {
            this.currentByties[60 + i] = temp[i];
        }
    }
    //#endregion

    //#region 暫時未用到
    //#region Wafer Test Result For Special User Fail 1 Die
    /**
     * @description Wafer Test Result For Special User Fail 1 Die
     *
     * 若需使用需使用以下程式碼覆寫
     *
     * @example
     * ```typescript
     * override get waferTestResultForSpecialUserFail1Die() : number{
     *     return this.currentByties.subUint8Array(64, 4).toNumber();
     * }
     * override set waferTestResultForSpecialUserFail1Die(value : number) {
     *     const temp : Uint8Array = value.toUint8Array(4);
     *     for (let i = 0; i < temp.length;i++){
     *         this.currentByties[64 + i] = temp[i];
     *     }
     * }
     * ```
     */
    get waferTestResultForSpecialUserFail1Die(): number {
        return 0;
    }
    set waferTestResultForSpecialUserFail1Die(value: number) {
    }
    //#endregion

    //#region Wafer Test Result For Special User Fail 2 Die
    /**
     * @description Wafer Test Result For Special User Fail 2 Die
     *
     * 若需使用需使用以下程式碼覆寫
     *
     * @example
     * ```typescript
     * override get waferTestResultForSpecialUserFail2Die(): number {
     *     return this.currentByties.subUint8Array(68, 4).toNumber();
     * }
     * override set waferTestResultForSpecialUserFail2Die(value: number) {
     *     const temp: Uint8Array = value.toUint8Array(4);
     *     for (let i = 0; i < temp.length; i++) {
     *         this.currentByties[68 + i] = temp[i];
     *     }
     * }
     * ```
     */
    get waferTestResultForSpecialUserFail2Die(): number {
        return 0;
    }
    set waferTestResultForSpecialUserFail2Die(value: number) {
        null;
    }
    //#endregion

    //#region Test Result Of Normal Or Mutiple Pass Probing Before Direct Total Die
    /**
     * @description Test Result Of Normal Or Mutiple Pass Probing Before Direct Total Die
     *
     * 若需使用需使用以下程式碼覆寫
     *
     * @example
     * ```typescript
     * override get testResultOfNormalOrMutiPassProbingBeforeDirectTotalDie(): number {
     *     return this.currentByties.subUint8Array(72, 4).toNumber();
     * }
     * override set testResultOfNormalOrMutiPassProbingBeforeDirectTotalDie(value: number) {
     *     const temp: Uint8Array = value.toUint8Array(4);
     *     for (let i = 0; i < temp.length; i++) {
     *         this.currentByties[72 + i] = temp[i];
     *     }
     * }
     * ```
     */
    get testResultOfNormalOrMutiPassProbingBeforeDirectTotalDie(): number {
        return 0;
    }
    set testResultOfNormalOrMutiPassProbingBeforeDirectTotalDie(value: number) {
    }
    //#endregion

    //#region Test Result Of Normal Or Mutiple Pass Probing Before Direct Pass Die
    /**
     * @description Test Result Of Normal Or Mutiple Pass Probing Before Direct Pass Die
     *
     * 若需使用需使用以下程式碼覆寫
     *
     * @example
     * ```typescript
     * override get testResultOfNormalOrMutiPassProbingBeforeDirectPassDie(): number {
     *     return this.currentByties.subUint8Array(76, 4).toNumber();
     * }
     * override set testResultOfNormalOrMutiPassProbingBeforeDirectPassDie(value: number) {
     *     const temp: Uint8Array = value.toUint8Array(4);
     *     for (let i = 0; i < temp.length; i++) {
     *         this.currentByties[76 + i] = temp[i];
     *     }
     * }
     * ```
     */
    get testResultOfNormalOrMutiPassProbingBeforeDirectPassDie(): number {
        return 0;
    }
    set testResultOfNormalOrMutiPassProbingBeforeDirectPassDie(value: number) {
    }
    //#endregion

    //#region Test Result Of Normal Or Mutiple Pass Probing Before Direct Fail Die
    /**
     * @description Test Result Of Normal Or Mutiple Pass Probing Before Direct Fail Die
     *
     * 若需使用需使用以下程式碼覆寫
     *
     * @example
     * ```typescript
     * override get testResultOfNormalOrMutiPassProbingBeforeDirectFailDie(): number {
     *     return this.currentByties.subUint8Array(80, 4).toNumber();
     * }
     * override set testResultOfNormalOrMutiPassProbingBeforeDirectFailDie(value: number) {
     *     const temp: Uint8Array = value.toUint8Array(4);
     *     for (let i = 0; i < temp.length; i++) {
     *         this.currentByties[80 + i] = temp[i];
     *     }
     * }
     * ```
     */
    get testResultOfNormalOrMutiPassProbingBeforeDirectFailDie(): number {
        return 0;
    }
    set testResultOfNormalOrMutiPassProbingBeforeDirectFailDie(value: number) {
    }
    //#endregion

    //#region Test Result Of Normal Or Mutiple Pass Probing Total Die
    /**
     * @description Test Result Of Normal Or Mutiple Pass Probing Total Die
     *
     * 若需使用需使用以下程式碼覆寫
     *
     * @example
     * ```typescript
     * override get testResultOfNormalOrMutiPassProbingTotalDie(): number {
     *     return this.currentByties.subUint8Array(84, 4).toNumber();
     * }
     * override set testResultOfNormalOrMutiPassProbingTotalDie(value: number) {
     *     const temp: Uint8Array = value.toUint8Array(4);
     *     for (let i = 0; i < temp.length; i++) {
     *         this.currentByties[84 + i] = temp[i];
     *     }
     * }
     * ```
     */
    get testResultOfNormalOrMutiPassProbingTotalDie(): number {
        return 0;
    }
    set testResultOfNormalOrMutiPassProbingTotalDie(value: number) {
    }
    //#endregion

    //#region Test Result Of Normal Or Mutiple Pass Probing Pass Die
    /**
     * @description Test Result Of Normal Or Mutiple Pass Probing Pass Die
     *
     * 若需使用需使用以下程式碼覆寫
     *
     * @example
     *
     * ```typescript
     * get testResultOfNormalOrMutiPassProbingPassDie(): number {
     *     return this.currentByties.subUint8Array(88, 4).toNumber();
     * }
     * set testResultOfNormalOrMutiPassProbingPassDie(value: number) {
     *     const temp: Uint8Array = value.toUint8Array(4);
     *     for (let i = 0; i < temp.length; i++) {
     *         this.currentByties[88 + i] = temp[i];
     *     }
     * }
     * ```
     */
    get testResultOfNormalOrMutiPassProbingPassDie(): number {
        return 0;
    }
    set testResultOfNormalOrMutiPassProbingPassDie(value: number) {
    }
    //#endregion

    //#region Test Result Of Normal Or Mutiple Pass Probing Fail Die
    /**
     * @description Test Result Of Normal Or Mutiple Pass Probing Fail Die
     *
     * 若需使用需使用以下程式碼覆寫
     *
     * @example
     * ```typescript
     * override get testResultOfNormalOrMutiPassProbingFailDie(): number {
     *     return this.currentByties.subUint8Array(92, 4).toNumber();
     * }
     * override set testResultOfNormalOrMutiPassProbingFailDie(value: number) {
     *     const temp: Uint8Array = value.toUint8Array(4);
     *     for (let i = 0; i < temp.length; i++) {
     *         this.currentByties[92 + i] = temp[i];
     *     }
     * }
     * ```
     */
    get testResultOfNormalOrMutiPassProbingFailDie(): number {
        return 0;
    }
    set testResultOfNormalOrMutiPassProbingFailDie(value: number) {
    }
    //#endregion
    //#endregion

    public currentByties: Uint8Array;

    constructor(extendedHeaderBlock: Uint8Array) {
        this.currentByties = extendedHeaderBlock;
    }
}
