// const saved_codes = {
//   "www.twitch.tv": `
//   let clickedTimes = 0;
//   let timer = setInterval(() => {
//       const pointsBtn = document.querySelector("button.tw-button--success");
//       if (pointsBtn) {
//           pointsBtn.click();
//           clickedTimes++;
//           console.log(\`Clicked! \${clickedTimes}\`);
//       }
//   }, 1000);
//   `,
//   "www.youtube.com": `console.log("Hello youtube!")`
// }


// chrome.runtime.onInstalled.addListener(function() {
//   chrome.storage.sync.set(saved_codes, function() {
//     console.log('Code saved');
//   });
//   // chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//   //   chrome.declarativeContent.onPageChanged.addRules([{
//   //     conditions: [new chrome.declarativeContent.PageStateMatcher({
//   //       pageUrl: {hostEquals: 'www.twitch.tv'},
//   //     })
//   //     ],
//   //         actions: [new chrome.declarativeContent.ShowPageAction()]
//   //   }]);
//   // });
// });

chrome.tabs.onUpdated.addListener(function (tabId , info) {
  if (info.status === 'complete') {
    console.log("LOADED HA!")

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.storage.sync.get((data)=>{
        const hostname = new URL(tabs[0].url).hostname;
        if(data[hostname]){
          chrome.tabs.executeScript(
            tabs[0].id,
            {
                code: data[hostname]
              }
          );
        }
      })
    });
  }
});
