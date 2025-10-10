import { h as head } from "./index2.js";
import { D as DirectoryDashboard } from "./DirectoryDashboard.js";
function VendorsPage($$renderer) {
  head($$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Vendors &amp; Services - South Indian Family Life App</title>`);
    });
    $$renderer2.push(`<meta name="description" content="Manage service providers, vendors, and local business contacts"/>`);
  });
  DirectoryDashboard($$renderer);
}
export {
  VendorsPage as V
};
