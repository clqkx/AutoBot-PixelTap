<br>

<div align="center">

[<img src="./resources/pixeltap-logo.jpg" width="144"/>](https://t.me/pixelversexyzbot)

  <h1 align="center">Auto Bot for battles in PixelTap game.</h1>
  
  <p align="center">
    <strong>The bot automatically participates in battles in the PixelTap game.</strong>
  </p>
  <img src="./resources/demo.jpg"/>

</div>

## Enable Debug Mode for Mini Apps

### Android
- **[Enable USB-Debugging](https://developer.chrome.com/docs/devtools/remote-debugging/)** on your device.
- In Telegram Settings, scroll all the way down, press and hold on the version number two times.
- Choose Enable WebView Debug in the Debug Settings.
- Connect your phone to your computer and open chrome://inspect/#devices in Chrome – you will see your Mini App there when you launch it on your phone.

### Telegram Desktop on Windows and Linux
- Download and launch the **[Beta Version](https://desktop.telegram.org/changelog#beta-version)** of Telegram Desktop on Windows or Linux (not supported on Telegram Desktop for macOS yet).
- Go to Settings > Advanced > Experimental settings > Enable webview inspection.
- Right click in the WebView and choose Inspect.

### Telegram macOS
- Download and launch the **[Beta Version](https://telegram.org/dl/macos/beta)** of Telegram macOS.
- Quickly click 5 times on the Settings icon to open the debug menu and enable “Debug Mini Apps”.

## Launch script

Follow the steps below to launch script:

1. Open the game in Telegram Web App and the web inspector of your browser. You can do this by right-clicking on the page and selecting **"Inspect"** or **"Inspect Element"** (depending on the browser).

2. Switch to the **"Console"** tab. In the console at the bottom of the page, enter the copied script and press the **Enter** key.

```
const consoleRed = 'font-weight: bold; color: red;';
const consoleGreen = 'font-weight: bold; color: green;';
const consolePrefix = '%c [AutoBot] ';

const originalConsoleLog = console.log;

console.log = function () {
  if (arguments[0].includes('[AutoBot]') || arguments[0].includes('github.com')) {
    originalConsoleLog.apply(console, arguments);
  }
};

console.error = console.warn = console.info = console.debug = function () { };

console.clear();
console.log(`${consolePrefix}Injecting...`, consoleGreen);

function clickElement(element) {
    var event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
    });
    element.dispatchEvent(event);
}

let lastClickedElement = null;
let isBattle = false;

function findAndClick() {
    const isBattle = document.querySelector('#root > div > div > div:nth-child(1) > div > div > div._battle_topbar_1b18t_1')
    if (isBattle) {
        const clickableElements = document.querySelectorAll('.clickableArea');
        if (clickableElements.length > 0) {
            clickElement(clickableElements[0]);
            lastClickedElement = clickableElements[0];
        } else if (lastClickedElement) {
            clickElement(lastClickedElement);
        }
    } else {
        const finishTextElement = document.querySelector('#root > div > div > div:nth-child(1) > div > div > h3');
        if (finishTextElement){
            const playBtn = document.querySelector('#root > div > div > div:nth-child(1) > div > div > div._footerCard_bgfdy_87 > div._buttons_bgfdy_124 > button._button_uyw8r_1._purple_uyw8r_31._textUppercase_uyw8r_28');
            const finishCoins = document.querySelector('#root > div > div > div:nth-child(1) > div > div > div._footerCard_bgfdy_87 > div._reward_bgfdy_17 > span').innerText
            console.log(`${consolePrefix}${finishCoins.includes('-') ? 'Defeat' : 'Victory'} (${finishCoins})`, finishCoins.includes('-') ? consoleRed : consoleGreen);  
            playBtn.click()
        }
    }
}

var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === 1 && node.classList.contains('clickableArea')) {
                clickElement(node);
                lastClickedElement = node;
            }
        });
    });
});

observer.observe(document.body, { childList: true, subtree: true });

setInterval(findAndClick, 100);

console.log(`${consolePrefix}Script loaded`, consoleGreen);
console.log(`${consolePrefix}Code by @clqkx`, consoleGreen);
```

### That's it! Now you can use this script for automatic battles in the PixelTap game on Telegram.

## Author

Telegram: [@clqkx](https://t.me/clqkx)
Telegram Channel: [@clqkxdev](https://t.me/clqkxdev)