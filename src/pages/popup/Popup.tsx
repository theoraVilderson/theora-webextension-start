import React from "react";

function Popup() {
  return <div style={{ width: "200px", height: "300px" }}>popupPage 7</div>;
}

// "content_scripts": [
//     {
//       "js": [
//         "dist/lib/polyfill/browser-polyfill.min.js",
//         "dist/lib/helper.js",
//         "dist/lib/easyHttp/easyHttp.js",
//         "dist/lib/1secmail/1secmail.js",
//         "dist/contentScripts/webScript.js"
//       ],
//       "matches": ["http://*/*", "https://*/*"],
//       "exclude_matches": ["https://www.1secmail.com/*"],
//       "run_at": "document_end"
//     }
//   ],
export default Popup;
