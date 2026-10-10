using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace TSK
{
    /// <summary>
    /// 電腦世界內最小的單位。
    /// </summary>
    public sealed class Bit { }
    /// <summary>
    /// <see cref="Generic"/> 物件
    /// </summary>
    public static class Generic
    {
        /// <summary>
        /// 從 <paramref name="sourceByteArray"/> 中提取指定範圍的資料。
        /// 使用此方法時，請傳入您的來源數組，例如 `A`。
        /// </summary>
        /// <param name="sourceByteArray">來源的 <see langword="byte"/> 陣列</param>
        /// <param name="startIndex">陣列中開始的位置</param>
        /// <param name="length">所需的範圍</param>
        /// <returns>返回包含指定範圍的新的陣列</returns>
        public static byte[] SubByte(this byte[] sourceByteArray, int startIndex, int length = 1)
        {
            byte[] result = new byte[length];
            Buffer.BlockCopy(sourceByteArray, startIndex, result, 0, length);
            return result;
        }

        /// <summary>
        /// 將傳入的不帶正負號的 8 位整數(<see langword="byte"/>) <see cref="Array"/> 轉換為 <see cref="ASCIIEncoding"/> 的 <see cref="string"/>
        /// </summary>
        /// <param name="source">不帶正負號的 8 位整數(<see langword="byte"/>)陣列</param>
        /// <returns><see cref="ASCIIEncoding"/> 的 <see langword="string"/></returns>
        public static string ByteArrayToASCIIString(this IEnumerable<byte> source)
        {
            char[] chars = new char[source.Count()];
            int index = 0;
            foreach (byte b in source)
            {
                if (b != 0)
                {
                    chars[index++] = (char)b;
                }
            }
            return new string(chars, 0, index).Trim();
        }

        /// <summary>
        /// 將傳入的不帶正負號的 8 位整數(<see langword="byte"/>) <see cref="Array"/> 轉換為 <see langword="int"/>
        /// </summary>
        /// <param name="source">不帶正負號的 8 位整數(<see langword="byte"/>)陣列</param>
        /// <returns><see langword="int"/></returns>
        public static int ByteArrayToInteger(this byte[] source)
        {
            int result = 0;
            for (int i = 0; i < source.Length; i++)
            {
                result |= source[i] << (8 * (source.Length - 1 - i));
            }
            return result;
        }

        /// <summary>
        /// 將傳入的 <paramref name="value"/> 轉換為長度 <paramref name="length"/> 的 <see langword="byte"/> <see langword="Array"/>
        /// </summary>
        /// <param name="value">要轉換的字串</param>
        /// <param name="length"><see langword="byte"/> <see cref="Array"/>的長度</param>
        /// <returns><see langword="byte"/> <see cref="Array"/></returns>
        internal static byte[] ASCIIStringToByteArray(this string value, int length)
        {
            byte[] result = new byte[length];
            int copyLength = Math.Min(value.Length, length);
            Encoding.ASCII.GetBytes(value, 0, copyLength, result, 0);
            return result;
        }

        /// <summary>
        /// 將傳入的 <paramref name="value"/> 轉換為長度 <paramref name="length"/> 的 <see langword="byte"/> <see langword="Array"/>
        /// </summary>
        /// <param name="value">要轉換的數值</param>
        /// <param name="length"><see langword="byte"/> <see cref="Array"/>的長度</param>
        /// <returns><see langword="byte"/> <see cref="Array"/></returns>
        internal static byte[] IntegerToByteArray(this int value, int length = 1)
        {
            byte[] original = BitConverter.GetBytes(value);

            byte[] result = new byte[length];
            int copyLength = Math.Min(original.Length, length);

            // 反轉並直接填充到結果陣列
            for (int i = 0; i < copyLength; i++)
            {
                result[length - 1 - i] = original[i];
            }

            return result;
        }
    }
}
