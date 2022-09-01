import browser from "webextension-polyfill";

let websocket: WebSocket | undefined;
function createWebSocketConnection() {
  if ("WebSocket" in globalThis) {
    console.log("we are here");
    connect("ws://localhost:3013");
  }
}

//Make a websocket connection with the server.
function connect(host: string) {
  if (websocket === undefined) {
    websocket = new WebSocket(host);
  }

  websocket.onmessage = function (event) {
    let data: null | {
      type: string;
      data: {
        file: {
          scop: "background" | "contentScript";
        };
      };
    };
    try {
      data = JSON.parse(event.data);
    } catch (e) {
      return;
    }
    if (!data) return;

    browser.tabs
      .query({})
      .then((tabs) => {
        if (!(tabs && tabs.length)) return;
        const allTabs = tabs.filter(
          (tab) => tab.url && tab.url.includes(`${browser.runtime.id}`)
        );
        allTabs.forEach((tab) => {
          browser.tabs.reload(tab.id);
        });
        closeWebSocketConnection();

        console.log("tabs got updated");
      })
      .finally(() => {
        console.log("background script got updated");
        if (
          typeof data?.data.file.scop === "string" &&
          data?.data.file.scop === "background"
        )
          browser.runtime.reload();
      });
  };

  //If the websocket is closed but the session is still active, create new connection again
  websocket.onclose = function () {
    closeWebSocketConnection();
  };
}

//Close the websocket connection
function closeWebSocketConnection() {
  if (websocket != null || websocket != undefined) {
    websocket.close();
    websocket = undefined;
  }
}
const startHotReload = createWebSocketConnection;
const closeHotReload = closeWebSocketConnection;

export { startHotReload, closeHotReload };
