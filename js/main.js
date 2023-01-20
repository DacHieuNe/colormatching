import {getPlay, getSecond, getListItem, getH3, getReset} from './selector.js';
import {handleListItem, assignData, assignColorItem,win,test,resetGame} from "./util.js";
export var timeRun = 40;
	
function assignCursor() {
	var listItem = getListItem();
	listItem.forEach(e => {
		e.style.cursor = "pointer";
	});
}
function resetElement() {
	let resetElement = getReset();
	resetElement.hidden = false;
}

function handleSecond() {
	if(win.length == 8) {
		let h3Element = getH3();
		h3Element.textContent = "Wow ! Bạn đã thắng !";
		resetElement();
		return;
	}
	const secondElement = getSecond();
	secondElement.textContent = `Còn lại: ${timeRun}s`;
	timeRun--;
	if(timeRun >= 0) {
		setTimeout(handleSecond, 1000);
	}else {
		let list = getListItem();
		list.forEach(e => {
			e.style.cursor = "no-drop";
		});
		let h3Element = getH3();
		h3Element.textContent = "Bạn đã thua ! hihi";
		resetElement();
	}
}
function playGame() {
	const playElement = getPlay();
	playElement.addEventListener("click", () => {
		playElement.hidden = true;
		assignCursor();	
		assignData();
		assignColorItem();
		handleSecond();
	});
}
function nextGame() {
	const nextGameElement = getReset();
	nextGameElement.addEventListener("click", () => {
		timeRun = 40;
		resetGame(nextGameElement);		
	});
}
(() => {
	playGame();
	nextGame();
	handleListItem();
})();