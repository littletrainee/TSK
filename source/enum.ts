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
export enum ReferenceDieSettingProcedures {
    /** @description Wafer Center Die */
    WaferCenter = 1,
    /** @description Target Sense Die */
    TargetSense = 2,
    /** @description Teaching Die */
    Teaching = 3,
}

/** Probing Start Position 列舉 */
/// </summary>
export enum ProbingStartPosition {
    /** @description upper-left */
    UpperLeft = 1,
    /** @description upper-right */
    UpperRight = 2,
    /** @description lower-left */
    LowerLeft = 3,
    /** @description lower-right */
    LowerRight = 4,
}

/** @description ProbingDirection */
export enum ProbingDirection {
    /** @description leftward */
    Leftward = 1,
    /** @description rightward */
    Rightward = 2,
    /** @description upward */
    Upward = 3,
    /** @description backward */
    Backward = 4,
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
    OtherReject,
}

//#region First Word
/** @description Die Test Result */
export enum DieTestResult {
    /**
     * @description Not Tested  
     * 0 -> [00]
     */
    NotTested,
    /**
     * @description Pass Die  
     * 1 -> [01]
     */
    PassDie,
    /**
     * @description Fail 1 Die  
     * 2 -> [10]
     */
    Fail1Die,
    /**
     * @description Fail 2 Die  
     * 3 -> [11]
     */
    Fail2Die,
}

/** @description Marking */
export enum Marking {
    /**
     * @description No  
     * 0 -> [0]
     */
    No,
    /**
     * @description Yes (After Marking: 1)  
     * 1-> [1]
     */
    Yes,
}

/** @description Fail Mark Inspection 列舉 */
export enum FailMarkInspection {
    /**
     * @description Yes  
     * 0 -> [0]
     */
    Yes,
    /**
     * @description No  
     * 1 -> [1]
     */
    No,
}

/** @description Re-Probing Result */
export enum ReProbingResult {
    /**
     * @description Not Re-Probed  
     * 0 -> [00]
     */
    NotReProbed,
    /**
     * @description Passed At Re-Probing  
     * 1 -> [01]
     */
    PassedAtReProbing,
    /**
     * @description Failed At Re-Probing  
     * 2 -> [10]
     */
    FailAtReProbing,
    /**
     * @description Perform fail (for special user)  
     * 3 -> [11]
     */
    PerformFail,
}

/** @description Needle Mark Inspection Result */
export enum NeedleMarkInspectionResult {
    /**
     * @description OK  
     * 0 -> [0]
     */
    OK,
    /**
     * @description NG  
     * 1 -> [1]
     */
    NG,
}
//#endregion

//#region Second Word
/** @description Die Property */
export enum DieProperty {
    /**
     * @description Skip Die  
     * 0 -> [00]
     */
    SkipDie,
    /**
     * @description Probing Die  
     * 1 -> [01]
     */
    ProbingDie,
    /**
     * @description Compulsory Marking Die  
     * 2 -> [10]
     */
    CompulsoryMarkingDie,
}

/** @description Needle Marking Inspection Execution Die Selection */
export enum NeedleMarkingInspectionExecutionDieSelection {
    /**
     * @description NO  
     * 0 -> [0]
     */
    No,
    /**
     * @description Yes  
     * 1 -> [1]
     */
    Yes,
}

/** @description Code Bit */
export enum CodeBit {
    /**
     * @description `+` Data  
     * 0 -> [0]
     */
    PlusData,
    /**
     * @description `-` Data  
     * 1 -> [1]
     */
    MinusData,
}

/** @description Sample Die */
export enum SampleDie {
    /**
     * @description 非 Sample Die  
     * 0 -> [0]
     */
    No,
    /**
     * @description Sample Die  
     * 1 -> [1]
     */
    Yes,
}

/** @description Dummy Data 用於區分是否為不需要測試的位置 */
export enum DummyData {
    /**
     * @description 測試區域  
     * 0 -> [0]
     */
    TestArea,
    /**
     * @description 不用測試的區域  
     * 1 -> [1]
     */
    NoNeedTestArea,
}
//#endregion

//#region Third Word
/** @description Finish Flag */
export enum FinishFlag {
    /**
     * @description Not tested  
     * 0 -> [0]
     */
    NotTested,
    /**
     * @description Tested  
     * 1 -> [1]
     */
    Tested,
}

/** @description Block Area */
export enum BlockArea {
    /**
     * @description Block1  
     * 0 -> [00]
     */
    Block1,
    /**
     * @description Block2  
     * 1 -> [01]
     */
    Block2,
    /**
     * @description Block3  
     * 2 -> [10]
     */
    Block3,
}
//#endregion
