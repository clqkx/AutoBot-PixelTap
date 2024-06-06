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