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

async function saveText(text) {

  // send to chat 
  const apiKey = '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';
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      prompt: text,
      max_tokens: 50,  // Adjust as needed
    }),
  });

  const data = await response.json();
  console.log(`HTTP error! Status: ${response.status}`)
  const chatGptResponse = data.choices[0]?.text || 'No response from ChatGPT';

  // Optionally, you can do something with the ChatGPT response, such as log it or display it.
  console.log('ChatGPT Response:', chatGptResponse);

  // Notify the popup to update with the latest saved texts

  savedTexts.push(chatGptResponse);
  chrome.runtime.sendMessage({ action: "updatePopup", texts: savedTexts });

  // chrome.runtime.sendMessage({ action: "updatePopup", texts: savedTexts });
}
