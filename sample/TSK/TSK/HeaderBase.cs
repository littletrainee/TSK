using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace TSK
{
    /// <summary>
    /// <see cref="HeaderBase"/> 物件
    /// </summary>
    public abstract class HeaderBase
    {
        /// <summary>
        /// 忽略字元清單 
        /// <code>
        /// { "0", "M", "S" }
        /// </code>
        /// </summary>
        public string[] IgnoreList { get; set; }

        #region Wafer Testing Setup Data
        /// <summary>
        /// 作業員名稱
        /// <br/>
        /// 開始位置 [0] 占 [20] <see langword="byte"/>
        /// </summary>
        public string OperatorName
        {
            get
            {
                return this.TSKHeaderByties.Array.SubByte(0, 20).ByteArrayToASCIIString();
            }
            set
            {
                byte[] temp = value.ASCIIStringToByteArray(20);
                for (int i = 0; i < temp.Length; i++)
                {
                    ((IList<byte>)this.TSKHeaderByties)[0 + i] = temp[i];
                }
            }
        }
        /// <summary>
        /// 型號
        /// <br/>
        /// 開始位置 [20] 占 [16] <see langword="byte"/>
        /// </summary>
        public string DeviceName
        {
            get
            {
                return this.TSKHeaderByties.Array.SubByte(20, 16).ByteArrayToASCIIString();
            }
            set
            {
                byte[] temp = value.ASCIIStringToByteArray(16);

                for (int i = 0; i < temp.Length; i++)
                {
                    ((IList<byte>)this.TSKHeaderByties)[20 + i] = temp[i];
                }
            }
        }
        /// <summary>
        /// Wafer 的尺寸，可能為：
        /// <br/>
        /// 40, 45, 50, 60, 80, 120 (Unit: 0.1 inch)
        /// <br/>
        /// 100, 115, 125, 150, 200, 300 (Unit: mm)
        /// <br/>
        /// 開始位置 [36] 占 [2] <see langword="byte"/>
        /// </summary>
        public int WaferSize
        {
            get
            {
                return this.TSKHeaderByties.Array.SubByte(36, 2).ByteArrayToInteger();
            }
            set
            {
                byte[] temp = value.IntegerToByteArray(2);
                for (int i = 0; i < temp.Length; i++)
                {
                    ((IList<byte>)this.TSKHeaderByties)[36 + i] = temp[i];
                }
            }
        }
        /// <summary>
        /// 機台號碼
        /// <br/>
        /// 開始位置 [38] 占 [2] <see langword="byte"/>
        /// </summary>
        public int MachineNumber
        {
            get
            {
                return this.TSKHeaderByties.Array.SubByte(38, 2).ByteArrayToInteger();
            }
            set
            {
                byte[] temp = value.IntegerToByteArray(2);
                for (int i = 0; i < temp.Length; i++)
                {
                    ((IList<byte>)this.TSKHeaderByties)[38 + i] = temp[i];
                }
            }
        }
        /// <summary>
        /// 座標起始位置 X
        /// <br/>
        /// 開始位置 [40] 占 [4] <see langword="byte"/>
        /// </summary>
        public int IndexSizeX
        {
            get
            {
                return this.TSKHeaderByties.Array.SubByte(40, 4).ByteArrayToInteger();
            }
            set
            {
                byte[] temp = value.IntegerToByteArray(4);
                for (int i = 0; i < temp.Length; i++)
                {
                    ((IList<byte>)this.TSKHeaderByties)[40 + i] = temp[i];
                }
            }
        }
        /// <summary>
        /// 座標起始位置 Y
        /// <br/>
        /// 開始位置 [44] 占 [4] <see langword="byte"/>
        /// </summary>
        public int IndexSizeY
        {
            get
            {
                return this.TSKHeaderByties.Array.SubByte(44, 4).ByteArrayToInteger();
            }
            set
            {
                byte[] temp = value.IntegerToByteArray(4);

                for (int i = 0; i < temp.Length; i++)
                {
                    ((IList<byte>)this.TSKHeaderByties)[44 + i] = temp[i];
                }
            }
        }
        /// <summary>
        /// 當前 Wafer 平邊的方向
        /// <br/>
        /// 開始位置 [48] 占 [2] <see langword="byte"/>
        /// </summary>
        public int OrientationFlatDirection
        {
            get
            {
                return this.TSKHeaderByties.Array.SubByte(48, 2).ByteArrayToInteger();
            }
            set
            {
                byte[] temp = value.IntegerToByteArray(2);
                for (int i = 0; i < temp.Length; i++)
                {
                    ((IList<byte>)this.TSKHeaderByties)[48 + i] = temp[i];
                }
            }
        }
        /// <summary>
        /// 最後編輯的機台
        /// <br/>
        /// 開始位置 [50] 占 [1] <see langword="byte"/>
        /// </summary>
        public int FinalEditingMachine
        {
            get
            {
                return this.TSKHeaderByties.Array.SubByte(50).ByteArrayToInteger();
            }
            set
            {
                ((IList<byte>)this.TSKHeaderByties)[50] = value.IntegerToByteArray()[0];
            }
        }
        #endregion

        #region Map Version
        /// <summary>
        /// <see cref="MapVersion"/>
        /// <br/>
        /// 開始位置 [51] 占 [1] <see langword="byte"/>
        /// </summary>
        public MapVersion MapVersion
        {
            get
            {
                return (MapVersion)this.TSKHeaderByties.Array.SubByte(51).ByteArrayToInteger();
            }
            set
            {
                ((IList<byte>)this.TSKHeaderByties)[51] = ((int)value).IntegerToByteArray()[0];
            }
        }
        #endregion

        #region Map Data Area Row Size
        /// <summary>
        /// Map 資料的 Row 數量
        /// <br/>
        /// 開始位置 [52] 占 [2] <see langword="byte"/>
        /// </summary>
        public int MapDataAreaRowSize
        {
            get
            {
                return this.TSKHeaderByties.Array.SubByte(52, 2).ByteArrayToInteger();
            }
            set
            {
                byte[] temp = value.IntegerToByteArray(2);
                for (int i = 0; i < temp.Length; i++)
                {
                    ((IList<byte>)this.TSKHeaderByties)[52 + i] = temp[i];
                }
            }
        }
        #endregion

        #region Map Data Area Line Size
        /// <summary>
        /// Map 資料的 Column 數量
        /// <br/>
        /// 開始位置 [54] 占 [2] <see langword="byte"/>
        /// </summary>
        public int MapDataAreaLineSize
        {
            get
            {
                return this.TSKHeaderByties.Array.SubByte(54, 2).ByteArrayToInteger();
            }
            set
            {
                byte[] temp = value.IntegerToByteArray(2);
                for (int i = 0; i < temp.Length; i++)
                {
                    ((IList<byte>)this.TSKHeaderByties)[54 + i] = temp[i];
                }
            }
        }
        #endregion

        #region Map Data Form
        /// <summary>
        /// Map 資料的格式
        /// <br/>
        /// 開始位置 [56] 占 [4] <see langword="byte"/>
        /// </summary>
        public MapDataForm MapDataForm
        {
            get
            {
                return (MapDataForm)this.TSKHeaderByties.Array.SubByte(56, 4).ByteArrayToInteger();
            }
            set
            {
                byte[] temp = ((int)value).IntegerToByteArray(4);
                for (int i = 0; i < temp.Length; i++)
                {
                    ((IList<byte>)this.TSKHeaderByties)[56 + i] = temp[i];
                }
            }
        }
        #endregion

        #region Wafer Probing Coordinate System Data
        /// <summary>
        /// Wafer ID: Lot ID + Wafer Index
        /// <br/>
        /// 開始位置 [60] 占 [21] <see langword="byte"/>
        /// </summary>
        public string WaferId
        {
            get
            {
                return this.TSKHeaderByties.Array.SubByte(60, 21).ByteArrayToASCIIString();
            }
            set
            {
                byte[] temp = value.ASCIIStringToByteArray(21);

                for (int i = 0; i < temp.Length; i++)
                {
                    ((IList<byte>)this.TSKHeaderByties)[60 + i] = temp[i];
                }
            }
        }
        /// <summary>
        /// 探測的數量
        /// <br/>
        /// 開始位置 [81] 占 [1] <see langword="byte"/>
        /// </summary>
        public int NumberOfProbing
        {
            get
            {
                return this.TSKHeaderByties.Array.SubByte(81).ByteArrayToInteger();
            }
            set
            {
                ((IList<byte>)this.TSKHeaderByties)[81] = value.IntegerToByteArray()[0];
            }
        }
        /// <summary>
        /// Lot ID
        /// <br/>
        /// 開始位置 [82] 占 [18] <see langword="byte"/>
        /// </summary>
        public string LotId
        {
            get
            {
                return this.TSKHeaderByties.Array.SubByte(82, 18).ByteArrayToASCIIString();
            }
            set
            {
                byte[] temp = value.ASCIIStringToByteArray(18);
                for (int i = 0; i < temp.Length; i++)
                {
                    ((IList<byte>)this.TSKHeaderByties)[82 + i] = temp[i];
                }
            }
        }
        /// <summary>
        /// Wafer 箱號
        /// <br/>
        /// 開始位置 [100] 占 [2] <see langword="byte"/>
        /// </summary>
        public int CassetteNumber
        {
            get
            {
                return this.TSKHeaderByties.Array.SubByte(100, 2).ByteArrayToInteger();
            }
            set
            {
                byte[] temp = value.IntegerToByteArray(2);
                for (int i = 0; i < temp.Length; i++)
                {
                    ((IList<byte>)this.TSKHeaderByties)[100 + i] = temp[i];
                }
            }
        }
        /// <summary>
        /// 槽編號
        /// <br/>
        /// 開始位置 [102] 占 [2] <see langword="byte"/>
        /// </summary>
        public int SlotNumber
        {
            get
            {
                return this.TSKHeaderByties.Array.SubByte(102, 2).ByteArrayToInteger();
            }
            set
            {
                byte[] temp = value.IntegerToByteArray(2);
                for (int i = 0; i < temp.Length; i++)
                {
                    ((IList<byte>)this.TSKHeaderByties)[102 + i] = temp[i];
                }
            }
        }
        /// <summary>
        /// X 座標的增加方向
        /// <br/>
        /// 開始位置 [104] 占 [1] <see langword="byte"/>
        /// </summary>
        public XCoordinatesIncreaseDirection XCoordinatesIncreaseDirection
        {
            get
            {
                return (XCoordinatesIncreaseDirection)this.TSKHeaderByties.Array.SubByte(104).ByteArrayToInteger();
            }
            set
            {
                ((IList<byte>)this.TSKHeaderByties)[104] = ((int)value).IntegerToByteArray()[0];
            }
        }
        /// <summary>
        /// Y 座標的增加方向
        /// <br/>
        /// 開始位置 [105] 占 [1] <see langword="byte"/>
        /// </summary>
        public YCoordinatesIncreaseDirection YCoordinatesIncreaseDirection
        {
            get
            {
                return (YCoordinatesIncreaseDirection)this.TSKHeaderByties.Array.SubByte(105).ByteArrayToInteger();
            }
            set
            {
                ((IList<byte>)this.TSKHeaderByties)[105] = ((int)value).IntegerToByteArray()[0];
            }
        }
        /// <summary>
        /// 參考 Die 設定程序
        /// <br/>
        /// 開始位置 [106] 占 [1] <see langword="byte"/>
        /// </summary>
        public ReferenceDieSettingProcedures ReferenceDieSettingProcedures
        {
            get
            {
                return (ReferenceDieSettingProcedures)this.TSKHeaderByties.Array.SubByte(106).ByteArrayToInteger();
            }
            set
            {
                ((IList<byte>)this.TSKHeaderByties)[106] = ((int)value).IntegerToByteArray()[0];
            }
        }
        /// <summary>
        /// Wafer Probing Coordinate System Data 保留字
        /// <br/>
        /// 開始位置 [107] 占 [1] <see langword="byte"/>
        /// <br/>
        /// 覆寫的程式碼：
        ///
        /// <code>
        /// get
        /// {
        ///     return this.TSKHeaderByties.Array.SubByte(107).ByteArrayToInteger();
        /// }
        /// </code>
        /// </summary>
        public virtual int WaferProbingCoordinateSystemDataReserved { get; }
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
        #endregion

        #region Informatin Per Die
        /// <summary>
        /// 第一個 Die 的座標 X
        /// <br/>
        /// 開始位置 [140] 占 [4] <see langword="byte"/>
        /// </summary>
        public int FirstDieCoordinationX
        {
            get
            {
                return this.TSKHeaderByties.Array.SubByte(140, 4).ByteArrayToInteger();
            }
            set
            {
                byte[] temp = value.IntegerToByteArray(4);
                for (int i = 0; i < temp.Length; i++)
                {
                    ((IList<byte>)this.TSKHeaderByties)[140 + i] = temp[i];
                }
            }
        }
        /// <summary>
        /// 第一個 Die 的座標 Y
        /// <br/>
        /// 開始位置 [144] 占 [4] <see langword="byte"/>
        /// </summary>
        public int FirstDieCoordinationY
        {
            get
            {
                return this.TSKHeaderByties.Array.SubByte(144, 4).ByteArrayToInteger();
            }
            set
            {
                byte[] temp = value.IntegerToByteArray(4);
                for (int i = 0; i < temp.Length; i++)
                {
                    ((IList<byte>)this.TSKHeaderByties)[144 + i] = temp[i];
                }
            }
        }
        #endregion

        #region Wafer Testing Start Time Data

        /// <summary>
        /// Wafer 開始測試的時間 
        /// <br/>
        /// 開始位置 [148] 占 [10] <see langword="byte"/>
        /// </summary>
        public DateTime WaferTestingStartDateTime
        {
            get
            {
                return DateTime.ParseExact(this.TSKHeaderByties.Array.SubByte(148, 2).ByteArrayToASCIIString()
                                             + this.TSKHeaderByties.Array.SubByte(150, 2).ByteArrayToASCIIString()
                                             + this.TSKHeaderByties.Array.SubByte(152, 2).ByteArrayToASCIIString()
                                             + this.TSKHeaderByties.Array.SubByte(154, 2).ByteArrayToASCIIString()
                                             + this.TSKHeaderByties.Array.SubByte(156, 2).ByteArrayToASCIIString(),
                                             "yyMMddHHmm", CultureInfo.CurrentCulture);
            }
            set
            {
                string temp = value.ToString("yyMMddHHmm");

                for (int i = 0; i < temp.Length; i++)
                {
                    ((IList<byte>)this.TSKHeaderByties)[148 + i] = (byte)temp[i];
                }
            }
        }
        /// <summary>
        /// Wafer 開始測試的時間保留區
        /// <br/>
        /// 開始位置 [158] 占 [2] <see langword="byte"/>
        /// <br/>
        /// 覆寫的程式碼：
        /// <br/>
        /// <code>
        /// get
        /// {
        ///     return this.TSKHeaderByties.Array.SubByte(158, 2).ByteArrayToInteger();
        /// }
        /// </code>
        /// </summary>
        public virtual int WaferTestingStartDateTimeReserved { get; }
        #endregion

        #region Wafer Testing End Time Data
        /// <summary>
        /// Wafer 結束測試的時間
        /// <br/>
        /// 開始位置 [160] 占 [12] <see langword="byte"/>
        /// </summary>
        public DateTime WaferTestingEndDateTime
        {
            get
            {
                return DateTime.ParseExact(this.TSKHeaderByties.Array.SubByte(160, 2).ByteArrayToASCIIString()
                                             + this.TSKHeaderByties.Array.SubByte(162, 2).ByteArrayToASCIIString()
                                             + this.TSKHeaderByties.Array.SubByte(164, 2).ByteArrayToASCIIString()
                                             + this.TSKHeaderByties.Array.SubByte(166, 2).ByteArrayToASCIIString()
                                             + this.TSKHeaderByties.Array.SubByte(168, 2).ByteArrayToASCIIString(),
                                            "yyMMddHHmm", null);
            }
            set
            {
                string temp = value.ToString("yyMMddHHmm");

                for (int i = 0; i < temp.Length; i++)
                {
                    ((IList<byte>)this.TSKHeaderByties)[160 + i] = (byte)temp[i];
                }
            }
        }
        /// <summary>
        /// Wafer 結束測試的時間保留區
        /// <br/>
        /// 開始位置 [170] 占 [2] <see langword="byte"/>
        /// <br/>
        /// 覆寫的程式碼：
        /// <br/>
        /// <code>
        /// get
        /// {
        ///     return this.TSKHeaderByties.Array.SubByte(170, 2).ByteArrayToInteger();
        /// }
        /// </code>
        /// </summary>
        public virtual int WaferTestingEndDateTimeReserved { get; }
        #endregion

        #region Wafer Loading Time Data
        /// <summary>
        /// Wafer 讀進機台的時間
        /// <br/>
        /// 開始位置 [172] 占 [12] <see langword="byte"/>
        /// </summary>
        public DateTime WaferLoadingDateTime
        {
            get
            {
                return DateTime.ParseExact(this.TSKHeaderByties.Array.SubByte(172, 2).ByteArrayToASCIIString()
                                              + this.TSKHeaderByties.Array.SubByte(174, 2).ByteArrayToASCIIString()
                                              + this.TSKHeaderByties.Array.SubByte(176, 2).ByteArrayToASCIIString()
                                              + this.TSKHeaderByties.Array.SubByte(178, 2).ByteArrayToASCIIString()
                                              + this.TSKHeaderByties.Array.SubByte(180, 2).ByteArrayToASCIIString(),
                                             "yyMMddHHmm", CultureInfo.CurrentCulture);
            }
            set
            {
                string temp = value.ToString("yyMMddHHmm");

                for (int i = 0; i < temp.Length; i++)
                {
                    ((IList<byte>)this.TSKHeaderByties)[172 + i] = (byte)temp[i];
                }
            }
        }
        /// <summary>
        /// Wafer 讀進機台的的時間保留區
        /// <br/>
        /// 開始位置 [182] 占 [2] <see langword="byte"/>
        /// <br/>
        /// 覆寫的程式碼：
        /// <br/>
        /// get
        /// {
        ///     return this.TSKHeaderByties.Array.SubByte(182, 2).ByteArrayToInteger();
        /// }
        /// </summary>
        public virtual int WaferLoadingDateTimeReserved { get; }
        #endregion

        #region Wafer Unloading Time Data
        /// <summary>
        /// Wafer 從機台退出的時間
        /// <br/>
        /// 開始位置 [184] 占 [12] <see langword="byte"/>
        /// </summary>
        public DateTime WaferUnloadingDateTime
        {
            get
            {
                return DateTime.ParseExact(this.TSKHeaderByties.Array.SubByte(184, 2).ByteArrayToASCIIString()
                                            + this.TSKHeaderByties.Array.SubByte(186, 2).ByteArrayToASCIIString()
                                            + this.TSKHeaderByties.Array.SubByte(188, 2).ByteArrayToASCIIString()
                                            + this.TSKHeaderByties.Array.SubByte(190, 2).ByteArrayToASCIIString()
                                            + this.TSKHeaderByties.Array.SubByte(192, 2).ByteArrayToASCIIString(),
                                           "yyMMddHHmm", CultureInfo.CurrentCulture);
            }
            set
            {
                string temp = value.ToString("yyMMddHHmmss");
                for (int i = 0; i < temp.Length; i++)
                {
                    ((IList<byte>)this.TSKHeaderByties)[184 + i] = (byte)temp[i];
                }
            }
        }
        /// <summary>
        /// Wafer 退出機台的的時間保留區
        /// <br/>
        /// 開始位置 [194] 占 [2] <see langword="byte"/>
        /// <br/>
        /// 覆寫的程式碼：
        /// <br/>
        /// <code>
        /// get
        /// {
        ///     return this.TSKHeaderByties.Array.SubByte(194, 2).ByteArrayToInteger();
        /// }
        /// </code>
        /// </summary>
        public virtual int WaferUnloadingDateTimeReserved { get; }
        #endregion

        #region Machine Number Special Characters        
        /// <summary>
        /// 機台號碼特殊字元
        /// <br/>
        /// 開始位置 [196] 占 [12] <see langword="byte"/>
        /// </summary>
        public string MachineNumberSpecialCharacter
        {
            get
            {
                return this.TSKHeaderByties.Array.SubByte(196, 12).ByteArrayToASCIIString();
            }
            set
            {
                byte[] temp = value.ASCIIStringToByteArray(12);
                for (int i = 0; i < temp.Length; i++)
                {
                    ((IList<byte>)this.TSKHeaderByties)[196 + i] = temp[i];
                }
            }
        }
        #endregion

        #region Testing Result
        /// <summary>
        /// 測試結束後的狀態
        /// <br/>
        /// 開始位置 [208] 占 [1] <see langword="byte"/>
        /// </summary>
        public TestingEndInformation TestingEndInformation
        {
            get
            {
                return (TestingEndInformation)this.TSKHeaderByties.Array.SubByte(208).ByteArrayToInteger();
            }
            set
            {
                ((IList<byte>)this.TSKHeaderByties)[208] = ((int)value).IntegerToByteArray()[0];
            }
        }
        /// <summary>
        /// 測試結果區塊保留字
        /// <br/>
        /// 開始位置 [209] 占 [1] <see langword="byte"/>
        /// <br/>
        /// 覆寫的程式碼：
        /// <br/>
        /// <code>
        /// get
        /// {
        ///     return this.TSKHeaderByties.Array.SubByte(209).ByteArrayToInteger();
        /// }
        /// </code>
        /// </summary>
        public virtual int TestingResultReserved { get; }

        /// <summary>
        /// 所有測試的 Die 數量
        /// <br/>
        /// 開始位置 [210] 占 [2] <see langword="byte"/>
        /// </summary>
        public int TotalTestedDie
        {
            get
            {
                return this.TSKHeaderByties.Array.SubByte(210, 2).ByteArrayToInteger();
            }
            set
            {
                byte[] temp = value.IntegerToByteArray(2);
                for (int i = 0; i < temp.Length; i++)
                {
                    ((IList<byte>)this.TSKHeaderByties)[210 + i] = temp[i];
                }
            }
        }
        /// <summary>
        /// 所有 Pass 的 Die 數量
        /// <br/>
        /// 開始位置 [212] 占 [2] <see langword="byte"/>
        /// </summary>
        public int TotalPassDie
        {
            get
            {
                return this.TSKHeaderByties.Array.SubByte(212, 2).ByteArrayToInteger();
            }
            set
            {
                byte[] temp = value.IntegerToByteArray(2);
                for (int i = 0; i < temp.Length; i++)
                {
                    ((IList<byte>)this.TSKHeaderByties)[212 + i] = temp[i];
                }
            }
        }
        /// <summary>
        /// 所有 Fail 的 Die 數量
        /// <br/>
        /// 開始位置 [214] 占 [2] <see langword="byte"/>
        /// </summary>
        public int TotalFailDie
        {
            get
            {
                return this.TSKHeaderByties.Array.SubByte(214, 2).ByteArrayToInteger();
            }
            set
            {
                byte[] temp = value.IntegerToByteArray(2);
                for (int i = 0; i < temp.Length; i++)
                {
                    ((IList<byte>)this.TSKHeaderByties)[214 + i] = temp[i];
                }
            }
        }
        #endregion

        #region Test Die Information Address
        /// <summary>
        /// 所有測試的 Die 在檔案內開始的自結位置，一個 <see cref="DieBase"/> 6 <see cref="Generic"/>
        /// <br/>
        /// 開始位置 [216] 占 [4] <see langword="byte"/>
        /// </summary>
        public int TestDieInformationAddress
        {
            get
            {
                return this.TSKHeaderByties.Array.SubByte(216, 4).ByteArrayToInteger();
            }
            set
            {
                byte[] temp = value.IntegerToByteArray(4);
                for (int i = 0; i < temp.Length; i++)
                {
                    ((IList<byte>)this.TSKHeaderByties)[216 + i] = temp[i];
                }
            }
        }
        #endregion

        #region Number Of Line Category Data
        /// <summary>
        /// 線類別資料的數量
        /// <br/>
        /// 開始位置 [220] 占 [4] <see langword="byte"/>
        /// </summary>
        public int NumberOfLineCategoryData
        {
            get
            {
                return this.TSKHeaderByties.Array.SubByte(220, 4).ByteArrayToInteger();
            }
            set
            {
                byte[] temp = value.IntegerToByteArray(4);
                for (int i = 0; i < temp.Length; i++)
                {
                    ((IList<byte>)this.TSKHeaderByties)[220 + i] = temp[i];
                }
            }
        }
        #endregion

        #region Line Category Address
        /// <summary>
        /// 線類別位置
        /// <br/>
        /// 開始位置 [224] 占 [4] <see langword="byte"/>
        /// </summary>
        public int LineCategoryAddress
        {
            get
            {
                return this.TSKHeaderByties.Array.SubByte(224, 4).ByteArrayToInteger();
            }
            set
            {
                byte[] temp = value.IntegerToByteArray(4);
                for (int i = 0; i < temp.Length; i++)
                {
                    ((IList<byte>)this.TSKHeaderByties)[224 + i] = temp[i];
                }
            }
        }
        #endregion

        #region Extended Map Information
        /// <summary>
        /// <see cref="TSK"/> 檔案的結構
        /// <br/>
        /// 開始位置 [228] 占 [2] <see cref="Generic"/>
        /// </summary>
        public int MapFileConfiguration
        {
            get
            {
                return this.TSKHeaderByties.Array.SubByte(228, 2).ByteArrayToInteger();
            }
            set
            {
                byte[] temp = value.IntegerToByteArray(2);
                for (int i = 0; i < temp.Length; i++)
                {
                    ((IList<byte>)this.TSKHeaderByties)[228 + i] = temp[i];
                }
            }
        }
        /// <summary>
        /// <see cref="TSK"/> 檔案內容結構表示
        /// </summary>
        public char[] FileStructure
        {
            get
            {
                return string.Concat(this.TSKHeaderByties.Array.SubByte(228, 2).Select(b => Convert.ToString(b, 2).PadLeft(8, '0')))
                            .Reverse()
                            .ToArray();
            }
        }
        /// <summary>
        /// 最大多站點
        /// <br/>
        /// 開始位置 [230] 占 [2] <see langword="byte"/>
        /// </summary>
        public int MaxMultiSite
        {
            get
            {
                return this.TSKHeaderByties.Array.SubByte(230, 2).ByteArrayToInteger();
            }
            set
            {
                byte[] temp = value.IntegerToByteArray(2);
                for (int i = 0; i < temp.Length; i++)
                {
                    ((IList<byte>)this.TSKHeaderByties)[230 + i] = temp[i];
                }
            }
        }
        /// <summary>
        ///最大類別
        /// <br/>
        /// 開始位置 [232] 占 [2] <see langword="byte"/>
        /// </summary>
        public int MaxCategories
        {
            get
            {
                return this.TSKHeaderByties.Array.SubByte(232, 2).ByteArrayToInteger();
            }
            set
            {
                byte[] temp = value.IntegerToByteArray(2);
                for (int i = 0; i < temp.Length; i++)
                {
                    ((IList<byte>)this.TSKHeaderByties)[232 + i] = temp[i];
                }
            }
        }
        #endregion

        /// <summary>
        /// <see cref="HeaderBase"/> 的資料來源
        /// </summary>
        public ArraySegment<byte> TSKHeaderByties { get; set; }

        /// <summary>
        /// 實例化 <see cref="HeaderBase"/> 物件，並設置原始數據陣列的映射區塊與<see cref="IgnoreList"/>
        /// <br/>
        /// 範圍預設為 [0] ~ [235]，長度為 [236]
        /// <br/>
        /// 傳入的參數需使用以下方式：
        /// <code>
        ///     new ArraySegment&lt;byte&gt;(this.TSKBytes, 0, 236)
        /// </code>
        /// </summary>
        /// <param name="headerBlock">檔案內容的 Header 區塊 <see cref="ArraySegment{T}"/>結構體</param>
        public HeaderBase(ArraySegment<byte> headerBlock)
        {
            this.TSKHeaderByties = headerBlock;
            this.IgnoreList = new string[] { "M", "S", "0" };
        }
    }
}
