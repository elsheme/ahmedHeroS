using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AhmedHeroWedding.Models;

public class WeddingPageViewModel
{
    public KatbKitabConfiguration Config { get; set; } = KatbKitabConfiguration.Current;
    public CoupleDetails Couple { get; set; } = new();
    public EventDetails Event { get; set; } = new();
    public List<StoryMoment> StoryMoments { get; set; } = new();
    public List<GuestbookMessage> RecentWishes { get; set; } = new();
    public RsvpSubmissionModel RsvpForm { get; set; } = new();

    // Personalized greeting from URL parameter ?guest=الاسم
    public string? PersonalizedGuestName { get; set; }

    // Duaa counter ("ادعُ لنا")
    public int PrayerCount { get; set; } = 42;
}

public class CoupleDetails
{
    public string GroomName { get; set; } = "أحمد";
    public string BrideName { get; set; } = "سارة";
    public string MonogramText { get; set; } = "أ & س";
    public string QuranVerse { get; set; } = "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً";
    public string InvitationText { get; set; } = "بكل الحب والامتنان، تتشرف عائلتانا بدعوتكم لحضور عقد قران";
    public string BlessingQuote { get; set; } = "بارك الله لهما وبارك عليهما وجمع بينهما في خير";
    public string FooterNote { get; set; } = "حضوركم يكمل بركة عقدنا";
    public string ClosingLine { get; set; } = "جزاكم الله خيراً على حضوركم ودعائكم";
}

public class EventDetails
{
    public DateTime CeremonyDateTime { get; set; } = new DateTime(2027, 4, 15, 20, 0, 0);
    public string DayName { get; set; } = "الخميس";
    public string FormattedDate { get; set; } = "١٥ أبريل ٢٠٢٧ م";
    public string FormattedHijriDate { get; set; } = "٨ ذو القعدة ١٤٤٨ هـ";
    public string FormattedTime { get; set; } = "حضور العقد: الثامنة مساءً (عقب صلاة العشاء)";
    public string HallName { get; set; } = "قاعة اللؤلؤة";
    public string HotelName { get; set; } = "فندق الماسة";
    public string CityAddress { get; set; } = "التجمع الخامس، القاهرة الجديدة";
    public string FullAddress { get; set; } = "قاعة اللؤلؤة – فندق الماسة، التجمع الخامس، القاهرة الجديدة";
    public string GoogleMapsUrl { get; set; } = "https://maps.google.com/?q=Al+Masa+Hotel+New+Cairo";
    public string GoogleCalendarUrl { get; set; } = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=%D8%B9%D9%82%D8%AF+%D9%82%D8%B1%D8%A7%D9%86+%D8%A3%D8%AD%D9%85%D8%AF+%D9%88%D8%B3%D8%A7%D8%B1%D8%A9&dates=20270415T180000Z/20270415T220000Z&details=%D9%86%D8%AA%D8%B4%D8%B1%D9%81+%D8%A8%D8%AD%D8%B6%D9%88%D8%B1%D9%83%D9%85+%D8%B9%D9%82%D8%AF+%D9%82%D8%B1%D8%A7%D9%86+%D8%A3%D8%AD%D9%85%D8%AF+%D9%88%D8%B3%D8%A7%D8%B1%D8%A9+%D9%81%D9%8A+%D9%81%D9%86%D8%AF%D9%82+%D8%A7%D9%84%D9%85%D8%A7%D8%B3%D8%A9.+%D8%AD%D8%B6%D9%88%D8%B1%D9%83%D9%85+%D9%8A%D9%83%D9%85%D9%84+%D8%A8%D8%B1%D9%83%D8%A9+%D8%B9%D9%82%D8%AF%D9%86%D8%A7!&location=%D9%82%D8%A7%D8%B9%D8%A9+%D8%A7%D9%84%D9%84%D8%A4%D9%84%D8%A4%D8%A9+%E2%80%93+%D9%81%D9%86%D8%AF%D9%82+%D8%A7%D9%84%D9%85%D8%A7%D8%B3%D8%A9%D8%8C+%D8%A7%D9%84%D8%AA%D8%AC%D9%85%D8%B9+%D8%A7%D9%84%D8%AE%D8%A7%D9%85%D8%B3";
}

public class GuestbookMessage
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string GuestName { get; set; } = "";
    public string MessageText { get; set; } = "";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string FormattedTime { get; set; } = "الآن";
    public string AttendanceStatus { get; set; } = "شاهد على العقد";
    public string? SignatureData { get; set; }
    public string? SignatureType { get; set; } = "drawn"; // "drawn" or "typed"
    public int CompanionsCount { get; set; } = 0;
}

public class RsvpSubmissionModel
{
    [Required(ErrorMessage = "يُرجى إدخال الاسم الكريم")]
    [StringLength(100, MinimumLength = 2, ErrorMessage = "يجب أن يكون الاسم بين حرفين و 100 حرف")]
    public string FullName { get; set; } = "";

    [Required(ErrorMessage = "يُرجى اختيار حالة الحضور")]
    public string AttendanceStatus { get; set; } = "Attending"; // "Attending" (شاهد على العقد) or "Declined" (أعتذر)

    [Range(0, 5, ErrorMessage = "عدد المرافقين يجب أن يكون بين ٠ و ٥")]
    public int CompanionsCount { get; set; } = 0;

    [StringLength(600, ErrorMessage = "الدعوة لا تزيد عن 600 حرف")]
    public string? BlessingMessage { get; set; } = "";

    [StringLength(65000, ErrorMessage = "توقيع الشاهد تجاوز الحجم المسموح")]
    public string? SignatureData { get; set; }

    public string? SignatureType { get; set; } = "drawn"; // "drawn" or "typed"
}

public class RsvpResultDto
{
    public bool Success { get; set; }
    public string Message { get; set; } = "";
    public GuestbookMessage? NewEntry { get; set; }
}

public class PrayerResultDto
{
    public bool Success { get; set; }
    public int TotalPrayers { get; set; }
    public string FormattedCount { get; set; } = "٤٢";
    public string Message { get; set; } = "";
}
