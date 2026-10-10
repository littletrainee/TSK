using System;

namespace TSK
{
    /// <summary>
    /// <see cref="ExtendedDieBase"/> 物件
    /// </summary>
    public class ExtendedDieBase
    {
        /// <summary>
        /// 擴展的 <see cref="DieBase"/> 資料
        /// </summary>
        public ArraySegment<byte> CurrentBytes { get; set; }
        #region Map Version:2/3 FirstWord
        #region First Word        
        /// <summary>
        /// Extended Test Execution Site
        /// 0 to 255 (add 1 for actual test execution site)
        /// <br/>
        /// 若需使用需使用以下程式碼覆寫
        /// <br/>
        /// <code>
        /// get
        /// {
        ///     return this.CurrentBytes.Array[this.CurrentBytes.Offset];
        /// }
        /// set
        /// {
        ///     this.CurrentBytes.Array[this.CurrentBytes.Offset] = (byte)value;
        /// }
        /// </code>
        /// </summary>
        public virtual int MapVersion2Or3ExtendedTestExecutionSite { get; set; }
        /// <summary>
        /// Extended Binary Category
        /// 0 to 127 (add 1 for actual test execution site)
        /// <br/>
        /// 若需使用需使用以下程式碼覆寫
        /// <br/>
        /// <code>
        /// get
        /// {
        ///     return this.CurrentBytes.Array[this.CurrentBytes.Offset + 1];
        /// }
        /// set
        /// {
        ///     this.CurrentBytes.Array[this.CurrentBytes.Offset + 1] = (byte)value;
        /// }
        /// </code>
        /// </summary>
        public virtual int MapVersion2Or3ExtendedBinaryCategory { get; set; }
        #endregion
        #region Second Word
        // Reserved
        #endregion
        #endregion
        #region Map Version:4
        //! 字節僅取 4 個 Byte 不需要到 8 個Byte
        #region First Word        
        /// <summary>
        /// Extended Test Execution Site
        /// 0 to 256 (add 1 for actual test execution site)
        /// </summary>
        public int MapVersion4ExtendedTestExecutionSite
        {
            get
            {
                return this.CurrentBytes.Array[this.CurrentBytes.Offset + 1];
            }
            set
            {
                this.CurrentBytes.Array[this.CurrentBytes.Offset + 1] = (byte)value;
            }
        }
        #endregion
        #region SecondWord        
        /// <summary>
        /// Extended Binary Category
        /// 0 to 1023 (add 1 for actual category information)
        /// </summary>
        public int MapVersion4ExtendedBinaryCategory
        {
            get
            {
                return ((this.CurrentBytes.Array[this.CurrentBytes.Offset + 2] & 0b00000011) << 8)
                       | (this.CurrentBytes.Array[this.CurrentBytes.Offset + 3]);
            }
            set
            {
                this.CurrentBytes.Array[this.CurrentBytes.Offset + 2] = (byte)((this.CurrentBytes.Array[this.CurrentBytes.Offset + 2] & 0b11111100)
                                                                              | ((value & 0b00000011_00000000) >> 8));
                this.CurrentBytes.Array[this.CurrentBytes.Offset + 3] = (byte)(this.CurrentBytes.Array[this.CurrentBytes.Offset + 3] | (value & 0b11111111));
            }
        }
        #endregion
        #endregion

        /// <summary>
        /// 實例化 <see cref="ExtendedDieBase"/> 物件並持有擴展資料
        /// </summary>
        /// <param name="source">資料來源</param>
        public ExtendedDieBase(ArraySegment<byte> source)
        {
            this.CurrentBytes = source;
        }
    }
}
