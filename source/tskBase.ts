import { DieBase } from './dieBase.ts';
import { ExtendedHeaderBase } from './extensionHeaderBase.ts';
import { HeaderBase } from './headerBase.ts';

export abstract class TSKBase{
    /** @description `TSK` 來源的資料*/
    public tskByties : Uint8Array;
    /** @description `TSK` 的 `Header` 資料持有物件 */
    public header!: HeaderBase;
    /** @description `Die`清單 */
    public dies! : DieBase[];
    /** @description Line Category Array */
    public lineCategory! : Uint8Array;
    /** @description Extended Header Information */
    public extendedHeader! : ExtendedHeaderBase;
    /** @description Extended Line Category Information */
    public extendedLineCategory! : Uint8Array;
    /** @description Other Data */
    public otherData! : Uint8Array;
    /** @description Pass Bin 清單 */
    public passBins : string[];
    protected currentIndex : number;

    /**
     * @description 實例化 `TSKBase` 物件
     * 
     * @example
     * ```typescript
     * super(byties);
     * this.header = new Header(this.tskByties.subarray(0, 236));
     * this.currentIndex += this.header.headerByties.length;

     * this.readTSKDie();

     * const fileStruct = this.header.fileStructure;

     * //#region Line Category Information
     * if (fileStruct[2] === '1') {
     *     this.lineCategory = this.tskByties.subarray(this.currentIndex, this.currentIndex + 2 * this.dies.length);
     *     this.currentIndex += this.lineCategory.length;
     * }
     * //#endregion

     * //#region Extended Header Information
     * if (fileStruct[3] === '1') {
     *     this.extendedHeader = new ExtendedHeader(this.tskByties.subarray(this.currentIndex, this.currentIndex + 172));
     *     this.currentIndex += this.extendedHeader.currentByties.length;
     * }
     * //#endregion

     * //#region Test Result Information Per Extended Die
     * if (fileStruct[4] === '1') {
     *     this.readExtendedDie();
     * }
     * //#endregion

     * //#region Extended Line Category Information
     * if (fileStruct[5] === '1') {
     *     this.extendedLineCategory = this.tskByties.subarray(this.currentIndex, this.currentIndex + 2 * this.dies.length);
     *     this.currentIndex += this.extendedLineCategory.length;
     * }
     * //#endregion

     * //#region Other Data
     * if (this.currentIndex != this.tskByties.length) {
     *     const length: number = this.tskByties.length - this.currentIndex;
     *     this.otherData = this.tskByties.subarray(this.currentIndex, this.currentIndex + length);
     * }
     * //#endregion
     * ```
     */
    constructor(byties : Uint8Array){
        this.tskByties = byties;
        this.passBins = [];
        this.currentIndex = 0;
    }

    /**
     * @abstract
     * @description `TSK` 的 `Die`  
     * 繼承後必須實作以下程式碼才可正確解析
     * 
     * @example
     * ```typescript
     * this.dies = [];
     * const dieCount = this.header.mapDataAreaLineSize * this.header.MapDataAreaRowSize;
     * for (let i = 0; i < dieCount; i++) {
     *     const die: Die = new Die(this.tskByties.subarray(this.currentIndex, this.currentIndex + 6));
     *     if (die.isPassDie && !this.passBins.includes(die.dieCharacter)) {
     *         this.passBins.push(die.dieCharacter);
     *     }
     *     this.dies.push(die);
     *     this.currentIndex += 6;
     * }
     * ```
     */
    protected abstract readTSKDie() : void;

    /**
     * @abstract
     * @description 解析 `ExtendedDie`  
     * 繼承後必須實作以下程式碼才可正確解析
     * 
     * @example
     * ```typescript
     * for (const die of this.dies) {
     *     die.extendedDieData = new ExtendedDie(this.tskByties.subarray(this.currentIndex, this.currentIndex + 4));
     *     this.currentIndex += 4;
     * }
     * ```
     */
    protected abstract readExtendedDie() : void;
}