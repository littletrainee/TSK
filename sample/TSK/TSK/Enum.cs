namespace TSK
{
    #region First Word    
    /// <summary>
    /// Die Test Result 列舉
    /// </summary>
    public enum DieTestResult
    {
        /// <summary>
        /// Not Tested 
        /// <br/>
        /// 0 -> [00]
        /// </summary>
        NotTested,
        /// <summary>
        /// Pass Die 
        /// <br/>
        /// 1 -> [01]
        /// </summary>
        PassDie,
        /// <summary>
        /// Fail 1 Die
        /// <br/>
        /// 2 -> [10]
        /// </summary>
        Fail1Die,
        /// <summary>
        /// Fail 2 Die
        /// <br/>
        /// 3 -> [11]
        /// </summary>
        Fail2Die
    }

    /// <summary>
    /// Marking 列舉
    /// </summary>
    public enum Marking
    {
        /// <summary>
        /// No
        /// <br/>
        /// 0 -> [0]
        /// </summary>
        No,
        /// <summary>
        /// Yes (After Marking: 1)
        /// <br/>
        /// 1-> [1]
        /// </summary>
        Yes
    }

    /// <summary>
    /// Fail Mark Inspection 列舉
    /// </summary>
    public enum FailMarkInspection
    {
        /// <summary>
        /// Yes
        /// <br/>
        /// 0 -> [0]
        /// </summary>
        Yes,
        /// <summary>
        /// No
        /// <br/>
        /// 1 -> [1]
        /// </summary>
        No
    }

    /// <summary>
    /// Re-Probing Result 列舉
    /// </summary>
    public enum ReProbingResult
    {
        /// <summary>
        /// Not Re-Probed
        /// <br/>
        /// 0 -> [00]
        ///  </summary>
        NotReProbed,
        /// <summary>
        /// Passed At Re-Probing
        /// <br/>
        /// 1 -> [01]
        /// </summary>
        PassedAtReProbing,
        /// <summary>
        /// Failed At Re-Probing
        /// <br/>
        /// 2 -> [10]
        /// </summary>
        FailAtReProbing,
        /// <summary>
        /// Perform fail (for special user)
        /// <br/>
        /// 3 -> [11]
        /// </summary>
        PerformFail
    }

    /// <summary>
    /// Needle Mark Inspection Result 列舉
    /// </summary>
    public enum NeedleMarkInspectionResult
    {
        /// <summary>
        /// OK
        /// <br/>
        /// 0 -> [0]
        /// </summary>
        OK,
        /// <summary>
        /// NG
        /// <br/>
        /// 1 -> [1]
        /// </summary>
        NG
    }
    #endregion

    #region Second Word    
    /// <summary>
    /// Die Property
    /// </summary>
    public enum DieProperty
    {
        /// <summary>
        /// Skip Die
        /// <br/>
        /// 0 -> [00]
        /// </summary>
        SkipDie,
        /// <summary>
        /// Probing Die
        /// <br/>
        /// 1 -> [01]
        /// </summary>
        ProbingDie,
        /// <summary>
        /// Compulsory Marking Die
        /// <br/>
        /// 2 -> [10]
        /// </summary>
        CompulsoryMarkingDie
    }

    /// <summary>
    /// Needle Marking Inspection Execution Die Selection 列舉
    /// </summary>
    public enum NeedleMarkingInspectionExecutionDieSelection
    {
        /// <summary>
        /// NO
        /// <br/>
        /// 0 -> [0]
        /// </summary>
        No,
        /// <summary>
        /// Yes
        /// <br/>
        /// 1 -> [1]
        /// </summary>
        Yes
    }

    /// <summary>
    /// Code Bit 列舉
    /// </summary>
    public enum CodeBit
    {
        /// <summary>
        /// + Data
        /// <br/>
        /// 0 -> [0]
        /// </summary>
        PlusData,
        /// <summary>
        /// - Data
        /// <br/>
        /// 1 -> [1]
        /// </summary>
        MinusData
    }
    /// <summary>
    /// Sample Die 列舉
    /// </summary>
    public enum SampleDie
    {
        /// <summary>
        /// 非 Sample Die
        /// </summary>
        No,
        /// <summary>
        /// Sample Die
        /// </summary>
        Yes
    }
    /// <summary>
    /// Dummy Data 列舉 用於區分是否為不需要測試的位置
    /// </summary>
    public enum DummyData
    {
        /// <summary>
        /// 測試區域
        /// </summary>
        TestArea,
        /// <summary>
        /// 不用測試的區域
        /// </summary>
        NoNeedTestArea
    }
    #endregion

    #region Third Word    
    /// <summary>
    /// Finish Flag 列舉
    /// </summary>
    public enum FinishFlag
    {
        /// <summary>
        /// Not tested
        /// <br/>
        /// 0 -> [0]
        /// </summary>
        NotTested,
        /// <summary>
        /// Tested
        /// <br/>
        /// 1 -> [1]
        /// </summary>
        Tested
    }

    /// <summary>
    /// Block Area 列舉
    /// </summary>
    public enum BlockArea
    {
        /// <summary>
        /// Block1
        /// <br/>
        /// 0 -> [00]
        /// </summary>
        Block1,
        /// <summary>
        /// Block2
        /// <br/>
        /// 1 -> [01]
        /// </summary>
        Block2,
        /// <summary>
        /// Block3
        /// <br/>
        /// 2 -> [10]
        /// </summary>
        Block3
    }
    #endregion

    /// <summary>
    /// Map Version
    /// </summary>
    public enum MapVersion
    {
        /// <summary>
        /// Normal 
        /// </summary>
        Normal,
        /// <summary>
        /// 250,000 Chips
        /// </summary>
        Chips250k,
        /// <summary>
        /// 256 Multi-sites
        /// </summary>
        MultiSites256,
        /// <summary>
        /// 256 Multi-sites (Without Extended Header Information)
        /// </summary>
        MultiSites256WithoutExtendedHeader,
        /// <summary>
        /// 1024 category
        /// </summary>
        Category1024,
        /// <summary>
        /// 2048 (256 Over 9 Multi-sites)
        /// </summary>
        Category2048_256Over9MultiSites,
        /// <summary>
        /// Extended Header 2
        /// </summary>
        ExtendedHeader2
    }

    /// <summary>
    /// <see cref="MapDataForm"/> 列舉
    /// </summary>
    public enum MapDataForm
    {
        /// <summary>
        /// 6 <see langword="byte"/>
        /// </summary>
        V6Byte,
        /// <summary>
        /// 1 <see langword="byte"/>
        /// </summary>
        V1Byte,
        /// <summary>
        /// 2 <see langword="byte"/>
        /// </summary>
        V2Byte,
        /// <summary>
        /// 3 <see langword="byte"/>
        /// </summary>
        V3Byte
    }

    /// <summary>
    /// <see cref="XCoordinatesIncreaseDirection"/> 列舉
    /// </summary>
    public enum XCoordinatesIncreaseDirection
    {
        /// <summary>
        /// 向左
        /// </summary>
        Leftward = 1,
        /// <summary>
        /// 向右
        /// </summary>
        Rightward = 2
    }

    /// <summary>
    /// <see cref="YCoordinatesIncreaseDirection"/> 列舉
    /// </summary>
    public enum YCoordinatesIncreaseDirection
    {
        /// <summary>
        /// 向前
        /// </summary>
        Forward = 1,
        /// <summary>
        /// 向後
        /// </summary>
        Backward = 2
    }

    /// <summary>
    /// <see cref="ReferenceDieSettingProcedures"/> 列舉
    /// </summary>
    public enum ReferenceDieSettingProcedures
    {
        /// <summary>
        /// Wafer Center Die
        /// </summary>
        WaferCenter = 1,
        /// <summary>
        /// Target Sense Die
        /// </summary>
        TargetSense = 2,
        /// <summary>
        /// Teaching Die
        /// </summary>
        Teaching = 3
    }

    /// <summary>
    /// <see cref="ProbingStartPosition"/> 列舉
    /// </summary>
    public enum ProbingStartPosition
    {
        /// <summary>
        /// upper-left
        /// </summary>
        UpperLeft = 1,
        /// <summary>
        ///upper-right
        /// </summary>
        UpperRight = 2,
        /// <summary>
        /// lower-left
        /// </summary>
        LowerLeft = 3,
        /// <summary>
        /// lower-right
        /// </summary>
        LowerRight = 4
    }

    /// <summary>
    /// <see cref="ProbingDirection"/> 列舉
    /// </summary>
    public enum ProbingDirection
    {
        /// <summary>
        /// leftward
        /// </summary>
        Leftward = 1,
        /// <summary>
        /// rightward
        /// </summary>
        Rightward = 2,
        /// <summary>
        /// upward
        /// </summary>
        Upward = 3,
        /// <summary>
        /// backward
        /// </summary>
        Backward = 4
    }

    /// <summary>
    /// <see cref="TestingEndInformation"/> 列舉
    /// </summary>
    public enum TestingEndInformation
    {
        /// <summary>
        /// Normal End
        /// </summary>
        NormalEnd,
        /// <summary>
        /// Yield NG
        /// </summary>
        YieldNG,
        /// <summary>
        /// Continuous Fail NG
        /// </summary>
        ContinuousFAILNG,
        /// <summary>
        /// Manual Unload
        /// </summary>
        ManualUnload,
        /// <summary>
        /// Other Reject
        /// </summary>
        OtherReject
    }
}
