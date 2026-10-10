using System;
using System.Collections.Generic;
using System.IO;

namespace TSK
{
    /// <summary>
    /// <see cref="TSKBase"/> 物件，用以持有 TSK檔的各項資訊
    /// </summary>
    public abstract class TSKBase
    {
        /// <summary>
        /// <see cref="TSKBase"/> 來源的資料
        /// </summary>
        public byte[] TskBytes { get; set; }
        /// <summary>
        /// <see cref="TSKBase"/> 的 <see cref="Header"/> 資料持有物件
        /// </summary>
        public HeaderBase Header { get; set; }
        /// <summary>
        /// <see cref="DieBase"/> 清單
        /// </summary>
        public List<DieBase> Dies { get; set; }
        /// <summary>
        /// Line Category Array
        /// </summary>
        public ArraySegment<byte> LineCategory { get; set; }
        /// <summary>
        /// Extended Header Information
        /// </summary>
        public ExtendedHeaderBase ExtendedHeader { get; set; }
        /// <summary>
        /// Extended Line Category Information
        /// </summary>
        public ArraySegment<byte> ExtendedLineCategory { get; set; }
        /// <summary>
        /// Other Data
        /// </summary>
        public ArraySegment<byte> OtherData { get; set; }
        /// <summary>
        /// Pass Bin 清單
        /// </summary>
        public List<string> PassBins { get; set; }

        /// <summary>
        /// 實例化 <see cref="TSKBase"/> 物件，並以 <see cref="File.ReadAllBytes(string)"/> 讀取
        /// <paramref name="tskFileFullName"/> 檔案的內容。
        /// <para>繼承後必須實作以下程式碼才可正確解析</para>
        /// <code>
        /// int currentIndex = 0;
        /// this.Header = new Header(new ArraySegment&lt;byte&gt;(this.TskBytes, 0, 236));
        /// currentIndex += this.Header.TSKHeaderByties.Count;
        ///
        /// this.ReadTskDie(ref currentIndex);
        ///
        /// char[] fileStruct = this.Header.FileStructure;
        ///
        /// #region Line Category Information
        /// if (fileStruct[2].Equals('1'))
        /// {
        ///     this.LineCategory = new ArraySegment&lt;byte&gt;(this.TskBytes, currentIndex, 2 * this.Header.MapDataAreaRowSize * this.Header.MapDataAreaLineSize);
        ///     currentIndex += this.LineCategory.Count;
        /// }
        /// #endregion
        ///
        /// #region Extended Header Information
        /// if (fileStruct[3].Equals('1'))
        /// {
        ///     this.ExtendedHeader = new ExtendedHeader(new ArraySegment&lt;byte&gt;(this.TskBytes, currentIndex, 172));
        ///     currentIndex += this.ExtendedHeader.CurrentBytes.Count;
        /// }
        /// #endregion
        /// 
        /// #region Test Result Information Per Extended Die
        /// if (fileStruct[4].Equals('1'))
        /// {
        ///     this.ReadExtendedDie(ref currentIndex);
        /// }
        /// #endregion
        /// 
        /// #region Extended Line Category Information
        /// if (fileStruct[5].Equals('1'))
        /// {
        ///     this.ExtendedLineCategory = new ArraySegment&lt;byte&gt;(this.TskBytes, currentIndex, 2 * this.Header.MapDataAreaRowSize * this.Header.MapDataAreaLineSize);
        ///     currentIndex += this.ExtendedLineCategory.Count;
        /// }
        /// #endregion
        /// 
        /// #region Other Data
        /// if (currentIndex != this.TskBytes.Length)
        /// {
        ///     int length = this.TskBytes.Length - currentIndex;
        ///     this.OtherData = new ArraySegment&lt;byte&gt;(this.TskBytes, currentIndex, length);
        /// }
        /// #endregion
        /// </code>
        /// </summary>
        /// <param name="tskFileFullName"><see cref="TSKBase"/> 檔的完整路徑與名稱</param>
        public TSKBase(string tskFileFullName)
        {
            this.TskBytes = File.ReadAllBytes(tskFileFullName);
            this.PassBins = new List<string>();
        }

        /// <summary>
        /// 讀取 <see cref="TSKBase"/> 檔的 <see cref="DieBase"/> 資訊
        /// <para>繼承後必須實作以下程式碼才可正確解析</para>
        /// <para>this.Dies = new List&lt;AbstractDie&gt;();</para>
        /// <para>for (int i = 0; i &lt; Header.MapDataAreaLineSize * this.Header.MapDataAreaRowSize; i++)</para>
        /// <para>{</para>
        /// <para>    Die d = new Die(new ArraySegment&lt;byte&gt;(this.TskBytes, currentIndex, 6));</para>
        /// <para>    if (d.IsPassDie &amp;&amp; !this.PassBins.Contains(d.DieCharacter))</para>
        /// <para>    {</para>
        /// <para>        this.PassBins.Add(d.DieCharacter);</para>
        /// <para>    }</para>
        /// <para>    this.Dies.Add(d);</para>
        /// <para>    currentIndex += 6;</para>
        /// <para>}</para>
        /// </summary>
        /// <param name="currentIndex">當前的<see langword="byte"/> <see cref="Array"/> 序號參考</param>
        protected abstract void ReadTskDie(ref int currentIndex);

        /// <summary>
        /// 解析 <see cref="ExtendedDieBase"/>
        /// <para>繼承後必須實作以下程式碼才可正確解析</para>
        /// <para>for (int i = 0; i &lt; this.Dies.Count; i++)</para>
        /// <para>{</para>
        /// <para>    this.Dies[i].ExtendedDieData = new ExtendedDie(new ArraySegment&lt;byte&gt;(this.TskBytes, currentIndex, 4));</para>
        /// <para>    currentIndex += 4;</para>
        /// <para>}</para>
        /// </summary>
        /// <param name="currentIndex">當前的<see langword="byte"/> <see cref="Array"/> 序號參考</param>
        protected abstract void ReadExtendedDie(ref int currentIndex);

    }
}
