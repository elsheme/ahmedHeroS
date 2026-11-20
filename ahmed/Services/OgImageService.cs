using AhmedHeroWedding.Models;

namespace AhmedHeroWedding.Services;

public class OgImageService : IOgImageService
{
    public string GenerateSvg(KatbKitabConfiguration config)
    {
        return $@"<svg xmlns=""http://www.w3.org/2000/svg"" width=""1200"" height=""630"" viewBox=""0 0 1200 630"">
  <defs>
    <radialGradient id=""bgGrad"" cx=""50%"" cy=""40%"" r=""60%"">
      <stop offset=""0%"" stop-color=""#13433B""/>
      <stop offset=""100%"" stop-color=""#08201D""/>
    </radialGradient>
    <linearGradient id=""goldGrad"" x1=""0%"" y1=""0%"" x2=""100%"" y2=""100%"">
      <stop offset=""0%"" stop-color=""#F4E2BB""/>
      <stop offset=""50%"" stop-color=""#C9A24B""/>
      <stop offset=""100%"" stop-color=""#9B7629""/>
    </linearGradient>
    <style>
      .txt-gold {{ fill: url(#goldGrad); font-family: 'Amiri', 'Aref Ruqaa', serif; }}
      .txt-white {{ fill: #FBF7F0; font-family: 'IBM Plex Sans Arabic', sans-serif; }}
      .txt-light {{ fill: #E8D3A0; font-family: 'IBM Plex Sans Arabic', sans-serif; }}
    </style>
  </defs>
  <rect width=""1200"" height=""630"" fill=""url(#bgGrad)""/>
  <rect x=""30"" y=""30"" width=""1140"" height=""570"" fill=""none"" stroke=""#C9A24B"" stroke-width=""2"" opacity=""0.5""/>
  <rect x=""42"" y=""42"" width=""1116"" height=""546"" fill=""none"" stroke=""#C9A24B"" stroke-width=""1"" stroke-dasharray=""6,4"" opacity=""0.35""/>
  <path d=""M 200,600 L 200,320 C 200,160 500,80 600,60 C 700,80 1000,160 1000,320 L 1000,600 Z"" fill=""none"" stroke=""#C9A24B"" stroke-width=""1.5"" opacity=""0.3""/>
  <circle cx=""600"" cy=""150"" r=""50"" fill=""#0B2E2A"" stroke=""url(#goldGrad)"" stroke-width=""2""/>
  <circle cx=""600"" cy=""150"" r=""44"" fill=""none"" stroke=""#E8D3A0"" stroke-width=""1"" stroke-dasharray=""3,2""/>
  <text x=""600"" y=""160"" text-anchor=""middle"" class=""txt-gold"" font-size=""32"" font-weight=""bold"">{config.MonogramText}</text>
  <text x=""600"" y=""245"" text-anchor=""middle"" class=""txt-light"" font-size=""22"" letter-spacing=""2"">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</text>
  <text x=""600"" y=""285"" text-anchor=""middle"" class=""txt-white"" font-size=""24"" opacity=""0.9"">تتشرف عائلتانا بدعوتكم لحضور عقد قران</text>
  <text x=""600"" y=""385"" text-anchor=""middle"" class=""txt-gold"" font-size=""68"" font-weight=""bold"">{config.GroomName}  &amp;  {config.BrideName}</text>
  <line x1=""450"" y1=""425"" x2=""750"" y2=""425"" stroke=""url(#goldGrad)"" stroke-width=""1.5"" opacity=""0.6""/>
  <text x=""600"" y=""475"" text-anchor=""middle"" class=""txt-white"" font-size=""26"" font-weight=""600"">{config.DayName} {config.FormattedGregorianDate}  •  {config.FormattedHijriDate}</text>
  <text x=""600"" y=""520"" text-anchor=""middle"" class=""txt-light"" font-size=""22"">{config.FullAddress}</text>
  <text x=""600"" y=""565"" text-anchor=""middle"" class=""txt-gold"" font-size=""20"" opacity=""0.85"">« {config.IntroSupportingLine} »</text>
</svg>";
    }
}
