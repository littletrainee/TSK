import {getDateTime, getDateTimeString} from './generic.ts';
import * as e from './enum.ts';

export abstract class HeaderBase {
    public ignoreList: string[];

    //#region Wafer Testing Setup Data
    //#region OperatorName
    /**
     * @description 作業員名稱
     * 開始位置 [0] 占 [20] `Byte`
     */
    get operatorName(): string {
        return this.headerByties.subUint8Array(0, 20).toASCIIString();
    }
    set operatorName(value: string) {
        const temp: Uint8Array = value.toUint8Array(20);
        for (let i = 0; i < temp.length; i++) {
            this.headerByties[0 + i] = temp[i];
        }
    }
    //#endregion

    //#region Device Name
    /**
  * @description 型號
     * 開始位置 [20] 占 [16] `Byte`
     */
    get deviceName(): string {
        return this.headerByties.subUint8Array(20, 16).toASCIIString();
    }
    set deviceName(value: string) {
        const temp: Uint8Array = value.toUint8Array(16);
        for (let i = 0; i < temp.length; i++) {
            this.headerByties[20 + i] = temp[i];
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
        return this.headerByties.subUint8Array(36, 2).toNumber();
    }
    set waferSize(value: number) {
        const temp: Uint8Array = value.toUint8Array(2);
        for (let i = 0; i < temp.length; i++) {
            this.headerByties[36 + i] = temp[i];
        }
    }
    //#endregion

    //#region Machine Number
    /**
     * @description 機台號碼
     * 開始位置 [38] 占 [2] `Byte`
     */
    get machineNumber(): number {
        return this.headerByties.subUint8Array(38, 2).toNumber();
    }
    set machineNumber(value: number) {
        const temp: Uint8Array = value.toUint8Array(2);
        for (let i = 0; i < temp.length; i++) {
            this.headerByties[38 + i] = temp[i];
        }
    }
    //#endregion

    //#region Index Size X
    /**
     * @description 座標起始位置 X
     * 開始位置 [40] 占 [4] `Byte`
     */
    get indexSizeX(): number {
        return this.headerByties.subUint8Array(40, 4).toNumber();
    }
    set indexSizeX(value: number) {
        const temp: Uint8Array = value.toUint8Array(4);
        for (let i = 0; i < temp.length; i++) {
            this.headerByties[40 + i] = temp[i];
        }
    }
    //#endregion

    //#region Index Size Y
    /**
     * @description 座標起始位置 Y
     * 開始位置 [44] 占 [4] `Byte`
     */
    get indexSizeY(): number {
        return this.headerByties.subUint8Array(44, 4).toNumber();
    }
    set indexSizeY(value: number) {
        const temp: Uint8Array = value.toUint8Array(4);
        for (let i = 0; i < temp.length; i++) {
            this.headerByties[44 + i] = temp[i];
        }
    }
    //#endregion

    //#region Oritation Flat Direction
    /**
     * @description 當前 Wafer 平邊的方向
     * 開始位置 [48] 占 [2] `Byte`
     */
    get orientationFlatDirection(): number {
        return this.headerByties.subUint8Array(48, 2).toNumber();
    }
    set orientationFlatDirection(value: number) {
        const temp: Uint8Array = value.toUint8Array(2);
        for (let i = 0; i < temp.length; i++) {
            this.headerByties[48 + i] = temp[i];
        }
    }
    //#endregion

    //#region Final Editing Machine
    /**
     * @description 最後編輯的機台
     * 開始位置 [50] 占 [1] `Byte`
     */
    get finalEditingMachine(): number {
        return this.headerByties.subUint8Array(50, 1).toNumber();
    }
    set finalEditingMachine(value: number) {
        this.headerByties[50] = value.toUint8Array()[0];
    }
    //#endregion

    //#endregion

    //#region Map Version
    /**
     * @description 開始位置 [51] 占 [1] `Byte`
     */
    get mapVersion(): e.MapVersion {
        return this.headerByties.subUint8Array(51, 1)
            .toNumber() as e.MapVersion;
    }
    set mapVersion(value: e.MapVersion) {
        this.headerByties[51] = (value as number).toUint8Array()[0];
    }
    //#endregion

    //#region Map Data Area Row Size
    /**
     * @description Map 資料的 Row 數量
     * 開始位置 [52] 占 [2] `Byte`
     */
    get MapDataAreaRowSize(): number {
        return this.headerByties.subUint8Array(52, 2).toNumber();
    }
    set MapDataAreaRowSize(value: number) {
        const temp: Uint8Array = value.toUint8Array(2);
        for (let i = 0; i < temp.length; i++) {
            this.headerByties[52 + i] = temp[i];
        }
    }
    //#endregion

    //#region Map Data Area Line Size
    /**
     * @description Map 資料的 Column 數量
     * 開始位置 [54] 占 [2] `Byte`
     */
    get mapDataAreaLineSize(): number {
        return this.headerByties.subUint8Array(54, 2).toNumber();
    }
    set mapDataAreaLineSize(value: number) {
        const temp: Uint8Array = value.toUint8Array(2);
        for (let i = 0; i < temp.length; i++) {
            this.headerByties[54 + i] = temp[i];
        }
    }
    //#endregion

    //#region Map Data Form
    /**
     * @description Map 資料的格式
     * 開始位置 [56] 占 [4] `Byte`
     */
    get MapDataForm(): e.MapDataForm {
        return this.headerByties.subUint8Array(56, 4)
            .toNumber() as e.MapDataForm;
    }
    set MapDataForm(value: e.MapDataForm) {
        const temp: Uint8Array = (value as number).toUint8Array(4);
        for (let i = 0; i < temp.length; i++) {
            this.headerByties[56 + i] = temp[i];
        }
    }
    //#endregion

    //#region Wafer Probing Coordinate System Data
    //#region Wafer ID
    /**
     * @description Wafer ID: Lot ID + Wafer Index
     * 開始位置 [60] 占 [21] `Byte`
     */
    get waferId(): string {
        return this.headerByties.subUint8Array(60, 21).toASCIIString();
    }
    set waferId(value: string) {
        const temp: Uint8Array = value.toUint8Array(21);

        for (let i = 0; i < temp.length; i++) {
            this.headerByties[60 + i] = temp[i];
        }
    }
    //#endregion

    //#region Number of Probing
    /**
     * @description 探測的數量
     * 開始位置 [81] 占 [1] `Byte`
     */
    get numberOfProbing(): number {
        return this.headerByties.subUint8Array(81, 1).toNumber();
    }
    set numberOfProbing(value: number) {
        this.headerByties[81] = value.toUint8Array()[0];
    }
    //#endregion

    //#region Lot ID
    /**
     * @description Lot ID
     * 開始位置 [82] 占 [18] `Byte`
     */
    get lotId(): string {
        return this.headerByties.subUint8Array(82, 18).toASCIIString();
    }
    set lotId(value: string) {
        const temp: Uint8Array = value.toUint8Array(18);
        for (let i = 0; i < temp.length; i++) {
            this.headerByties[82 + i] = temp[i];
        }
    }
    //#endregion

    //#region Cassette No.
    /**
     * @description Wafer 箱號 (晶舟盒編號)
     * 開始位置 [100] 占 [2] `Byte`
     */
    get cassetteNumber(): number {
        return this.headerByties.subUint8Array(100, 2).toNumber();
    }
    set cassetteNumber(value: number) {
        const temp: Uint8Array = value.toUint8Array(2);
        for (let i = 0; i < temp.length; i++) {
            this.headerByties[100 + i] = temp[i];
        }
    }
    //#endregion

    //#region Slot No.
    /**
     * @description 槽編號
     * 開始位置 [102] 占 [2] `Byte`
     */
    get slotNumber(): number {
        return this.headerByties.subUint8Array(102, 2).toNumber();
    }
    set slotNumber(value: number) {
        const temp: Uint8Array = value.toUint8Array(2);
        for (let i = 0; i < temp.length; i++) {
            this.headerByties[102 + i] = temp[i];
        }
    }
    //#endregion

    //#region X Coordinates Increase Direction
    /**
     * @description X 座標的增加方向
     * 開始位置 [104] 占 [1] `Byte`
     */
    get xCoordinatesIncreaseDirection(): e.XCoordinatesIncreaseDirection {
        return this.headerByties.subUint8Array(104, 1)
            .toNumber() as e.XCoordinatesIncreaseDirection;
    }
    set xCoordinatesIncreaseDirection(value: e.XCoordinatesIncreaseDirection) {
        this.headerByties[104] = (value as number).toUint8Array()[0];
    }
    //#endregion

    //#region Y Coordinates Increase Direction
    /**
     * @descriptionY 座標的增加方向
     * 開始位置 [105] 占 [1] `Byte`
     */
    get yCoordinatesIncreaseDirection(): e.YCoordinatesIncreaseDirection {
        return this.headerByties.subUint8Array(105, 1)
            .toNumber() as e.YCoordinatesIncreaseDirection;
    }
    set yCoordinatesIncreaseDirection(value: e.YCoordinatesIncreaseDirection) {
        this.headerByties[105] = (value as number).toUint8Array()[0];
    }
    //#endregion

    //#region Reference Die Setting Procedures
    /**
     * @description 參考 Die 設定程序
     * 開始位置 [106] 占 [1] `Byte`
     */
    get referenceDieSettingProcedures(): e.ReferenceDieSettingProcedures {
        return this.headerByties.subUint8Array(106, 1)
            .toNumber() as e.ReferenceDieSettingProcedures;
    }
    set referenceDieSettingProcedures(value: e.ReferenceDieSettingProcedures) {
        this.headerByties[106] = (value as number).toUint8Array()[0];
    }
    //#endregion

    //#region Target Die Position X
    /**
     * @description 參考 Die 相對於 Wafer 中心的座標 X
     * 開始位置 [108] 占 [4] `Byte`
     */
    get targetDiePositionX(): number {
        return this.headerByties.subUint8Array(108, 4).toNumber();
    }
    set targetDiePositionX(value: number) {
        const temp: Uint8Array = value.toUint8Array(4);
        for (let i = 0; i < temp.length; i++) {
            this.headerByties[108 + i] = temp[i];
        }
    }
    //#endregion

    //#region Target Die Position Y
    /**
     * @description 參考 Die 相對於 Wafer 中心的座標 Y
     * 開始位置 [112] 占 [4] `Byte`
     */
    get targetDiePositionY(): number {
        return this.headerByties.subUint8Array(112, 4).toNumber();
    }
    set targetDiePositionY(value: number) {
        const temp: Uint8Array = value.toUint8Array(4);
        for (let i = 0; i < temp.length; i++) {
            this.headerByties[112 + i] = temp[i];
        }
    }
    //#endregion

    //#region Reference Die Coordination X
    /**
     * @description 參考 Die 的座標 X
     * 開始位置 [116] 占 [2] `Byte
     */
    get referenceDieCoordinationX(): number {
        return this.headerByties.subUint8Array(116, 2).toNumber();
    }
    set referenceDieCoordinationX(value: number) {
        const temp: Uint8Array = value.toUint8Array(2);
        for (let i = 0; i < temp.length; i++) {
            this.headerByties[116 + i] = temp[i];
        }
    }
    //#endregion

    //#region Reference Die Coordination Y
    /**
     * @description 參考 Die 的座標 Y
     * 開始位置 [118] 占 [2] `Byte`
     */
    get referenceDieCoordinationY(): number {
        return this.headerByties.subUint8Array(118, 2).toNumber();
    }
    set referenceDieCoordinationY(value: number) {
        const temp = value.toUint8Array(2);
        for (let i = 0; i < temp.length; i++) {
            this.headerByties[118 + i] = temp[i];
        }
    }
    //#endregion

    //#region Probing Start Position
    /**
     * @description 探測開始的位置
     * 開始位置 [120] 占 [1] `Byte`
     */
    get probingStartPosition(): e.ProbingStartPosition {
        return this.headerByties.subUint8Array(120, 1)
            .toNumber() as e.ProbingStartPosition;
    }
    set probingStartPosition(value: e.ProbingStartPosition) {
        this.headerByties[120] = (value as number).toUint8Array()[0];
    }
    //#endregion

    //#region Probing Direction
    /**
     * @description 探測方向
     * 開始位置 [121] 占 [1] `Byte`
     */
    get probingDirection(): e.ProbingDirection {
        return this.headerByties.subUint8Array(121, 1)
            .toNumber() as e.ProbingDirection;
    }
    set probingDirection(value: e.ProbingDirection) {
        this.headerByties[121] = (value as number).toUint8Array()[0];
    }
    //#endregion

    //#region Distance X To Wafer Center Die Origin
    /**
     * @description  Die 探測開始位置到 Wafer 中心的 X 距離
     * 開始位置 [124] 占 [4] `Byte`
     */
    get distanceXToWaferCenterDieOrigin(): number {
        return this.headerByties.subUint8Array(124, 4).toNumber();
    }
    set distanceXToWaferCenterDieOrigin(value: number) {
        const temp: Uint8Array = value.toUint8Array(4);
        for (let i = 0; i < temp.length; i++) {
            this.headerByties[124 + i] = temp[i];
        }
    }
    //#endregion

    //#region Distance Y To Wafer Center Die Origin
    /**
     * @description Die 探測開始位置到 Wafer 中心的 Y 距離
     * 開始位置 [128] 占 [4] `Byte`
     */
    get distanceYToWaferCenterDieOrigin(): number {
        return this.headerByties.subUint8Array(128, 4).toNumber();
    }
    set distanceYToWaferCenterDieOrigin(value: number) {
        const temp: Uint8Array = value.toUint8Array(4);
        for (let i = 0; i < temp.length; i++) {
            this.headerByties[128 + i] = temp[i];
        }
    }
    //#endregion

    //#region Coordination X of Wafer Center Die
    /**
     * @description Wafer 中心 Die 的座標 X
     * 開始位置 [132] 占 [4] `Byte
     */
    get coordinationXOfWaferCenterDie(): number {
        return this.headerByties.subUint8Array(132, 4).toNumber();
    }
    set coordinationXOfWaferCenterDie(value: number) {
        const temp: Uint8Array = value.toUint8Array(4);
        for (let i = 0; i < temp.length; i++) {
            this.headerByties[132 + i] = temp[i];
        }
    }
    //#endregion

    //#region Coordination X of Wafer Center Die
    /**
     * @description Wafer 中心 Die 的座標 Y
     * 開始位置 [136] 占 [4] `Byte`
     */
    get coordinationYOfWaferCenterDie(): number {
        return this.headerByties.subUint8Array(136, 4).toNumber();
    }
    set coordinationYOfWaferCenterDie(value: number) {
        const temp: Uint8Array = value.toUint8Array(4);
        for (let i = 0; i < temp.length; i++) {
            this.headerByties[136 + i] = temp[i];
        }
    }
    //#endregion
    //#endregion

    //#region Informatin Per Die
    //#region First Die Coordination X
    /**
     * @description 第一個 Die 的座標 X
     * 開始位置 [140] 占 [4] `Byte
     */
    get firstDieCoordinationX(): number {
        return this.headerByties.subUint8Array(140, 4).toNumber();
    }
    set firstDieCoordinationX(value: number) {
        const temp: Uint8Array = value.toUint8Array(4);
        for (let i = 0; i < temp.length; i++) {
            this.headerByties[140 + i] = temp[i];
        }
    }
    //#endregion

    //#region First Die Coordination Y
    /**
     * @description 第一個 Die 的座標 Y
     * 開始位置 [144] 占 [4] `Byte`
     */
    get firstDieCoordinationY(): number {
        return this.headerByties.subUint8Array(144, 4).toNumber();
    }
    set firstDieCoordinationY(value: number) {
        const temp = value.toUint8Array(4);
        for (let i = 0; i < temp.length; i++) {
            this.headerByties[144 + i] = temp[i];
        }
    }
    // #endregion
    // #endregion

    //#region Wafer Testing Start Time Data
    /**
     * @description Wafer 開始測試的時間
     * 開始位置 [148] 占 [10] `Byte`
     */
    get waferTestingStartDateTime(): Date {
        return getDateTime(this.headerByties, 148);
    }
    set waferTestingStartDateTime(value: Date) {
        const temp = getDateTimeString(value);
        for (let i = 0; i < temp.length; i++) {
            this.headerByties[148 + i] = temp[i];
        }
    }
    //#endregion

    //#region Wafer Testing End Time Data
    /**
     * @description Wafer 結束測試的時間
     * 開始位置 [160] 占 [12] `Byte`
     */
    get waferTestingEndDateTime(): Date {
        return getDateTime(this.headerByties, 160)
    }
    set waferTestingEndDateTime(value: Date) {
        const temp = getDateTimeString(value);
        for (let i = 0; i < temp.length; i++) {
            this.headerByties[160 + i] = temp[i];
        }
    }
    //#endregion

    //#region Wafer Loading Time Data
    /// <summary>
    /// Wafer 讀進機台的時間
    /// <br/>
    /// 開始位置 [172] 占 [12] <see langword="byte"/>
    /// </summary>
    get waferLoadingDateTime(): Date {
        return getDateTime(this.headerByties, 172);
    }
    set waferLoadingDateTime(value: Date) {
        const temp = getDateTimeString(value);
        for (let i = 0; i < temp.length; i++) {
            this.headerByties[172 + i] = temp[i];
        }
    }
    //#endregion

    //#region Wafer Unloading Time Data
    /// <summary>
    /// Wafer 從機台退出的時間
    /// <br/>
    /// 開始位置 [184] 占 [12] <see langword="byte"/>
    /// </summary>
    get waferUnloadingDateTime(): Date {
        return getDateTime(this.headerByties, 184);
    }
    set waferUnloadingDateTime(value: Date) {
        const temp = getDateTimeString(value);
        for (let i = 0; i < temp.length; i++) {
            this.headerByties[184 + i] = temp[i];
        }
    }
    //#endregion

    //#region Machine Number Special Characters
    /**
     * @description 機台號碼特殊字元
     * 開始位置 [196] 占 [12] `Byte`
     */
    get machineNumberSpecialCharacter(): string {
        return this.headerByties.subUint8Array(196, 12).toASCIIString();
    }
    set machineNumberSpecialCharacter(value: string) {
        const temp: Uint8Array = value.toUint8Array(12);
        for (let i = 0; i < temp.length; i++) {
            this.headerByties[196 + i] = temp[i];
        }
    }
    //#endregion

    //#region Testing Result
    //#region Testing End Information
    /**
     * @description 測試結束後的狀態
     * 開始位置 [208] 占 [1] `Byte`
     */
    get TestingEndInformation(): e.TestingEndInformation {
        return this.headerByties.subUint8Array(208, 1).toNumber() as e.TestingEndInformation;
    }
    set TestingEndInformation(value: e.TestingEndInformation) {
        this.headerByties[208] = (value as number).toUint8Array()[0];
    }
    //#endregion

    //#region Total Tested Die
    /**
     *  @description 所有測試的 Die 數量
     * 開始位置 [210] 占 [2] `Byte`
     */
    get totalTestedDie(): number {
        return this.headerByties.subUint8Array(210, 2).toNumber();
    }
    set totalTestedDie(value: number) {
        const temp: Uint8Array = value.toUint8Array(2);
        for (let i = 0; i < temp.length; i++) {
            this.headerByties[210 + i] = temp[i];
        }
    }
    //#endregion

    //#region Total Pass Die
    /**
     * @description 所有 Pass 的 Die 數量
     * 開始位置 [212] 占 [2] `Byte
     */
    get totalPassDie(): number {
        return this.headerByties.subUint8Array(212, 2).toNumber();
    }
    set totalPassDie(value: number) {
        const temp: Uint8Array = value.toUint8Array(2);
        for (let i = 0; i < temp.length; i++) {
            this.headerByties[212 + i] = temp[i];
        }
    }
    //#endregion

    //#region Total Fail Die
    /**
     * @description 所有 Fail 的 Die 數量
     * 開始位置 [214] 占 [2] <see langword="byte"/>
     */
    get totalFailDie(): number {
        return this.headerByties.subUint8Array(214, 2).toNumber();
    }
    set totalFailDie(value: number) {
        const temp = value.toUint8Array(2);
        for (let i = 0; i < temp.length; i++) {
            this.headerByties[214 + i] = temp[i];
        }
    }
    //#endregion
    //#endregion

    //#region Test Die Information Address
    /**
     * @description 所有測試的 Die 在檔案內開始的自結位置，一個 `DieBase` 6 `Byte`
     * 開始位置 [216] 占 [4] `Byte
     */
    get testDieInformationAddress(): number {
        return this.headerByties.subUint8Array(216, 4).toNumber();
    }
    set testDieInformationAddress(value: number) {
        const temp: Uint8Array = value.toUint8Array(4);
        for (let i = 0; i < temp.length; i++) {
            this.headerByties[216 + i] = temp[i];
        }
    }
    //#endregion

    //#region Number Of Line Category Data
    /**
     * @description 線類別資料的數量
     * 開始位置 [220] 占 [4] `Byte`
     */
    get numberOfLineCategoryData(): number {
        return this.headerByties.subUint8Array(220, 4).toNumber();
    }
    set numberOfLineCategoryData(value: number) {
        const temp: Uint8Array = value.toUint8Array(4);
        for (let i = 0; i < temp.length; i++) {
            this.headerByties[220 + i] = temp[i];
        }
    }
    //#endregion

    //#region Line Category Address
    /**
     * @description 線類別位置
     * 開始位置 [224] 占 [4] `Byte`
     */
    get lineCategoryAddress(): number {
        return this.headerByties.subUint8Array(224, 4).toNumber();
    }
    set lineCategoryAddress(value: number) {
        const temp = value.toUint8Array(4);
        for (let i = 0; i < temp.length; i++) {
            this.headerByties[224 + i] = temp[i];
        }
    }
    //#endregion

    //#region Extended Map Information
    //#region Map File Configuration
    /** 
     * @description `TSK`檔案的結構  
     * 開始位置 [228] 占 [2] `Byte`
     */
    get mapFileConfiguration(): number {
        return this.headerByties.subUint8Array(228, 2).toNumber();
    }
    set mapFileConfiguration(value: number) {
        const temp: Uint8Array = value.toUint8Array(2);
        for (let i = 0; i < temp.length; i++) {
            this.headerByties[228 + i] = temp[i];
        }
    }

    /** @description `TSK`檔案內容結構表示 */
    get fileStructure() : string[] {
        return Array.from(this.mapFileConfiguration.toString(2).padStart(16,'0')).reverse();
    }
    //#endregion

    //#region Max Multi Site
    /** 
     * @description 最大多站點  
     * 開始位置 [230] 占 [2] `Byte`
     */
    get maxMultiSite(): number {
        return this.headerByties.subUint8Array(230, 2).toNumber();
    }
    set maxMultiSite(value: number) {
        const temp = value.toUint8Array(2);
        for (let i = 0; i < temp.length; i++) {
            this.headerByties[230 + i] = temp[i];
        }
    }
    //#endregion

    //#region Max Categories
    /** 
     * @description 最大類別  
     * 開始位置 [232] 占 [2] <see langword="byte"/>
     */
    get maxCategories(): number {
        return this.headerByties.subUint8Array(232, 2).toNumber();
    }
    set maxCategories(value: number) {
        const temp = value.toUint8Array(2);
        for (let i = 0; i < temp.length; i++) {
            this.headerByties[232 + i] = temp[i];
        }
    }
    //#endregion
    //#endregion

    /**
     * `HeaderBase` 的資料來源
     */
    public headerByties: Uint8Array;

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
        this.headerByties = headerBlock;
        this.ignoreList = ['M', 'S', '0'];
    }
}
