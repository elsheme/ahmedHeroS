using AhmedHeroWedding.Models;

namespace AhmedHeroWedding.Services;

public interface ICalendarService
{
    byte[] GenerateIcsCalendar(WeddingPageViewModel model);
}
