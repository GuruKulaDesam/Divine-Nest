import { h as head } from "./index2.js";
import { W as WellnessDashboard } from "./WellnessDashboard.js";
function WellnessPage($$renderer) {
  head($$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Wellness &amp; Health - South Indian Family Life App</title>`);
    });
    $$renderer2.push(`<meta name="description" content="Track health, practice mantras, and maintain wellness with traditional South Indian practices"/>`);
  });
  WellnessDashboard($$renderer);
}
export {
  WellnessPage as W
};
