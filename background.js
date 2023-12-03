let savedTexts = [];

chrome.runtime.onInstalled.addListener(() => {
  console.log("Text Saver extension installed!");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "saveText") {
    saveText(message.text);
  } else if (message.action === "checkText") {
    sendResponse(savedTexts);
  }
});

function saveText(text) {
  savedTexts.push(text);
  chrome.runtime.sendMessage({ action: "updatePopup", texts: savedTexts });
}
