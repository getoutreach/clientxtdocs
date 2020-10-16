using System;

namespace Outreach.CXT.Demo.Server.Extensions
{
    public static class DateExtensions
    {
        
        private static DateTime _unixEpoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);

        /// <summary>Converts a DateTime to milliseconds since Epoch.</summary>
        /// <param name="dateTime">The date time.</param>
        /// <returns>Milliseconds since Epoch</returns>
        public static long ToEpochMillis(this DateTime dateTime)
        {
            return (long) (dateTime - _unixEpoch).TotalMilliseconds;
        }

        /// <summary>
        ///     Returns a DateTime representing the number of milliseconds since Epoch.
        /// </summary>
        /// <param name="epochMillis">The number of milliseconds since Epoch.</param>
        /// <returns>A DateTime representing the number of milliseconds since Epoch.</returns>
        public static DateTime FromEpochMillis(this long epochMillis)
        {
            return _unixEpoch.AddMilliseconds(epochMillis);
        }
        
    }
}