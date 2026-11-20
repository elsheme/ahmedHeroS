using System;
using System.Collections.Generic;

namespace AhmedHeroWedding.Models;

/// <summary>
/// Single unified configuration file for all editable Katb Kitab invitation content.
/// Change couple names, dates, venue, story moments, practical info, and contact phone here.
/// </summary>
public class KatbKitabConfiguration
{
    public static KatbKitabConfiguration Current { get; set; } = new();

    // Couple Details
    public string GroomName { get; set; } = "أحمد";
    public string BrideName { get; set; } = "سارة";
    public string MonogramText { get; set; } = "أ & س";
    public string PageTitle { get; set; } = "عقد قران أحمد & سارة";

    // Sacred Texts & Contract Theme
    public string QuranVerse { get; set; } = "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً";
    public string HeroInvitationLine { get; set; } = "بكل الحب والامتنان، تتشرف عائلتانا بدعوتكم لحضور عقد قران";
    public string IntroSupportingLine { get; set; } = "حضوركم يكمل بركة عقدنا";
    public string BlessingQuote { get; set; } = "بارك الله لهما وبارك عليهما وجمع بينهما في خير";
    public string ClosingLine { get; set; } = "جزاكم الله خيراً على حضوركم ودعائكم";

    // Event Date & Time (Thursday 15 April 2027)
    public DateTime CeremonyDateTime { get; set; } = new DateTime(2027, 4, 15, 20, 0, 0);
    public string DayName { get; set; } = "الخميس";
    public string FormattedGregorianDate { get; set; } = "١٥ أبريل ٢٠٢٧ م";
    public string FormattedHijriDate { get; set; } = "٨ ذو القعدة ١٤٤٨ هـ";
    public string FormattedTime { get; set; } = "حضور العقد: الثامنة مساءً";

    // Venue Details
    public string HallName { get; set; } = "قاعة اللؤلؤة";
    public string HotelName { get; set; } = "فندق الماسة";
    public string CityDistrict { get; set; } = "التجمع الخامس، القاهرة الجديدة";
    public string FullAddress { get; set; } = "قاعة اللؤلؤة – فندق الماسة، التجمع الخامس، القاهرة الجديدة";
    public string GoogleMapsDirectUrl { get; set; } = "https://maps.google.com/?q=Al+Masa+Hotel+New+Cairo";

    // Practical Info Block
    public PracticalInfo DetailsBlock { get; set; } = new();

    // Story in 3 Moments ("حكايتنا")
    public List<StoryMoment> StoryMoments { get; set; } = new()
    {
        new StoryMoment
        {
            Number = "٠١",
            Title = "الرؤية واللقاء الأول",
            Description = "صدفة مباركة جمعت بين قلبين، فكانت البداية بحديث طيّب ووئام صادق.",
            ImageUrl = "",
            OrnamentIcon = "crescent"
        },
        new StoryMoment
        {
            Number = "٠٢",
            Title = "الوفاق والخطوبة",
            Description = "تلاقت العائلتان على المودة والخير، وتوثق الوعد ببصيرة ورضا.",
            ImageUrl = "",
            OrnamentIcon = "seal"
        },
        new StoryMoment
        {
            Number = "٠٣",
            Title = "عهد المودة",
            Description = "اليوم نتوّج المسيرة بكتب الكتاب، وبشهادتكم الكريمة معنا على عقد القران.",
            ImageUrl = "",
            OrnamentIcon = "feather"
        }
    };

    // UI Labels & Section Content (Zero hardcoded text in partials)
    public UiContent Ui { get; set; } = new();
}

public class UiContent
{
    public string OpenInvitationBtn { get; set; } = "فك الختم وفتح العقد";
    public string SkipIntroBtn { get; set; } = "تخطي";
    public string CountdownTitle { get; set; } = "باقي على عقد القران";
    public string CountdownSubtitle { get; set; } = "ننتظر شهادتكم الكريمة ومشاركتكم بركة عهدنا";
    public string CountdownCelebrationTitle { get; set; } = "اليوم نكتب كتابنا… ادعوا لنا";
    public string DetailsEyebrow { get; set; } = "العهد والموعد";
    public string DetailsTitle { get; set; } = "تفاصيل عقد القران";
    public string TimeCardHeading { get; set; } = "الموعد المبارك";
    public string VenueCardHeading { get; set; } = "مكان العقد";
    public string PracticalInfoHeading { get; set; } = "معلومات تهم السادة الشهود والضيوف";
    public string OpenMapBtn { get; set; } = "فتح الموقع على خرائط جوجل";
    public string OpenMapTag { get; set; } = "افتح في الخرائط";
    public string AddToCalendarBtn { get; set; } = "أضف الموعد للتقويم";
    public string GoogleCalendar { get; set; } = "تقويم جوجل";
    public string AppleCalendar { get; set; } = "تقويم آبل / أوتلوك";
    public string StoryTitle { get; set; } = "حكايتنا في ثلاث محطات";
    public string GuestbookEyebrow { get; set; } = "ورقة الشهود";
    public string GuestbookTitle { get; set; } = "شهادات ودعوات الأحباب";
    public string DuaSubtitle { get; set; } = "أكرمونا بدعوة صالحة تبارك عقدنا وتؤنس قلبينا";
    public string DuaCountLabel { get; set; } = "دعوة مباركة حتى الآن";
    public string DuaBtn { get; set; } = "ادعُ لنا";
    public string DuaPrayedBtn { get; set; } = "جزاكم الله خيراً";
    public string RsvpFormTitle { get; set; } = "ورقة الشهود";
    public string RsvpFormSubtitle { get; set; } = "اترك توقيعك ودعوتك";
    public string NameFieldLabel { get; set; } = "الاسم الكريم (الشاهد)";
    public string NameFieldPlaceholder { get; set; } = "اكتب اسمك الكريم";
    public string AttendanceLabel { get; set; } = "حالة الحضور";
    public string AttendingBtn { get; set; } = "سأحضر كشاهد على العقد";
    public string DeclinedBtn { get; set; } = "أعتذر لظروف خاصة";
    public string CompanionsLabel { get; set; } = "عدد المرافقين";
    public string SignatureLabel { get; set; } = "توقيع الشاهد على العقد";
    public string SigModeDraw { get; set; } = "وقع بيدك";
    public string SigModeType { get; set; } = "أو اكتب اسمك بخط الرقعة";
    public string SigTypedPlaceholder { get; set; } = "اكتب اسمك كما تحب أن يظهر كختم توقيع";
    public string SigTypedPreviewDefault { get; set; } = "توقيع الشاهد بخط الرقعة";
    public string SigUndoBtn { get; set; } = "تراجع";
    public string SigClearBtn { get; set; } = "مسح";
    public string MessageFieldLabel { get; set; } = "دعوة مباركة للعروسين";
    public string MessageFieldPlaceholder { get; set; } = "اكتب دعوتك ومباركتك في وثيقة الشهود...";
    public string SubmitRsvpBtn { get; set; } = "توقيع وتأكيد الحضور كشاهد";
    public string ModalSuccessTitle { get; set; } = "سُجلت شهادتكم ببركة";
    public string ModalCloseBtn { get; set; } = "إغلاق";
    public string ShareWhatsAppBtn { get; set; } = "مشاركة الدعوة عبر واتساب";
    public string ReplayIntroTooltip { get; set; } = "إعادة فتح الدعوة";
    public string AudioTooltip { get; set; } = "تشغيل/إيقاف الموسيقى";
}

public class PracticalInfo
{
    public string PrayerTiming { get; set; } = "تقام مراسم عقد القران عقب صلاة العشاء مباشرة، في تمام الثامنة مساءً.";
    public string ParkingNote { get; set; } = "خدمة ركن السيارات متاحة عند مدخل قاعة اللؤلؤة – فندق الماسة.";
    public string DressCode { get; set; } = "الزي المقترح: رسمي أنيق.";
    public string CoordinatorContactPhone { get; set; } = "+201000000000";
    public string FormattedPhone { get; set; } = "+٢٠ ١٠٠ ٠٠٠ ٠٠٠٠";
    public string WhatsAppDirectUrl => $"https://wa.me/{CoordinatorContactPhone.Replace("+", "").Replace(" ", "")}";
}

public class StoryMoment
{
    public string Number { get; set; } = "";
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public string ImageUrl { get; set; } = "";
    public string OrnamentIcon { get; set; } = "";
}
