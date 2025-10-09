import "clsx";
import { h as head } from "../../../chunks/index2.js";
import TripHistoryPage from "../../../chunks/TripHistoryPage.js";
function TripsPage($$renderer) {
  head($$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Travel History - South Indian Family Life App</title>`);
    });
    $$renderer2.push(`<meta name="description" content="Track and manage family travel history and itineraries"/>`);
  });
  TripHistoryPage($$renderer);
}
function _page($$renderer) {
  TripsPage($$renderer);
}
export {
  _page as default
};
