import "./main.css";
import { sheet } from "@emotion/css";

// Check if the root node has any children to detect if the app has been preprendered
// speedy is disabled when the app is being prerendered so that styles render into the DOM
// speedy is significantly faster though so it should only be disabled during prerendering
if (document.querySelector("html[data-prerender]")) {
  sheet.speedy(false);
}
