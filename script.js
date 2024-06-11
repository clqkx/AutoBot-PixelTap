const consoleStyles = {
    red: 'font-weight: bold; color: red;',
    green: 'font-weight: bold; color: green;',
    prefix: '%c [AutoBot] '
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const originalConsoleLog = console.log;

['log', 'error', 'warn', 'info', 'debug'].forEach(method => {
    console[method] = function (...args) {
        if (args[0].includes('[AutoBot]') || args[0].includes('github.com')) {
            originalConsoleLog.apply(console, args);
        }
    };
});

console.clear();
console.log(`${consoleStyles.prefix}Injecting...`, consoleStyles.green);

const clickElement = element => element?.click();

let lastClickedElement = null;
let waitingGame = false;
const stats = {
    victories: 0,
    defeats: 0,
    totalCoins: 0,
    tryConnect: 0
};

const handleBattleMode = () => {
    waitingGame = false
    const superAttackCards = document.querySelectorAll('._card_n90wq_1');
    
    if (superAttackCards.length) {
        clickElement(superAttackCards[Math.floor(Math.random() * superAttackCards.length)]);
    } else {
        const clickableElement = document.querySelector('.clickableArea') || lastClickedElement;
        clickElement(clickableElement);
        lastClickedElement = clickableElement;
    }
};

const resetConnection = async () => {
    const mainButton = document.querySelector('#root > div > div > div:nth-child(1) > div > div > button');
    const claimBtn = document.querySelector('#root > div > div > div:nth-child(1) > div > div.earnContent > button');
    const navLinks = document.querySelectorAll('#root > div > div > nav > a');

    mainButton.click();
    await sleep(1500);
    navLinks[0].click();
    claimBtn.click()
    await sleep(1500);
    navLinks[2].click();
    await sleep(1500);
    mainButton.click();
};

const formatNumberWithCommas = number => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const handlePostBattle = async () => {
    const finishTextElement = document.querySelector('#root > div > div > div:nth-child(1) > div > div > h3');
    const searchTimer = document.querySelector('#root > div > div > div:nth-child(1) > div > div > button > div._timer_cjqyd_18 > div._digits_cjqyd_40');

    if (finishTextElement && !waitingGame) {
        waitingGame = true
        const playBtn = document.querySelector('#root button._button_uyw8r_1._purple_uyw8r_31._textUppercase_uyw8r_28');
        const finishCoinsText = document.querySelector('#root ._reward_bgfdy_17 > span')?.innerText || '';
        const isVictory = !finishCoinsText.includes('-');
        const finishCoins = parseInt(finishCoinsText.replace(/[^\d-]/g, ''), 10);

        if (isVictory) {
            stats.victories++;
        } else {
            stats.defeats++;
        }
        stats.totalCoins += finishCoins;

        console.log(`${consoleStyles.prefix}${isVictory ? 'Victory' : 'Defeat'} (${finishCoinsText})`, isVictory ? consoleStyles.green : consoleStyles.red);
        console.log(`${consoleStyles.prefix}[${stats.victories} W | ${stats.defeats} L | ${stats.totalCoins >= 0 ? '+' : '-'}${formatNumberWithCommas(stats.totalCoins)}]`, consoleStyles.green);

        stats.tryConnect = 0;
        await sleep(1500);
        if (playBtn) clickElement(playBtn);
    } else if (searchTimer && searchTimer.innerText === '10') {
        if (stats.tryConnect > 30) {
            stats.tryConnect = 0;
            await resetConnection();
        }
        stats.tryConnect++;
    }
};

const findAndClick = () => {
    if (document.querySelector('#root ._battle_topbar_1b18t_1')) {
        handleBattleMode();
    } else {
        handlePostBattle();
    }
};

const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1 && node.classList.contains('clickableArea')) {
                clickElement(node);
                lastClickedElement = node;
            }
        });
    });
});

observer.observe(document.body, { childList: true, subtree: true });

setInterval(findAndClick, 80);

console.log(`${consoleStyles.prefix}Script loaded`, consoleStyles.green);
console.log(`${consoleStyles.prefix}Code by @clqkx`, consoleStyles.green);
