import "clsx";
import { a as attr } from "../../../../chunks/attributes.js";
import { e as escape_html } from "../../../../chunks/escaping.js";
function getPanchangam({ date, latitude, longitude, tzOffset }) {
  const dayOfMonth = date.getDate();
  date.getMonth();
  date.getFullYear();
  const tithis = ["பிரதமை", "துவிதியை", "திருதியை", "சதுர்த்தி", "பஞ்சமி", "ஷஷ்டி", "சப்தமி", "அஷ்டமி", "நவமி", "தசமி", "ஏகாதசி", "துவாதசி", "திரயோதசி", "சதுர்தசி", "பூர்ணிமை"];
  const nakshatras = ["அஸ்வினி", "பரணி", "கிருத்திகை", "ரோகிணி", "மிருகசிரிடம்", "திருவாதிரை", "புனர்பூசம்", "பூசம்", "ஆயில்யம்", "மகம்", "பூரம்", "உத்திரம்", "ஹஸ்தம்", "சித்திரை", "சுவாதி", "விசாகம்", "அனுஷம்", "கேட்டை", "மூலம்", "பூராடம்", "உத்திராடம்", "திருவோணம்", "அவிட்டம்", "சதயம்", "பூர்வபட்ரபதம்", "உத்திரபட்ரபதம்", "ரேவதி"];
  const yogas = ["விஷ்கம்பம்", "பிரீதி", "ஆயுஷ்மான்", "சௌபாக்யம்", "சோபனம்", "அதிகண்டம்", "சுகர்மா", "திரிவிக்ரமம்", "ஜன்ம", "கர்ம", "விதாதி", "சக்தி", "விஜயம்", "பர்வம்", "சிவம்", "சித்தம்", "ஆதி", "விஜயம்", "பர்வம்", "சிவம்", "சித்தம்", "ஆதி", "விஜயம்", "பர்வம்", "சிவம்", "சித்தம்", "ஆதி"];
  const baseSunrise = 6 + Math.abs(latitude - 10) * 0.1;
  const sunriseHour = Math.floor(baseSunrise + dayOfMonth % 3);
  const sunriseMin = dayOfMonth * 7 % 60;
  const sunsetHour = sunriseHour + 12 + Math.floor(dayOfMonth / 10);
  const sunsetMin = dayOfMonth * 11 % 60;
  return {
    tithi: tithis[dayOfMonth % tithis.length],
    nakshatra: nakshatras[dayOfMonth % nakshatras.length],
    yoga: yogas[dayOfMonth % yogas.length],
    karana: "கிம்ஸ்துக்னம்",
    sunrise: `${sunriseHour.toString().padStart(2, "0")}:${sunriseMin.toString().padStart(2, "0")}`,
    sunset: `${sunsetHour.toString().padStart(2, "0")}:${sunsetMin.toString().padStart(2, "0")}`,
    moonrise: `${(sunsetHour + 1).toString().padStart(2, "0")}:${(sunsetMin + 30) % 60}`,
    moonset: `${(sunriseHour - 1).toString().padStart(2, "0")}:${(sunriseMin + 45) % 60}`,
    rahukalam: `${(sunriseHour + 1).toString().padStart(2, "0")}:${sunriseMin.toString().padStart(2, "0")} - ${(sunriseHour + 3).toString().padStart(2, "0")}:${sunriseMin.toString().padStart(2, "0")}`,
    yamagandam: `${(sunriseHour + 4).toString().padStart(2, "0")}:${sunriseMin.toString().padStart(2, "0")} - ${(sunriseHour + 6).toString().padStart(2, "0")}:${sunriseMin.toString().padStart(2, "0")}`,
    gulikai: `${(sunriseHour + 7).toString().padStart(2, "0")}:${sunriseMin.toString().padStart(2, "0")} - ${(sunriseHour + 9).toString().padStart(2, "0")}:${sunriseMin.toString().padStart(2, "0")}`,
    festivals: dayOfMonth % 7 === 0 ? ["அமாவாசை விரதம்"] : dayOfMonth % 15 === 0 ? ["பௌர்ணமி விரதம்"] : [],
    specialNotes: "இது ஒரு எளிய கணக்கீடு. உண்மையான பஞ்சாங்கத்திற்கு விரிவான கணிதத்தைப் பயன்படுத்தவும்."
  };
}
function TamilPanchangamPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let date = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    let latitude = 10.9541;
    let longitude = 76.9912;
    let tzOffset = 5.5;
    let panchangam = null;
    let loading = false;
    let error = "";
    async function fetchPanchangam() {
      loading = true;
      error = "";
      try {
        panchangam = await getPanchangam({ date: new Date(date), latitude, longitude, tzOffset });
      } catch (e) {
        error = "பஞ்சாங்கம் கணக்கிடுவதில் தோல்வி.";
        panchangam = null;
      }
      loading = false;
    }
    {
      fetchPanchangam();
    }
    $$renderer2.push(`<div class="max-w-xl mx-auto p-4 bg-white rounded shadow"><h1 class="text-2xl font-bold mb-2">தமிழ் பஞ்சாங்கம் (Panchangam)</h1> <form class="flex flex-col gap-2 mb-4"><label>தேதி (Date): <input type="date"${attr("value", date)} class="border rounded p-1 ml-2"/></label> <label>அகலாங்கு (Latitude): <input type="number" step="0.0001"${attr("value", latitude)} class="border rounded p-1 ml-2"/></label> <label>நெடுங்கு (Longitude): <input type="number" step="0.0001"${attr("value", longitude)} class="border rounded p-1 ml-2"/></label> <button class="bg-blue-600 text-white px-4 py-2 rounded self-start mt-2" type="submit">பஞ்சாங்கம் பெறு</button></form> `);
    if (loading) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div>ஏற்றுகிறது...</div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (error) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="text-red-600">${escape_html(error)}</div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (panchangam) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="space-y-2"><div><b>தேதி:</b> ${escape_html(date)}</div> <div><b>இடம்:</b> ${escape_html(latitude)}, ${escape_html(longitude)} (UTC+5.5)</div> <div><b>சூரிய உதயம்:</b> ${escape_html(panchangam.sunrise)}</div> <div><b>சூரிய அஸ்தமனம்:</b> ${escape_html(panchangam.sunset)}</div> <div><b>சந்திர உதயம்:</b> ${escape_html(panchangam.moonrise)}</div> <div><b>சந்திர அஸ்தமனம்:</b> ${escape_html(panchangam.moonset)}</div> <div><b>திதி:</b> ${escape_html(panchangam.tithi)}</div> <div><b>நக்ஷத்திரம்:</b> ${escape_html(panchangam.nakshatra)}</div> <div><b>யோகம்:</b> ${escape_html(panchangam.yoga)}</div> <div><b>கரணம்:</b> ${escape_html(panchangam.karana)}</div> <div><b>ராகு காலம்:</b> ${escape_html(panchangam.rahukalam)}</div> <div><b>யமகண்டம்:</b> ${escape_html(panchangam.yamagandam)}</div> <div><b>குளிகை:</b> ${escape_html(panchangam.gulikai)}</div> <div><b>விழாக்கள்:</b> ${escape_html(panchangam.festivals?.join(", ") || "இல்லை")}</div> `);
          if (panchangam.specialNotes) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<div><b>சிறப்பு குறிப்புகள்:</b> ${escape_html(panchangam.specialNotes)}</div>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function _page($$renderer) {
  TamilPanchangamPage($$renderer);
}
export {
  _page as default
};
