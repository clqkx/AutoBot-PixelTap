<br>

<div align="center">

[<img src="./resources/pixeltap.jpg" width="144"/>](https://t.me/pixelversexyzbot)

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
const consoleStyles = { red: 'font-weight: bold; color: red;', green: 'font-weight: bold; color: green;', white: 'font-weight: bold; color: white;', prefix: '%c [AutoBot] ' };
const originalConsoleLog = console.log; console.log = function (...args) { if (args[0].includes('[AutoBot]') || args[0].includes('github.com')){originalConsoleLog.apply(console, args)}}; console.clear();
console.log(`${consoleStyles.prefix}🚀 Injecting...`, consoleStyles.green);

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const stats = { victories: 0, defeats: 0, totalCoins: 0 };
let isBattle, isFinish = false;

const checkState = async () => {
    try {
        if (document.querySelector('._avatarsRow_17op1_49')) {
            return await sleep(10), await checkState();
        } else if (document.querySelector('._searchBattle_lmtrw_1')) {
            return await sleep(1000), await checkState();
        } else if (document.querySelector('._battle_zmmvw_1') && !isBattle) {
            return isBattle = true, await playBattle();
        } else if (document.querySelector('._resultContainer_bgfdy_1') && isFinish) {
            const playBtn = document.querySelector('#root button._button_uyw8r_1._purple_uyw8r_31._textUppercase_uyw8r_28');
            const finishCoinsText = document.querySelector('#root ._reward_bgfdy_17 > span')?.innerText || '';
            const isVictory = !finishCoinsText.includes('-');
            if (isVictory) { stats.victories++; } else { stats.defeats++; }
            stats.totalCoins += parseInt(finishCoinsText.replace(/[^\d-]/g, ''), 10);
            console.group('Game Result'); console.log(`${consoleStyles.prefix}${isVictory ? '🎉 Victory' : '💀 Defeat'} (${finishCoinsText})`, isVictory ? consoleStyles.green : consoleStyles.red);
            console.log(`${consoleStyles.prefix}[${stats.victories} W | ${stats.defeats} L | ${stats.totalCoins >= 0 ? '+' : ''}${stats.totalCoins.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}]`, consoleStyles.white); console.groupEnd();
            if (playBtn) return (isFinish = false, await sleep(5000), playBtn.click(), await sleep(1000), await checkState());
        }
    } catch (e) { return await sleep(1000), await checkState(); }
};

const playBattle = async () => {
    const clickableArea = document.querySelector('.clickableArea');
    if (clickableArea) { clickableArea.click() } else if (document.querySelectorAll('._card_n90wq_1').length) { document.querySelectorAll('._card_n90wq_1')[Math.floor(Math.random() * 4)].click() } else { if (!document.querySelector('._battle_zmmvw_1')) return isBattle = false, isFinish = true, await checkState() }
    return await sleep(95), await playBattle();
};

document.addEventListener('click', function() { if (!isBattle) { checkState() }});
console.log(`${consoleStyles.prefix}📜 Script loaded`, consoleStyles.green);
console.log(`${consoleStyles.prefix}👨‍💻 Code by @clqkx`, consoleStyles.green);
```

### That's it! Now you can use this script for automatic battles in the PixelTap game on Telegram.

## Author

Telegram: [@clqkx](https://t.me/clqkx)
Telegram Channel: [@clqkxdev](https://t.me/clqkxdev)
