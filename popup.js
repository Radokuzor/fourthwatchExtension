chrome.runtime.sendMessage({ action: "checkText" }, (response) => {
  updatePopup(response);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "updatePopup") {
    updatePopup(message.texts);
  }
});

function updatePopup(texts) {
  const savedTextList = document.getElementById("savedTextList");
  savedTextList.innerHTML = "";

  texts.forEach((text) => {
    const listItem = document.createElement("li");
    listItem.textContent = text;
    savedTextList.appendChild(listItem);
  });
}
