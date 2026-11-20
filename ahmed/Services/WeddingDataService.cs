using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using AhmedHeroWedding.Models;

namespace AhmedHeroWedding.Services;

public interface IWeddingDataService
{
    WeddingPageViewModel GetWeddingData(string? guestName = null);
    RsvpResultDto ProcessRsvp(RsvpSubmissionModel rsvp);
    List<GuestbookMessage> GetWishes();
    PrayerResultDto IncrementPrayerCount();
    int GetPrayerCount();
}

public class WeddingDataService : IWeddingDataService
{
    private static int _prayerCount = 42;

    private static readonly List<GuestbookMessage> _wishes = new()
    {
        new GuestbookMessage
        {
            Id = Guid.NewGuid(),
            GuestName = "د. محمود عبد العزيز",
            MessageText = "بارك الله لكما وبارك عليكما وجمع بينهما في خير. شهادة خير ومودة وبركة إن شاء الله على هذا العهد المبارك.",
            CreatedAt = DateTime.UtcNow.AddHours(-6),
            FormattedTime = "منذ ٦ ساعات",
            AttendanceStatus = "سيحضر",
            SignatureType = "typed",
            SignatureData = "typed:د. محمود عبد العزيز",
            CompanionsCount = 1
        },
        new GuestbookMessage
        {
            Id = Guid.NewGuid(),
            GuestName = "عائلة الشناوي",
            MessageText = "ألف مبارك كتب الكتاب يا أحمد ويا سارة، أسعد الله قلبيكما وكتب لكما التوفيق والسكينة الدائمة.",
            CreatedAt = DateTime.UtcNow.AddHours(-18),
            FormattedTime = "بالأمس",
            AttendanceStatus = "سيحضر",
            SignatureType = "typed",
            SignatureData = "typed:عائلة الشناوي",
            CompanionsCount = 2
        },
        new GuestbookMessage
        {
            Id = Guid.NewGuid(),
            GuestName = "المهندس طارق ورفاقه",
            MessageText = "مبارك عقد القران المبارك. نسأل الله أن يبارك بيتكما ويجعله عامراً بالمودة والرحمة والبركة.",
            CreatedAt = DateTime.UtcNow.AddHours(-36),
            FormattedTime = "منذ يومين",
            AttendanceStatus = "سيحضر",
            SignatureType = "typed",
            SignatureData = "typed:م. طارق",
            CompanionsCount = 0
        }
    };

    private static readonly List<RsvpSubmissionModel> _rsvps = new();

    public WeddingPageViewModel GetWeddingData(string? guestName = null)
    {
        var config = KatbKitabConfiguration.Current;

        return new WeddingPageViewModel
        {
            Config = config,
            Couple = new CoupleDetails
            {
                GroomName = config.GroomName,
                BrideName = config.BrideName,
                MonogramText = config.MonogramText,
                QuranVerse = config.QuranVerse,
                InvitationText = config.HeroInvitationLine,
                BlessingQuote = config.BlessingQuote,
                FooterNote = config.IntroSupportingLine,
                ClosingLine = config.ClosingLine
            },
            Event = new EventDetails
            {
                CeremonyDateTime = config.CeremonyDateTime,
                DayName = config.DayName,
                FormattedDate = config.FormattedGregorianDate,
                FormattedHijriDate = config.FormattedHijriDate,
                FormattedTime = config.FormattedTime,
                HallName = config.HallName,
                HotelName = config.HotelName,
                CityAddress = config.CityDistrict,
                FullAddress = config.FullAddress,
                GoogleMapsUrl = config.GoogleMapsDirectUrl
            },
            StoryMoments = config.StoryMoments,
            RecentWishes = GetWishes(),
            PersonalizedGuestName = guestName,
            PrayerCount = _prayerCount
        };
    }

    public RsvpResultDto ProcessRsvp(RsvpSubmissionModel rsvp)
    {
        lock (_rsvps)
        {
            _rsvps.Add(rsvp);
        }

        GuestbookMessage? newEntry = null;
        bool isAttending = rsvp.AttendanceStatus.Equals("Attending", StringComparison.OrdinalIgnoreCase);

        // Always create guestbook witness card if signed or message provided
        if (!string.IsNullOrWhiteSpace(rsvp.BlessingMessage) || !string.IsNullOrWhiteSpace(rsvp.SignatureData))
        {
            newEntry = new GuestbookMessage
            {
                Id = Guid.NewGuid(),
                GuestName = rsvp.FullName.Trim(),
                MessageText = string.IsNullOrWhiteSpace(rsvp.BlessingMessage) ? "بارك الله لكما وجمع بينكما في خير." : rsvp.BlessingMessage.Trim(),
                CreatedAt = DateTime.UtcNow,
                FormattedTime = "الآن",
                AttendanceStatus = isAttending ? "سيحضر" : "اعتذر",
                SignatureData = rsvp.SignatureData,
                SignatureType = rsvp.SignatureType ?? "drawn",
                CompanionsCount = rsvp.CompanionsCount
            };

            lock (_wishes)
            {
                _wishes.Insert(0, newEntry);
            }
        }

        return new RsvpResultDto
        {
            Success = true,
            Message = isAttending
                ? $"أهلاً بك يا {rsvp.FullName} شاهداً كريماً على عقد قراننا. حضوركم يكمل بركة عهدنا بإذن الله."
                : $"شكراً لك يا {rsvp.FullName}، شملتنا دعواتك الطيبة وسنفتقد وجودك بين الشهود.",
            NewEntry = newEntry
        };
    }

    public List<GuestbookMessage> GetWishes()
    {
        lock (_wishes)
        {
            return _wishes.OrderByDescending(w => w.CreatedAt).ToList();
        }
    }

    public PrayerResultDto IncrementPrayerCount()
    {
        int newCount = Interlocked.Increment(ref _prayerCount);
        return new PrayerResultDto
        {
            Success = true,
            TotalPrayers = newCount,
            FormattedCount = ToEasternArabicDigits(newCount),
            Message = "جزاك الله خيراً، شملتنا دعواتك الكريمة!"
        };
    }

    public int GetPrayerCount()
    {
        return _prayerCount;
    }

    public static string ToEasternArabicDigits(int number)
    {
        var western = number.ToString();
        var sb = new System.Text.StringBuilder();
        foreach (char c in western)
        {
            if (c >= '0' && c <= '9')
            {
                sb.Append((char)('٠' + (c - '0')));
            }
            else
            {
                sb.Append(c);
            }
        }
        return sb.ToString();
    }
}
