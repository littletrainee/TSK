using System;

namespace TSK
{
    /// <summary>
    /// <see cref="ExtendedHeaderBase"/> 物件
    /// </summary>
    public abstract class ExtendedHeaderBase
    {
        /// <summary>
        /// 資料來源
        /// </summary>
        public ArraySegment<byte> CurrentBytes { get; set; }
        #region 暫時未用到
        /// <summary>
        /// Wafer Test Start Time 
        /// <para>若需使用需使用以下程式碼覆寫</para>
        /// <para>get</para>
        /// <para>{</para>
        /// <para>    return DateTime.ParseExact(this.CurrentBytes.Array.SubByte(this.CurrentBytes.Offset + 20, 2).ByteArrayToASCIIString()</para>
        /// <para>                             + this.CurrentBytes.Array.SubByte(this.CurrentBytes.Offset + 22, 2).ByteArrayToASCIIString()</para>
        /// <para>                             + this.CurrentBytes.Array.SubByte(this.CurrentBytes.Offset + 24, 2).ByteArrayToASCIIString()</para>
        /// <para>                             + this.CurrentBytes.Array.SubByte(this.CurrentBytes.Offset + 26, 2).ByteArrayToASCIIString()</para>
        /// <para>                             + this.CurrentBytes.Array.SubByte(this.CurrentBytes.Offset + 28, 2).ByteArrayToASCIIString(),</para>
        /// <para>                               "yyMMddHHmm", null);</para>
        /// <para>}</para>
        /// <para>set</para>
        /// <para>{</para>
        /// <para>    string temp = value.ToString("yyMMddHHmm");</para>
        /// <para>    for (int i = 0; i &lt; temp.Length; i++)</para>
        /// <para>    {</para>
        /// <para>        this.CurrentBytes.Array[this.CurrentBytes.Offset + 20 + i] = (byte)temp[i];</para>
        /// <para>    }</para>
        /// <para>}</para>
        /// </summary>
        public virtual DateTime WaferTestStartTime { get; set; }
        /// <summary>
        /// Wafer Test End Time 
        /// <para>若需使用需使用以下程式碼覆寫</para>
        /// <para>get</para>
        /// <para>{</para>
        /// <para>    return DateTime.ParseExact(this.CurrentBytes.Array.SubByte(this.CurrentBytes.Offset + 32, 2).ByteArrayToASCIIString()</para>
        /// <para>                             + this.CurrentBytes.Array.SubByte(this.CurrentBytes.Offset + 34, 2).ByteArrayToASCIIString()</para>
        /// <para>                             + this.CurrentBytes.Array.SubByte(this.CurrentBytes.Offset + 36, 2).ByteArrayToASCIIString()</para>
        /// <para>                             + this.CurrentBytes.Array.SubByte(this.CurrentBytes.Offset + 38, 2).ByteArrayToASCIIString()</para>
        /// <para>                             + this.CurrentBytes.Array.SubByte(this.CurrentBytes.Offset + 40, 2).ByteArrayToASCIIString(),</para>
        /// <para>                               "yyMMddHHmm", null);</para>
        /// <para>}</para>
        /// <para>set</para>
        /// <para>{</para>
        /// <para>    string temp = value.ToString("yyMMddHHmm");</para>
        /// <para>    for (int i = 0; i &lt; temp.Length; i++)</para>
        /// <para>    {</para>
        /// <para>        this.CurrentBytes.Array[this.CurrentBytes.Offset + 32 + i] = (byte)temp[i];</para>
        /// <para>    }</para>
        /// <para>}</para>
        /// </summary>
        public virtual DateTime WaferTestEndTime { get; set; }
        /// <summary>
        /// Continuous Fail 
        /// <para>若需使用需使用以下程式碼覆寫</para>
        /// <para>get</para>
        /// <para>{</para>
        /// <para>    return this.CurrentBytes.Array.SubByte(this.CurrentBytes.Offset + 44, 2).ByteArrayToInteger();</para>
        /// <para>}</para>
        /// <para>set</para>
        /// <para>{</para>
        /// <para>    byte[] temp = value.IntegerToByteArray(2);</para>
        /// <para>    for (int i = 0; i&lt;temp.Length; i++)</para>
        /// <para>    {</para>
        /// <para>        this.CurrentBytes.Array[this.CurrentBytes.Offset + 44 + i] = temp [i];</para> 
        /// <para>    }</para>
        /// <para>}</para>
        /// </summary>
        public virtual int ContinuousFail { get; set; }
        #endregion
        /// <summary>
        /// Wafer Test Result Tested <see cref="DieBase"/>
        /// <para>
        /// 開始位置 [52] 占 [4] <see cref="Generic"/>
        /// </para>
        /// </summary>
        public int WaferTestResultTestedDie
        {
            get
            {
                return this.CurrentBytes.Array.SubByte(this.CurrentBytes.Offset + 52, 4).ByteArrayToInteger();
            }
            set
            {
                byte[] temp = value.IntegerToByteArray(4);
                for (int i = 0; i < temp.Length; i++)
                {
                    this.CurrentBytes.Array[this.CurrentBytes.Offset + 52 + i] = temp[i];
                }
            }
        }
        /// <summary>
        /// Wafer Test Result Pass <see cref="DieBase"/>
        /// <para>
        /// 開始位置 [56] 占 [4] <see cref="Generic"/>
        /// </para>
        /// </summary>
        public int WaferTestResultPassDie
        {
            get
            {
                return this.CurrentBytes.Array.SubByte(this.CurrentBytes.Offset + 56, 4).ByteArrayToInteger();
            }
            set
            {
                byte[] temp = value.IntegerToByteArray(4);
                for (int i = 0; i < temp.Length; i++)
                {
                    this.CurrentBytes.Array[this.CurrentBytes.Offset + 56 + i] = temp[i];
                }
            }
        }
        /// <summary>
        /// Wafer Test Result Fail <see cref="DieBase"/>
        /// <para>
        /// 開始位置 [60] 占 [4] <see cref="Generic"/>
        /// </para>
        /// </summary>
        public int WaferTestResultFailDie
        {
            get
            {
                return this.CurrentBytes.Array.SubByte(this.CurrentBytes.Offset + 60, 4).ByteArrayToInteger();
            }
            set
            {
                byte[] temp = value.IntegerToByteArray(4);
                for (int i = 0; i < temp.Length; i++)
                {
                    this.CurrentBytes.Array[this.CurrentBytes.Offset + 60 + i] = temp[i];
                }
            }
        }
        #region 暫時未用到
        /// <summary>
        /// Wafer Test Result For Special User Fail 1 Die
        /// <para>若需使用需使用以下程式碼覆寫</para>
        /// <para>get</para>
        /// <para>{</para>
        /// <para>    return this.CurrentBytes.Array.SubByte(this.CurrentBytes.Offset + 64, 4).ByteArrayToInteger();</para>
        /// <para>}</para>
        /// <para>set</para>
        /// <para>{</para>
        /// <para>    byte[] temp = value.IntegerToByteArray(4);</para>
        /// <para>    for (int i = 0; i &lt; temp.Length; i++)</para>
        /// <para>    {</para>
        /// <para>        this.CurrentBytes.Array[this.CurrentBytes.Offset + 64 + i] = temp[i];</para>
        /// <para>    }</para>
        /// <para>}</para>
        /// </summary>
        public virtual int WaferTestResultForSpecialUserFail1Die { get; set; }
        /// <summary>
        /// Wafer Test Result For Special User Fail 2 Die
        /// <para>若需使用需使用以下程式碼覆寫</para>
        /// <para>get</para>
        /// <para>{</para>
        /// <para>    return this.CurrentBytes.Array.SubByte(this.CurrentBytes.Offset + 68, 4).ByteArrayToInteger();</para>
        /// <para>}</para>
        /// <para>set</para>
        /// <para>{</para>
        /// <para>    byte[] temp = value.IntegerToByteArray(4);</para>
        /// <para>    for (int i = 0; i &lt; temp.Length; i++)</para>
        /// <para>    {</para>
        /// <para>        this.CurrentBytes.Array[this.CurrentBytes.Offset + 68 + i] = temp[i];</para>
        /// <para>    }</para>
        /// <para>}</para>
        /// </summary>
        public virtual int WaferTestResultForSpecialUserFail2Die { get; set; }
        /// <summary>
        /// Test Result Of Normal Or Mutiple Pass Probing Before Direct Total Die
        /// <para>若需使用需使用以下程式碼覆寫</para>
        /// <para>get</para>
        /// <para>{</para>
        /// <para>    return this.CurrentBytes.Array.SubByte(this.CurrentBytes.Offset + 72, 4).ByteArrayToInteger();</para>
        /// <para>}</para>
        /// <para>set</para>
        /// <para>{</para>
        /// <para>    byte[] temp = value.IntegerToByteArray(4);</para>
        /// <para>    for (int i = 0; i &lt; temp.Length; i++)</para>
        /// <para>    {</para>
        /// <para>        this.CurrentBytes.Array[this.CurrentBytes.Offset + 72 + i] = temp[i];</para>
        /// <para>    }</para>
        /// <para>}</para>
        /// </summary>
        public virtual int TestResultOfNormalOrMutiPassProbingBeforeDirectTotalDie { get; set; }
        /// <summary>
        /// Test Result Of Normal Or Mutiple Pass Probing Before Direct Pass Die
        /// <para>若需使用需使用以下程式碼覆寫</para>
        /// <para>get</para>
        /// <para>{</para>
        /// <para>    return this.CurrentBytes.Array.SubByte(this.CurrentBytes.Offset + 76, 4).ByteArrayToInteger();</para>
        /// <para>}</para>
        /// <para>set</para>
        /// <para>{</para>
        /// <para>    byte[] temp = value.IntegerToByteArray(4);</para>
        /// <para>    for (int i = 0; i &lt; temp.Length; i++)</para>
        /// <para>    {</para>
        /// <para>        this.CurrentBytes.Array[this.CurrentBytes.Offset + 76 + i] = temp[i];</para>
        /// <para>    }</para>
        /// <para>}</para>
        /// </summary>
        public virtual int TestResultOfNormalOrMutiPassProbingBeforeDirectPassDie { get; set; }
        /// <summary>
        /// Test Result Of Normal Or Mutiple Pass Probing Before Direct Fail Die
        /// <para>若需使用需使用以下程式碼覆寫</para>
        /// <para>get</para>
        /// <para>{</para>
        /// <para>    return this.CurrentBytes.Array.SubByte(this.CurrentBytes.Offset + 80, 4).ByteArrayToInteger();</para>
        /// <para>}</para>
        /// <para>set</para>
        /// <para>{</para>
        /// <para>    byte[] temp = value.IntegerToByteArray(4);</para>
        /// <para>    for (int i = 0; i &lt; temp.Length; i++)</para>
        /// <para>    {</para>
        /// <para>        this.CurrentBytes.Array[this.CurrentBytes.Offset + 80 + i] = temp[i];</para>
        /// <para>    }</para>
        /// <para>}</para>
        /// </summary>
        public virtual int TestResultOfNormalOrMutiPassProbingBeforeDirectFailDie { get; set; }
        /// <summary>
        ///  Test Result Of Normal Or Mutiple Pass Probing Total Die
        /// <para>若需使用需使用以下程式碼覆寫</para>
        /// <para>get</para>
        /// <para>{</para>
        /// <para>    return this.CurrentBytes.Array.SubByte(this.CurrentBytes.Offset + 84, 4).ByteArrayToInteger();</para>
        /// <para>}</para>
        /// <para>set</para>
        /// <para>{</para>
        /// <para>    byte[] temp = value.IntegerToByteArray(4);</para>
        /// <para>    for (int i = 0; i &lt; temp.Length; i++)</para>
        /// <para>    {</para>
        /// <para>        this.CurrentBytes.Array[this.CurrentBytes.Offset + 84 + i] = temp[i];</para>
        /// <para>    }</para>
        /// <para>}</para>
        /// </summary>
        public virtual int TestResultOfNormalOrMutiPassProbingTotalDie { get; set; }
        /// <summary>
        /// Test Result Of Normal Or Mutiple Pass Probing Pass Die
        /// <para>若需使用需使用以下程式碼覆寫</para>
        /// <para>get</para>
        /// <para>{</para>
        /// <para>    return this.CurrentBytes.Array.SubByte(this.CurrentBytes.Offset + 88, 4).ByteArrayToInteger();</para>
        /// <para>}</para>
        /// <para>set</para>
        /// <para>{</para>
        /// <para>    byte[] temp = value.IntegerToByteArray(4);</para>
        /// <para>    for (int i = 0; i &lt; temp.Length; i++)</para>
        /// <para>    {</para>
        /// <para>        this.CurrentBytes.Array[this.CurrentBytes.Offset + 88 + i] = temp[i];</para>
        /// <para>    }</para>
        /// <para>}</para>
        /// </summary>
        public virtual int TestResultOfNormalOrMutiPassProbingPassDie { get; set; }
        /// <summary>
        /// Test Result Of Normal Or Mutiple Pass Probing Fail Die
        /// <para>若需使用需使用以下程式碼覆寫</para>
        /// <para>get</para>
        /// <para>{</para>
        /// <para>    return this.CurrentBytes.Array.SubByte(this.CurrentBytes.Offset + 92, 4).ByteArrayToInteger();</para>
        /// <para>}</para>
        /// <para>set</para>
        /// <para>{</para>
        /// <para>    byte[] temp = value.IntegerToByteArray(4);</para>
        /// <para>    for (int i = 0; i &lt; temp.Length; i++)</para>
        /// <para>    {</para>
        /// <para>        this.CurrentBytes.Array[this.CurrentBytes.Offset + 92 + i] = temp[i];</para>
        /// <para>    }</para>
        /// <para>}</para>
        /// </summary>
        public virtual int TestResultOfNormalOrMutiPassProbingFailDie { get; set; }
        #endregion

        /// <summary>
        /// 實例化 <see cref="ExtendedHeaderBase"/> 物件
        /// </summary>
        /// <param name="extendedHeaderBlock">Extended Header 區塊</param>
        public ExtendedHeaderBase(ArraySegment<byte> extendedHeaderBlock)
        {
            this.CurrentBytes = extendedHeaderBlock;
        }
    }
}
