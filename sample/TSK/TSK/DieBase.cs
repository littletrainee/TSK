using System;
using System.Collections.Generic;
using System.Drawing;

namespace TSK
{
    /// <summary>
    /// <see cref="DieBase"/> 物件
    /// </summary>
    public abstract class DieBase
    {
        /// <summary>
        /// 當前 Die 的 <see langword="byte"/> <see cref="Array"/>
        /// </summary>
        public ArraySegment<byte> CurrentBytes { get; set; }
        #region  First Word        
        /// <summary>
        /// 第 [1] 字節的第 [1] 區段 <see cref="DieTestResult"/> 占 [2] 個 <see cref="Bit"/> 位置為 [1,2]
        /// </summary>
        public DieTestResult DieTestResult
        {
            get
            {
                return (DieTestResult)((this.CurrentBytes.Array[this.CurrentBytes.Offset] & 0b11000000) >> 6);
            }
            set
            {
                this.CurrentBytes.Array[this.CurrentBytes.Offset] = (byte)((this.CurrentBytes.Array[this.CurrentBytes.Offset] & 0b00111111)
                                                                          | (((int)value << 6) & 0b11000000));
            }
        }
        /// <summary>
        /// 第 [1] 字節的第 [2] 區段 <see cref="Marking"/> 占 [1] 個 <see cref="Bit"/> 位置為 [3]
        /// </summary>
        public Marking Marking
        {
            get
            {
                return (Marking)((this.CurrentBytes.Array[this.CurrentBytes.Offset] & 0b00100000) >> 5);
            }
            set
            {
                this.CurrentBytes.Array[this.CurrentBytes.Offset] = (byte)((this.CurrentBytes.Array[this.CurrentBytes.Offset] & 0b11011111)
                                                                          | ((int)value << 5) & 0b00100000);
            }
        }
        /// <summary>
        /// 第 [1] 字節的第 [3] 區段 <see cref="FailMarkInspection"/> 占 [1] 個 <see cref="Bit"/> 位置為 [4]
        /// </summary>
        public FailMarkInspection FailMarkInspection
        {
            get
            {
                return (FailMarkInspection)((this.CurrentBytes.Array[this.CurrentBytes.Offset] & 0b00010000) >> 4);
            }
            set
            {
                this.CurrentBytes.Array[this.CurrentBytes.Offset] = (byte)((this.CurrentBytes.Array[this.CurrentBytes.Offset] & 0b11101111)
                                                                          | ((int)value << 4) & 0b00010000);
            }
        }
        /// <summary>
        /// 第 [1] 字節的第 [4] 區段 <see cref="ReProbingResult"/> 占 [2] 個 <see cref="Bit"/> 位置為 [5,6]
        /// </summary>
        public ReProbingResult ReProbingResult
        {
            get
            {
                return (ReProbingResult)((this.CurrentBytes.Array[this.CurrentBytes.Offset] & 0b00001100) >> 2);
            }
            set
            {
                this.CurrentBytes.Array[this.CurrentBytes.Offset] = (byte)((this.CurrentBytes.Array[this.CurrentBytes.Offset] & 0b11110011)
                                                                          | ((int)value << 2) & 0b00001100);
            }
        }
        /// <summary>
        /// 第 [1] 字節的第 [5] 區段 <see cref="NeedleMarkInspectionResult"/> 占  [1] 個 <see cref="Bit"/> 位置為 [7]
        /// </summary>
        public NeedleMarkInspectionResult NeedleMarkInspectionResult
        {
            get
            {
                return (NeedleMarkInspectionResult)((this.CurrentBytes.Array[this.CurrentBytes.Offset] & 0b00000010) >> 1);
            }
            set
            {
                this.CurrentBytes.Array[this.CurrentBytes.Offset] = (byte)((this.CurrentBytes.Array[this.CurrentBytes.Offset] & 0b11111101)
                                                                          | ((int)value << 1) & 0b00000010);
            }
        }
        /// <summary>
        /// 第 [1] 字節的第 [6] 區段 DieCorrdinatorValuesX 占 [9] 個 <see cref="Bit"/> 位置為第[1]個 <see langword="byte"/> 的 [8] 與第[2]個 <see langword="byte"/> 的 [1~8]
        /// </summary>
        public int DieCoordinatorX
        {
            get
            {
                return ((this.CurrentBytes.Array[this.CurrentBytes.Offset] & 0b00000001) << 8)
                       | (this.CurrentBytes.Array[this.CurrentBytes.Offset + 1]);
            }
            set
            {
                this.CurrentBytes.Array[this.CurrentBytes.Offset] = (byte)((this.CurrentBytes.Array[this.CurrentBytes.Offset] & 0b11111110)
                                                                    | ((value & 0b00000001_00000000) >> 8));
                this.CurrentBytes.Array[this.CurrentBytes.Offset + 1] = (byte)(this.CurrentBytes.Array[this.CurrentBytes.Offset + 1] | (value & 0b11111111));
            }
        }
        /// <summary>
        /// 第 [1] 字節，[2] 個 <see langword="byte"/>， [16] 個 <see cref="Bit"/>
        /// </summary>
        public byte[] FirstWord
        {
            get
            {
                return new byte[]
                {
                    this.CurrentBytes.Array[this.CurrentBytes.Offset],
                    this.CurrentBytes.Array[this.CurrentBytes.Offset + 1]
                };
            }
            set
            {
                this.CurrentBytes.Array[this.CurrentBytes.Offset] = value[0];
                this.CurrentBytes.Array[this.CurrentBytes.Offset + 1] = value[1];
            }
        }
        #endregion

        #region Second Word
        /// <summary>
        /// 第 [2] 字節的第 [1] 區段 <see cref="DieProperty"/> 占 [2] 個 <see cref="Bit"/> 位置為 [1,2]
        /// </summary>
        public DieProperty DieProperty
        {
            get
            {
                return (DieProperty)((this.CurrentBytes.Array[this.CurrentBytes.Offset + 2] & 0b11000000) >> 6);
            }
            set
            {
                this.CurrentBytes.Array[this.CurrentBytes.Offset + 2] = (byte)((this.CurrentBytes.Array[this.CurrentBytes.Offset + 2] & 0b00111111)
                                                                              | (((int)value << 6) & 0b11000000));
            }
        }
        /// <summary>
        /// 第 [2] 字節的第 [2] 區段 <see cref="NeedleMarkingInspectionExecutionDieSelection"/> 
        /// 占 [1] 個 <see cref="Bit"/> 位置為 [3]
        /// </summary>
        public NeedleMarkingInspectionExecutionDieSelection NeedleMarkingInspectionExecutionDieSelection
        {
            get
            {
                return (NeedleMarkingInspectionExecutionDieSelection)((this.CurrentBytes.Array[this.CurrentBytes.Offset + 2] & 0b00100000) >> 5);
            }
            set
            {
                this.CurrentBytes.Array[this.CurrentBytes.Offset + 2] = (byte)((this.CurrentBytes.Array[this.CurrentBytes.Offset + 2] & 0b11011111)
                                                                              | ((int)value << 5) & 0b00100000);
            }
        }
        /// <summary>
        /// 第 [2] 字節的第 [3] 區段 SamplingDie 占 [1] 個 <see cref="Bit"/> 位置為 [4]
        /// </summary>
        public SampleDie SamplingDie
        {
            get
            {
                return (SampleDie)((this.CurrentBytes.Array[this.CurrentBytes.Offset + 2] & 0b00010000) >> 4);
            }
            set
            {
                this.CurrentBytes.Array[this.CurrentBytes.Offset + 2] = (byte)((this.CurrentBytes.Array[this.CurrentBytes.Offset + 2] & 0b11101111)
                                                                              | ((int)value << 4) & 0b00010000);
            }
        }
        /// <summary>
        /// 第 [2] 字節的第 [4] 區段 <see cref="CodeBit"/> CodeBitOfCoordinatiorValueX 占 [1] 個 <see cref="Bit"/> 位置為 [5]
        /// </summary>
        public CodeBit CodeBitOfCoordinatorValueX
        {
            get
            {
                return (CodeBit)((this.CurrentBytes.Array[this.CurrentBytes.Offset + 2] & 0b00001000) >> 3);
            }
            set
            {
                this.CurrentBytes.Array[this.CurrentBytes.Offset + 2] = (byte)((this.CurrentBytes.Array[this.CurrentBytes.Offset + 2] & 0b11110111)
                                                                              | ((int)value << 3) & 0b00001000);
            }
        }
        /// <summary>
        /// 第 [2] 字節的第 [5] 區段 <see cref="CodeBit"/> CodeBitOfCoordinatorValueY 占  [1] 個 <see cref="Bit"/> 位置為 [6]
        /// </summary>
        public CodeBit CodeBitOfCoordinatorValueY
        {
            get
            {
                return (CodeBit)((this.CurrentBytes.Array[this.CurrentBytes.Offset + 2] & 0b00000100) >> 2);
            }
            set
            {
                this.CurrentBytes.Array[this.CurrentBytes.Offset + 2] = (byte)((this.CurrentBytes.Array[this.CurrentBytes.Offset + 2] & 0b11111011)
                                                                              | ((int)value << 2) & 0b00000100);
            }
        }
        /// <summary>
        /// 第 [2] 字節的第 [6] 區段 DummyData 占 [1] 個 <see cref="Bit"/> 位置為 [7]
        /// </summary>
        public DummyData DummyData
        {
            get
            {
                return (DummyData)((this.CurrentBytes.Array[this.CurrentBytes.Offset + 2] & 0b00000010) >> 1);
            }
            set
            {
                this.CurrentBytes.Array[this.CurrentBytes.Offset + 2] = (byte)((this.CurrentBytes.Array[this.CurrentBytes.Offset + 2] & 0b11111101)
                                                                              | ((int)value << 1) & 0b00000010);
            }
        }
        /// <summary>
        /// 第 [2] 字節的第 [7] 區段 DieCoordinatorY 占 [9] 個 <see cref="Bit"/> 位置為第[1]個 <see langword="byte"/> 的 [8] 與第[2]個 <see langword="byte"/> 的 [1~8]
        /// </summary>
        public int DieCoordinatorY
        {
            get
            {
                return ((this.CurrentBytes.Array[this.CurrentBytes.Offset + 2] & 0b00000001) << 8)
                       | (this.CurrentBytes.Array[this.CurrentBytes.Offset + 3]);
            }
            set
            {
                this.CurrentBytes.Array[this.CurrentBytes.Offset + 2] = (byte)((this.CurrentBytes.Array[this.CurrentBytes.Offset + 2] & 0b11111110)
                                                                              | ((value & 0b00000001_00000000) >> 8));
                this.CurrentBytes.Array[this.CurrentBytes.Offset + 3] = (byte)(this.CurrentBytes.Array[this.CurrentBytes.Offset + 3] | (value & 0b11111111));
            }
        }
        /// <summary>
        /// 第 [2] 字節，[2] 個 <see cref="Generic"/>，[16] 個 <see cref="Bit"/>
        /// </summary> 
        public byte[] SecondWord
        {
            get
            {
                return new byte[] { this.CurrentBytes.Array[this.CurrentBytes.Offset + 2], this.CurrentBytes.Array[this.CurrentBytes.Offset + 3] };
            }
            set
            {
                this.CurrentBytes.Array[this.CurrentBytes.Offset + 2] = value[0];
                this.CurrentBytes.Array[this.CurrentBytes.Offset + 3] = value[1];
            }
        }
        #endregion

        #region Third Word        
        /// <summary>
        /// 第 [3] 字節的的第 [1] 區段 Measurement<see cref="FinishFlag"/> 占 [1] 個 <see cref="Bit"/> 位置為 [1]
        /// </summary>
        public FinishFlag MeasurementFinishFlag
        {
            get
            {
                return (FinishFlag)((this.CurrentBytes.Array[this.CurrentBytes.Offset + 4] & 0b10000000) >> 7);
            }
            set
            {
                this.CurrentBytes.Array[this.CurrentBytes.Offset + 4] = (byte)((this.CurrentBytes.Array[this.CurrentBytes.Offset + 4] & 0b01111111)
                                                                              | (((int)value << 7) & 0b10000000));
            }
        }
        /// <summary>
        /// 第 [3] 字節的第 [2] 區段 RejectChipFlag 占 [1] 個 <see cref="Bit"/> 位置為 [2]
        /// </summary>
        public int RejectChipFlag
        {
            get
            {
                return (this.CurrentBytes.Array[this.CurrentBytes.Offset + 4] & 0b01000000) >> 6;
            }
            set
            {
                this.CurrentBytes.Array[this.CurrentBytes.Offset + 4] = (byte)((this.CurrentBytes.Array[this.CurrentBytes.Offset + 4] & 0b10111111)
                                                                              | ((value << 6) & 0b01000000));
            }
        }
        /// <summary>
        /// 第 [3] 字節的第 [3] 區段 TestExecutionSiteNumber 占 [6] 個 <see cref="Bit"/> 位置為 [3~8]
        /// </summary>
        public int TestExecutionSiteNumber
        {
            get
            {
                return this.CurrentBytes.Array[this.CurrentBytes.Offset + 4] & 0b00111111;
            }
            set
            {
                this.CurrentBytes.Array[this.CurrentBytes.Offset + 4] = (byte)((this.CurrentBytes.Array[this.CurrentBytes.Offset + 4] & 0b11000000)
                                                                              | (value & 0b00111111));
            }
        }
        /// <summary>
        /// 第 [3] 字節的第 [4] 區段 <see cref="BlockArea"/> 占 [2] 個 <see cref="Bit"/> 位置為 [1,2]
        /// </summary>
        public BlockArea BlockArea
        {
            get
            {
                return (BlockArea)((this.CurrentBytes.Array[5] & 0b11000000) >> 6);
            }
            set
            {
                ((IList<byte>)this.CurrentBytes)[5] = (byte)((this.CurrentBytes.Array[5] & 0b00111111) | (((int)value << 6) & 0b11000000));

            }
        }
        /// <summary>
        /// 第 [3] 字節的第 [5] 區段 CategoryData 占 [6] 個 <see cref="Bit"/> 位置為 [3~8]
        /// </summary>
        public int CategoryData
        {
            get
            {
                return this.CurrentBytes.Array[this.CurrentBytes.Offset + 5] & 0b00111111;
            }
            set
            {
                this.CurrentBytes.Array[this.CurrentBytes.Offset + 5] = (byte)((this.CurrentBytes.Array[this.CurrentBytes.Offset + 5] & 0b11000000)
                                                                              | (value & 0b00111111));
            }
        }
        /// <summary>
        /// 第 [3] 字節，[2] 個 <see cref="Generic"/>，[16] 個 <see cref="Bit"/>
        /// </summary>
        public byte[] ThirdWord
        {
            get
            {
                return new byte[] { this.CurrentBytes.Array[this.CurrentBytes.Offset + 4], this.CurrentBytes.Array[this.CurrentBytes.Offset + 5] };
            }
            set
            {
                this.CurrentBytes.Array[this.CurrentBytes.Offset + 4] = value[0];
                this.CurrentBytes.Array[this.CurrentBytes.Offset + 5] = value[1];
            }
        }
        #endregion

        /// <summary>
        /// 獲取當前 <see cref="DieBase"/> 的代號字元
        /// </summary>
        public string DieCharacter
        {
            get
            {
                switch (this.DieProperty)
                {
                    case DieProperty.SkipDie when this.DummyData == DummyData.TestArea:
                        return "S";
                    case DieProperty.CompulsoryMarkingDie:
                        return "M";
                    default:
                        return this.ExtendedDieData is null
                            ? this.CategoryData.ToString()
                            : this.ExtendedDieData.MapVersion4ExtendedBinaryCategory.ToString();
                }
            }
        }
        /// <summary>
        /// Site Number
        /// </summary>
        public int SiteNumber
        {
            get
            {
                return this.ExtendedDieData is null
                    ? this.TestExecutionSiteNumber
                    : this.ExtendedDieData.MapVersion4ExtendedTestExecutionSite;
            }
            set
            {
                if (this.ExtendedDieData is null)
                {
                    this.TestExecutionSiteNumber = value;
                }
                else
                {
                    this.ExtendedDieData.MapVersion4ExtendedTestExecutionSite = value;
                }
            }
        }

        /// <summary>
        /// 獲取當前 <see cref="DieBase"/> 的座標
        /// </summary>
        /// <value>
        /// 用 Point 持有的座標資料
        /// </value>
        public Point Coordination
        {
            get
            {
                return new Point(
                x: this.CodeBitOfCoordinatorValueX == CodeBit.MinusData
                    ? -1 * this.DieCoordinatorX
                    : this.DieCoordinatorX,
                y: this.CodeBitOfCoordinatorValueY == CodeBit.MinusData
                    ? -1 * this.DieCoordinatorY
                    : this.DieCoordinatorY
                );
            }
        }

        /// <summary>
        /// 獲取當前的 <see cref="DieBase"/> 是否為 Pass Die.
        /// </summary>
        /// <value>
        ///   若為 Pass Die 則回傳 <c>true</c>，否則 <c>false</c>.
        /// </value>
        public bool IsPassDie
        {
            get
            {
                return this.DieTestResult == DieTestResult.PassDie;
            }
        }

        /// <summary>
        /// 實例化 <see cref="DieBase"/> 物件，並設置 <see cref="CurrentBytes"/>
        /// </summary>
        /// <param name="currentDieBytes">當前的 <see cref="DieBase"/> 來源資料</param>
        public DieBase(ArraySegment<byte> currentDieBytes)
        {
            this.CurrentBytes = currentDieBytes;
        }

        /// <summary>
        /// <see cref="ExtendedDieData"/> 
        /// </summary>
        public ExtendedDieBase ExtendedDieData { get; set; }
    }
}
