const consoleStyles = { red: 'font-weight: bold; color: red;', green: 'font-weight: bold; color: green;', white: 'font-weight: bold; color: white;', prefix: '%c [AutoBot] ' };
const originalConsoleLog = console.log; console.log = function (...args) { if (args[0].includes('[AutoBot]') || args[0].includes('github.com')){originalConsoleLog.apply(console, args)}}; console.clear();
console.log(`${consoleStyles.prefix}🚀 Injecting...`, consoleStyles.green);

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const stats = { victories: 0, defeats: 0, totalCoins: 0 };
let isBattle = false;

const checkState = async () => {
    try {
        if (document.querySelector('._avatarsRow_17op1_49')) {
            return await sleep(10), await checkState();
        } else if (document.querySelector('._searchBattle_lmtrw_1')) {
            return await sleep(1000), await checkState();
        } else if (document.querySelector('._battle_zmmvw_1') && !isBattle) {
            return isBattle = true, await playBattle();
        } else if (document.querySelector('._resultContainer_bgfdy_1')) {
            const playBtn = document.querySelector('#root button._button_uyw8r_1._purple_uyw8r_31._textUppercase_uyw8r_28');
            const finishCoinsText = document.querySelector('#root ._reward_bgfdy_17 > span')?.innerText || '';
            const isVictory = !finishCoinsText.includes('-');
            if (isVictory) { stats.victories++; } else { stats.defeats++; }
            stats.totalCoins += parseInt(finishCoinsText.replace(/[^\d-]/g, ''), 10);
            console.group('Game Result'); console.log(`${consoleStyles.prefix}${isVictory ? '🎉 Victory' : '💀 Defeat'} (${finishCoinsText})`, isVictory ? consoleStyles.green : consoleStyles.red);
            console.log(`${consoleStyles.prefix}[${stats.victories} W | ${stats.defeats} L | ${stats.totalCoins >= 0 ? '+' : ''}${stats.totalCoins.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}]`, consoleStyles.white); console.groupEnd();
            await sleep(5000); if (playBtn) playBtn.click();
            return await sleep(1500), await checkState();
        }
    } catch (e) { return await sleep(1000), await checkState(); }
};

const playBattle = async () => {
    const clickableArea = document.querySelector('.clickableArea');
    if (clickableArea) { clickableArea.click() } else if (document.querySelectorAll('._card_n90wq_1').length) { document.querySelectorAll('._card_n90wq_1')[Math.floor(Math.random() * 4)].click() } else { if (!document.querySelector('._battle_zmmvw_1')) return isBattle = false, await checkState() }
    return await sleep(95), await playBattle();
};

document.addEventListener('click', function() { if (!isBattle) { checkState() }});
console.log(`${consoleStyles.prefix}📜 Script loaded`, consoleStyles.green);
console.log(`${consoleStyles.prefix}👨‍💻 Code by @clqkx`, consoleStyles.green);
