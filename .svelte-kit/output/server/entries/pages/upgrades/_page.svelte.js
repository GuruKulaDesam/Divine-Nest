import "clsx";
import { h as head } from "../../../chunks/index2.js";
import IssuesUpgradesPage from "../../../chunks/IssuesUpgradesPage.js";
function UpgradesPage($$renderer) {
  head($$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Home Upgrades - South Indian Family Life App</title>`);
    });
    $$renderer2.push(`<meta name="description" content="Plan and track home improvement and upgrade projects"/>`);
  });
  IssuesUpgradesPage($$renderer);
}
function _page($$renderer) {
  UpgradesPage($$renderer);
}
export {
  _page as default
};
