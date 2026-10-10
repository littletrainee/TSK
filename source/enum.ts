/** @description Map Version */
export enum MapVersion {
    /** @description Normal */
    Normal,
    /** @description 250,000 Chips */
    Chips250k,
    /** @description 256 Multi-sites */
    MultiSites256,
    /** @description 256 Multi-sites (Without Extended Header Information) */
    MultiSites256WithoutExtendedHeader,
    /** @description 1024 category */
    Category1024,
    /** @description 2048 (256 Over 9 Multi-sites) */
    Category2048_256Over9MultiSites,
    /** @description Extended Header 2 */
    ExtendedHeader2,
}

/** @description Map Data Form*/
export enum MapDataForm {
    /** @description 6 `Byte` */
    V6Byte,
    /** @description 1 `Byte` */
    V1Byte,
    /** @description 2 `Byte`*/
    V2Byte,
    /** @description 3 `Byte` */
    V3Byte,
}

/** @description X Coordinates Increase Direction */
export enum XCoordinatesIncreaseDirection {
    /** @description 向左 */
    Leftward = 1,
    /** @description 向右*/
    Rightward = 2,
}

/** @description Y Coordinates Increase Direction */
export enum YCoordinatesIncreaseDirection {
    /** @description 向前 */
    Forward = 1,
    /** @description 向後 */
    Backward = 2,
}

/** @description Reference Die Setting Procedures */
export enum ReferenceDieSettingProcedures
{
    /** @description Wafer Center Die */
    WaferCenter = 1,
    /** @description Target Sense Die */
    TargetSense = 2,
    /** @description Teaching Die */
    Teaching = 3
}

/** Probing Start Position 列舉 */
/// </summary>
export enum ProbingStartPosition
{
    /** @description upper-left */
    UpperLeft = 1,
    /** @description upper-right */
    UpperRight = 2,
    /** @description lower-left */
    LowerLeft = 3,
    /** @description lower-right */
    LowerRight = 4
}

/** @description ProbingDirection */
export enum ProbingDirection
{
    /** @description leftward */
    Leftward = 1,
    /** @description rightward */
    Rightward = 2,
    /** @description upward */
    Upward = 3,
    /** @description backward */
    Backward = 4
}

/** @description Testing End Information */
export enum TestingEndInformation {
    /** @description Normal End */
    NormalEnd,
    /** @description Yield NG */
    YieldNG,
    /** @description Continuous Fail NG */
    ContinuousFAILNG,
    /** @description Manual Unload */
    ManualUnload,
    /** @description Other Reject */
    OtherReject
}