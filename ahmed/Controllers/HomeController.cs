using System;
using System.Diagnostics;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using AhmedHeroWedding.Models;
using AhmedHeroWedding.Services;

namespace AhmedHeroWedding.Controllers;

public class HomeController : Controller
{
    private readonly IWeddingDataService _weddingService;
    private readonly ICalendarService _calendarService;
    private readonly IOgImageService _ogImageService;

    public HomeController(
        IWeddingDataService weddingService,
        ICalendarService calendarService,
        IOgImageService ogImageService)
    {
        _weddingService = weddingService;
        _calendarService = calendarService;
        _ogImageService = ogImageService;
    }

    public IActionResult Index([FromQuery] string? guest)
    {
        var sanitized = string.IsNullOrWhiteSpace(guest) ? null : WebUtility.HtmlEncode(guest.Trim()[..Math.Min(60, guest.Trim().Length)]);
        return View(_weddingService.GetWeddingData(sanitized));
    }

    [HttpPost]
    public IActionResult PrayForUs() => Json(_weddingService.IncrementPrayerCount());

    [HttpGet]
    public IActionResult DownloadIcs()
    {
        var model = _weddingService.GetWeddingData();
        return File(_calendarService.GenerateIcsCalendar(model), "text/calendar; charset=utf-8", "Katb-Kitab-Ahmed-Sarah.ics");
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult SubmitRsvp([FromForm] RsvpSubmissionModel model)
    {
        if (!ModelState.IsValid)
            return BadRequest(new { success = false, message = "يرجى التأكد من ملء الاسم واختيار حالة الحضور" });

        return Json(_weddingService.ProcessRsvp(model));
    }

    [HttpGet]
    public IActionResult GetWishes() => Json(_weddingService.GetWishes());

    [HttpGet("audio/wedding-nasheed.m4a")]
    [HttpGet("Home/Audio")]
    public IActionResult WeddingAudio()
    {
        var audioPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "audio", "wedding-nasheed.m4a");
        if (System.IO.File.Exists(audioPath))
        {
            return PhysicalFile(audioPath, "audio/mp4", enableRangeProcessing: true);
        }
        return NotFound();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error() => View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
}
