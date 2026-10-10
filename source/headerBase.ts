import "./generic.ts";
import * as e from "./enum.ts";

export abstract class HeaderBase {
    public ignoreList: string[];

    //#region Wafer Testing Setup Data
    //#region OperatorName
    /**
     * @description 作業員名稱
     * 開始位置 [0] 占 [20] `Byte`
     */
    get operatorName(): string {
        return this.tskHeaderByties.subArray(0, 20).toASCIIString();
    }
    set operatorName(value: string) {
        const temp: Uint8Array = value.toUint8Array(20);
        for (let i = 0; i < temp.length; i++) {
            this.tskHeaderByties[0 + i] = temp[i];
        }
    }
    //#endregion

    //#region Device Name
    /**
     * @description 型號
     * 開始位置 [20] 占 [16] `Byte`
     */
    get deviceName(): string {
        return this.tskHeaderByties.subArray(20, 16).toASCIIString();
    }
    set deviceName(value: string) {
        const temp: Uint8Array = value.toUint8Array(16);
        for (let i = 0; i < temp.length; i++) {
            this.tskHeaderByties[20 + i] = temp[i];
        }
    }
    //#endregion

    //#region Wafer Size
    /**
     * @description Wafer 的尺寸，可能為：
     * 40, 45, 50, 60, 80, 120 (Unit: 0.1 inch)
     *
     * 100, 115, 125, 150, 200, 300 (Unit: mm)
     *
     * 開始位置 [36] 占 [2] `Byte`
     */
    get waferSize(): number {
        return this.tskHeaderByties.subArray(36, 2).toNumber();
    }
    set waferSize(value: number) {
        const temp: Uint8Array = value.toUint8Array(2);
        for (let i = 0; i < temp.length; i++) {
            this.tskHeaderByties[36 + i] = temp[i];
        }
    }
    //#endregion

    //#region Machine Number
    /**
     * @description 機台號碼
     * 開始位置 [38] 占 [2] `Byte`
     */
    get machineNumber(): number {
        return this.tskHeaderByties.subArray(38, 2).toNumber();
    }
    set machineNumber(value: number) {
        const temp: Uint8Array = value.toUint8Array(2);
        for (let i = 0; i < temp.length; i++) {
            this.tskHeaderByties[38 + i] = temp[i];
        }
    }
    //#endregion

    //#region Index Size X
    /**
     * @description 座標起始位置 X
     * 開始位置 [40] 占 [4] `Byte`
     */
    get indexSizeX(): number {
        return this.tskHeaderByties.subArray(40, 4).toNumber();
    }
    set indexSizeX(value: number) {
        const temp: Uint8Array = value.toUint8Array(4);
        for (let i = 0; i < temp.length; i++) {
            this.tskHeaderByties[40 + i] = temp[i];
        }
    }
    //#endregion

    //#region Index Size Y
    /**
     * @description 座標起始位置 Y
     * 開始位置 [44] 占 [4] `Byte`
     */
    get indexSizeY(): number {
        return this.tskHeaderByties.subArray(44, 4).toNumber();
    }
    set indexSizeY(value: number) {
        const temp: Uint8Array = value.toUint8Array(4);
        for (let i = 0; i < temp.length; i++) {
            this.tskHeaderByties[44 + i] = temp[i];
        }
    }
    //#endregion

    //#region Oritation Flat Direction
    /**
     * @description 當前 Wafer 平邊的方向
     * 開始位置 [48] 占 [2] `Byte`
     */
    get orientationFlatDirection(): number {
        return this.tskHeaderByties.subArray(48, 2).toNumber();
    }
    set orientationFlatDirection(value: number) {
        const temp: Uint8Array = value.toUint8Array(2);
        for (let i = 0; i < temp.length; i++) {
            this.tskHeaderByties[48 + i] = temp[i];
        }
    }
    //#endregion

    //#region Final Editing Machine
    /**
     * @description 最後編輯的機台
     * 開始位置 [50] 占 [1] `Byte`
     */
    get finalEditingMachine(): number {
        return this.tskHeaderByties.subArray(50, 1).toNumber();
    }
    set finalEditingMachine(value: number) {
        this.tskHeaderByties[50] = value.toUint8Array()[0];
    }
    //#endregion

    //#endregion

    //#region Map Version
    /**
     * @enum {e.MapVersion}
     * @description 開始位置 [51] 占 [1] `Byte
     */
    get mapVersion(): e.MapVersion {
        return this.tskHeaderByties.subArray(51, 1).toNumber() as e.MapVersion;
    }
    set mapVersion(value: e.MapVersion) {
        this.tskHeaderByties[51] = (value as number).toUint8Array()[0];
    }
    //#endregion

    //#region Map Data Area Row Size
    /**
     * @description Map 資料的 Row 數量
     * 開始位置 [52] 占 [2] `Byte`
     */
    get MapDataAreaRowSize(): number {
        return this.tskHeaderByties.subArray(52, 2).toNumber();
    }
    set MapDataAreaRowSize(value: number) {
        const temp: Uint8Array = value.toUint8Array(2);
        for (let i = 0; i < temp.length; i++) {
            this.tskHeaderByties[52 + i] = temp[i];
        }
    }
    //#endregion

    //#region Map Data Area Line Size
    /**
     * @description Map 資料的 Column 數量
     * 開始位置 [54] 占 [2] `Byte`
     */
    get mapDataAreaLineSize(): number {
        return this.tskHeaderByties.subArray(54, 2).toNumber();
    }
    set mapDataAreaLineSize(value: number) {
        const temp: Uint8Array = value.toUint8Array(2);
        for (let i = 0; i < temp.length; i++) {
            this.tskHeaderByties[54 + i] = temp[i];
        }
    }
    //#endregion

    //#region Map Data Form
    /**
     * @description Map 資料的格式
     * 開始位置 [56] 占 [4] `Byte`
     */
    get MapDataForm(): e.MapDataForm {
        return this.tskHeaderByties.subArray(56, 4).toNumber() as e.MapDataForm;
    }
    set MapDataForm(value: e.MapDataForm) {
        const temp: Uint8Array = (value as number).toUint8Array(4);
        for (let i = 0; i < temp.length; i++) {
            this.tskHeaderByties[56 + i] = temp[i];
        }
    }
    //#endregion

    //#region Wafer Probing Coordinate System Data
    /**
     * @description Wafer ID: Lot ID + Wafer Index
     * 開始位置 [60] 占 [21] `Byte`
     */
    get waferId(): string {
        return this.tskHeaderByties.subArray(60, 21).toASCIIString();
    }
    set waferId(value: string) {
        const temp: Uint8Array = value.toUint8Array(21);

        for (let i = 0; i < temp.length; i++) {
            this.tskHeaderByties[60 + i] = temp[i];
        }
    }
    /**
     * @description 探測的數量
     * 開始位置 [81] 占 [1] `Byte`
     */
    get numberOfProbing(): number {
        return this.tskHeaderByties.subArray(81, 1).toNumber();
    }
    set numberOfProbing(value: number) {
        this.tskHeaderByties[81] = value.toUint8Array()[0];
    }

    /**
     * @description Lot ID
     * 開始位置 [82] 占 [18] `Byte`
     */
    get lotId(): string {
        return this.tskHeaderByties.subArray(82, 18).toASCIIString();
    }
    set lotId(value: string) {
        const temp: Uint8Array = value.toUint8Array(18);
        for (let i = 0; i < temp.length; i++) {
            this.tskHeaderByties[82 + i] = temp[i];
        }
    }

    /**
     * @description Wafer 箱號 (晶舟盒編號)
     * 開始位置 [100] 占 [2] `Byte`
     */
    get cassetteNumber(): number {
        return this.tskHeaderByties.subArray(100, 2).toNumber();
    }
    set cassetteNumber(value: number) {
        const temp: Uint8Array = value.toUint8Array(2);
        for (let i = 0; i < temp.length; i++) {
            this.tskHeaderByties[100 + i] = temp[i];
        }
    }
    /// <summary>
    /// 槽編號
    /// <br/>
    /// 開始位置 [102] 占 [2] <see langword="byte"/>
    /// </summary>
    get SlotNumber(): number {
        return this.tskHeaderByties.subArray(102, 2).toNumber();
    }
    set SlotNumber(value: number) {
        const temp: Uint8Array = value.toUint8Array(2);
        for (let i = 0; i < temp.length; i++) {
            this.tskHeaderByties[102 + i] = temp[i];
        }
    }
    /**
     * @description X 座標的增加方向
     * 開始位置 [104] 占 [1] `Byte`
     */
    get xCoordinatesIncreaseDirection(): e.XCoordinatesIncreaseDirection {
        return this.tskHeaderByties.subArray(104, 1)
            .toNumber() as e.XCoordinatesIncreaseDirection;
    }
    set xCoordinatesIncreaseDirection(value: e.XCoordinatesIncreaseDirection) {
        this.tskHeaderByties[104] = (value as number).toUint8Array()[0];
    }
    /**
     * @descriptionY 座標的增加方向
     * 開始位置 [105] 占 [1] `Byte`
     */
    get yCoordinatesIncreaseDirection(): e.YCoordinatesIncreaseDirection {
        return this.tskHeaderByties.subArray(105, 1)
            .toNumber() as e.YCoordinatesIncreaseDirection;
    }
    set yCoordinatesIncreaseDirection(value: e.YCoordinatesIncreaseDirection) {
        this.tskHeaderByties[105] = (value as number).toUint8Array()[0];
    }

    /**
     * @description 參考 Die 設定程序
     * 開始位置 [106] 占 [1] `Byte`
     */
    get referenceDieSettingProcedures(): e.ReferenceDieSettingProcedures {
        return this.tskHeaderByties.subArray(106, 1)
            .toNumber() as e.ReferenceDieSettingProcedures;
    }
    set referenceDieSettingProcedures(value: e.ReferenceDieSettingProcedures) {
        this.tskHeaderByties[106] = (value as number).toUint8Array()[0];
    }
    /**
     * @description Wafer Probing Coordinate System Data 保留字  
     * 開始位置 [107] 占 [1] `Byte`  
     * 覆寫的程式碼：
     * ```typescript
     override get waferProbingCoordinateSystemDataReserved(): number {
         return this.tskHeaderByties.subArray(107, 1).toNumber();
     }
     *```
    */
    get waferProbingCoordinateSystemDataReserved(): number {
        return 0; // 預設值或基礎實作
    }
    /*
    /// <summary>
    /// 參考 Die 相對於 Wafer 中心的座標 X
    /// <br/>
    /// 開始位置 [108] 占 [4] <see langword="byte"/>
    /// </summary>
    public int TargetDiePositionX
    {
        get
        {
            return this.TSKHeaderByties.Array.SubByte(108, 4).ByteArrayToInteger();
        }
        set
        {
            byte[] temp = value.IntegerToByteArray(4);
            for (int i = 0; i < temp.Length; i++)
            {
                ((IList<byte>)this.TSKHeaderByties)[108 + i] = temp[i];
            }
        }
    }
    /// <summary>
    /// 參考 Die 相對於 Wafer 中心的座標 Y
    /// <br/>
    /// 開始位置 [112] 占 [4] <see langword="byte"/>
    /// </summary>
    public int TargetDiePositionY
    {
        get
        {
            return this.TSKHeaderByties.Array.SubByte(112, 4).ByteArrayToInteger();
        }
        set
        {
            byte[] temp = value.IntegerToByteArray(4);
            for (int i = 0; i < temp.Length; i++)
            {
                ((IList<byte>)this.TSKHeaderByties)[112 + i] = temp[i];
            }
        }
    }
    /// <summary>
    /// 參考 Die 的座標 X
    /// <br/>
    /// 開始位置 [116] 占 [2] <see langword="byte"/>
    /// </summary>
    public int ReferenceDieCoordinationX
    {
        get
        {
            return this.TSKHeaderByties.Array.SubByte(116, 2).ByteArrayToInteger();
        }
        set
        {
            byte[] temp = value.IntegerToByteArray(2);
            for (int i = 0; i < temp.Length; i++)
            {
                ((IList<byte>)this.TSKHeaderByties)[116 + i] = temp[i];
            }
        }
    }
    /// <summary>
    /// 參考 Die 的座標 Y
    /// <br/>
    /// 開始位置 [118] 占 [2] <see langword="byte"/>
    /// </summary>
    public int ReferenceDieCoordinationY
    {
        get
        {
            return this.TSKHeaderByties.Array.SubByte(118, 2).ByteArrayToInteger();
        }
        set
        {
            byte[] temp = value.IntegerToByteArray(2);
            for (int i = 0; i < temp.Length; i++)
            {
                ((IList<byte>)this.TSKHeaderByties)[118 + i] = temp[i];
            }
        }
    }
    /// <summary>
    /// 探測開始的位置
    /// <br/>
    /// 開始位置 [120] 占 [1] <see langword="byte"/>
    /// </summary>
    public ProbingStartPosition ProbingStartPosition
    {
        get
        {
            return (ProbingStartPosition)this.TSKHeaderByties.Array.SubByte(120).ByteArrayToInteger();
        }
        set
        {
            ((IList<byte>)this.TSKHeaderByties)[120] = ((int)value).IntegerToByteArray()[0];
        }
    }
    /// <summary>
    /// 探測方向
    /// <br/>
    /// 開始位置 [121] 占 [1] <see langword="byte"/>
    /// </summary>
    public ProbingDirection ProbingDirection
    {
        get
        {
            return (ProbingDirection)this.TSKHeaderByties.Array.SubByte(121).ByteArrayToInteger();
        }
        set
        {
            ((IList<byte>)this.TSKHeaderByties)[121] = ((int)value).IntegerToByteArray()[0];
        }
    }
    /// <summary>
    /// 保留字
    /// <br/>
    /// 開始位置 [122] 占 [2] <see langword="byte"/>
    /// <br/>
    /// 覆寫的程式碼：
    /// <br/>
    /// <code>
    /// get
    /// {
    ///     return this.TSKHeaderByties.Array.SubByte(122, 2).ByteArrayToInteger();
    /// }
    /// </code>
    /// </summary>
    public virtual int Reserved { get; }
    /// <summary>
    /// Die 探測開始位置到 Wafer 中心的 X 距離
    /// <br/>
    /// 開始位置 [124] 占 [4] <see langword="byte"/>
    /// </summary>
    public int DistanceXToWaferCenterDieOrigin
    {
        get
        {
            return this.TSKHeaderByties.Array.SubByte(124, 4).ByteArrayToInteger();
        }
        set
        {
            byte[] temp = value.IntegerToByteArray(4);
            for (int i = 0; i < temp.Length; i++)
            {
                ((IList<byte>)this.TSKHeaderByties)[124 + i] = temp[i];
            }
        }
    }
    /// <summary>
    /// Die 探測開始位置到 Wafer 中心的 Y 距離
    /// <br/>
    /// 開始位置 [128] 占 [4] <see langword="byte"/>
    /// </summary>
    public int DistanceYToWaferCenterDieOrigin
    {
        get
        {
            return this.TSKHeaderByties.Array.SubByte(128, 4).ByteArrayToInteger();
        }
        set
        {
            byte[] temp = value.IntegerToByteArray(4);
            for (int i = 0; i < temp.Length; i++)
            {
                ((IList<byte>)this.TSKHeaderByties)[128 + i] = temp[i];
            }
        }
    }
    /// <summary>
    /// Wafer 中心 Die 的座標 X
    /// <br/>
    /// 開始位置 [132] 占 [4] <see langword="byte"/>
    /// </summary>
    public int CoordinationXOfWaferCenterDie
    {
        get
        {
            return this.TSKHeaderByties.Array.SubByte(132, 4).ByteArrayToInteger();
        }
        set
        {
            byte[] temp = value.IntegerToByteArray(4);
            for (int i = 0; i < temp.Length; i++)
            {
                ((IList<byte>)this.TSKHeaderByties)[132 + i] = temp[i];
            }
        }
    }
    /// <summary>
    /// Wafer 中心 Die 的座標 Y
    /// <br/>
    /// 開始位置 [136] 占 [4] <see langword="byte"/>
    /// </summary>
    public int CoordinationYOfWaferCenterDie
    {
        get
        {
            return this.TSKHeaderByties.Array.SubByte(136, 4).ByteArrayToInteger();
        }
        set
        {
            byte[] temp = value.IntegerToByteArray(4);
            for (int i = 0; i < temp.Length; i++)
            {
                ((IList<byte>)this.TSKHeaderByties)[136 + i] = temp[i];
            }
        }
    }
    */
    //#endregion

    /**
     * `HeaderBase` 的資料來源
     */
    public tskHeaderByties: Uint8Array;

    /**
     * 實例化 `HeaderBase` 物件，並設置原始數據陣列的映射區塊與 `IgnoreList`
     *
     * 範圍預設為 [0] ~ [235]，長度為 [236]
     *
     * 傳入的參數需使用以下方式：
     * ```typescript
     * headerBytes.subarray(0, 236)
     * ```
     *
     * @param headerBlock 檔案內容的 Header 區塊 `Uint8Array`
     */
    constructor(headerBlock: Uint8Array) {
        // 使用 subarray 建立記憶體視圖 (View)，修改內部資料會直接反映並影響原本的原始陣列
        this.tskHeaderByties = headerBlock;
        this.ignoreList = ["M", "S", "0"];
    }
}
