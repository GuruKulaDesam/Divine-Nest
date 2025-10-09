import "clsx";
import { h as head } from "../../../chunks/index2.js";
import IssuesRepairsPage from "../../../chunks/IssuesRepairsPage.js";
function RepairsPage($$renderer) {
  head($$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Home Repairs - South Indian Family Life App</title>`);
    });
    $$renderer2.push(`<meta name="description" content="Track and manage home repair and maintenance tasks"/>`);
  });
  IssuesRepairsPage($$renderer);
}
function _page($$renderer) {
  RepairsPage($$renderer);
}
export {
  _page as default
};
