export abstract class ExtendedDieBase {
    //#region Map Version:2/3 FirstWord
    //#region Map Version 2 / 3 Extended Test Execution Site
    /**
     * @description Extended Test Execution Site
     * 0 to 255 (add 1 for actual test execution site)
     *
     * 若需使用需使用以下程式碼覆寫
     *
     * @example
     * ```typescript
     * override get mapVersion2Or3ExtendedTestExecutionSite(): number {
     *     return this.currentByties[0];
     * }
     * override set mapVersion2Or3ExtendedTestExecutionSite(value: number) {
     *     this.currentByties[0] = value.toUint8Array(1)[0]
     * }
     * ```
     */
    get mapVersion2Or3ExtendedTestExecutionSite(): number {
        return 0;
    }
    set mapVersion2Or3ExtendedTestExecutionSite(value: number) {
    }
    //#endregion

    //#region Extended Binary Category
    /**
     * @description Extended Binary Category
     * 0 to 127 (add 1 for actual test execution site)
     *
     * 若需使用需使用以下程式碼覆寫
     *
     * @example
     * ```typescript
     * override get mapVersion2Or3ExtendedBinaryCategory(): number {
     *     return this.currentByties[1];
     * }
     * override set mapVersion2Or3ExtendedBinaryCategory(value: number) {
     *     this.currentByties[1] = value.toUint8Array(1)[0];
     * }
     * ```
     */
    get mapVersion2Or3ExtendedBinaryCategory(): number {
        return 0;
    }
    set mapVersion2Or3ExtendedBinaryCategory(value: number) {
    }
    //#endregion
    //#endregion

    //#region Map Version:4
    //! 字節僅取 4 個 Byte 不需要到 8 個Byte
    //#region First Word
    /**
     * @description Extended Test Execution Site
     * 0 to 255 (add 1 for actual test execution site)
     */
    get mapVersion4ExtendedTestExecutionSite(): number {
        return this.currentByties[1];
    }
    set mapVersion4ExtendedTestExecutionSite(value: number) {
        this.currentByties[1] = value.toUint8Array(1)[0];
    }
    //#endregion

    //#region SecondWord
    /**
     * @description Extended Binary Category
     * 0 to 1023 (add 1 for actual category information)
     */
    get mapVersion4ExtendedBinaryCategory(): number {
        return ((this.currentByties[2] & 0b00000011) << 8) | this.currentByties[3];
    }
    set mapVersion4ExtendedBinaryCategory(value: number) {
        this.currentByties[2] = (this.currentByties[2] & 0b11111100) | ((value & 0b00000011_00000000) >> 8);
        this.currentByties[3] = value & 0b11111111;
    }
    //#endregion
    //#endregion

    public currentByties: Uint8Array;

    constructor(source: Uint8Array) {
        this.currentByties = source;
    }
}
