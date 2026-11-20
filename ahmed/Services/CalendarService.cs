using System.Text;
using AhmedHeroWedding.Models;

namespace AhmedHeroWedding.Services;

public class CalendarService : ICalendarService
{
    public byte[] GenerateIcsCalendar(WeddingPageViewModel model)
    {
        var ics = new StringBuilder();
        ics.AppendLine("BEGIN:VCALENDAR");
        ics.AppendLine("VERSION:2.0");
        ics.AppendLine("PRODID:-//Ahmed & Sarah Katb Kitab//AR");
        ics.AppendLine("CALSCALE:GREGORIAN");
        ics.AppendLine("METHOD:PUBLISH");
        ics.AppendLine("BEGIN:VEVENT");
        ics.AppendLine("UID:katb-kitab-ahmed-sarah-20270415@ahmedhero.com");
        ics.AppendLine("DTSTAMP:20261119T200000Z");
        ics.AppendLine("DTSTART:20270415T180000Z");
        ics.AppendLine("DTEND:20270415T220000Z");
        ics.AppendLine($"SUMMARY:عقد قران {model.Couple.GroomName} و {model.Couple.BrideName}");
        ics.AppendLine($"DESCRIPTION:تتشرف عائلتانا بدعوتكم لحضور عقد قران {model.Couple.GroomName} & {model.Couple.BrideName} في {model.Event.HallName} – {model.Event.HotelName}. {model.Couple.FooterNote}!");
        ics.AppendLine($"LOCATION:{model.Event.FullAddress}");
        ics.AppendLine("STATUS:CONFIRMED");
        ics.AppendLine("END:VEVENT");
        ics.AppendLine("END:VCALENDAR");

        return Encoding.UTF8.GetBytes(ics.ToString());
    }
}
