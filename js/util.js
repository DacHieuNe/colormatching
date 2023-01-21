import {getList,getListItem,getH3,getSecond,getPlay} from "./selector.js";
import {timeRun} from "./main.js";

export function assignData() {
	var listItem = getListItem();
	listItem.forEach((e,i) => {
		e.dataset.id = i + 1;
	});
}
function RandomColor() {
	return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
export var test = [];
export var win = [];
export function resetGame(nextGameElement) {
	let h3Element = getH3();
	nextGameElement.hidden = true;
	let secondElement = getSecond();
	secondElement.textContent = "";
	h3Element.textContent = "";
	let playGame = getPlay();
	playGame.hidden = false;
	let listItem = getListItem();
	listItem.forEach(e => {
		e.classList.remove("not-effect");
		e.classList.remove("effect");
		delete e.dataset.id;
		e.style.color = "";
		e.style.cursor = "initial";
	});
	test = [];
	win = [];
}
export function assignColorItem() {
	var colorRandom = [];
	for(let i = 0;i < 8;i++) {
		let a = RandomColor();
		while(a.length < 7) {
			a = RandomColor();
		}
		colorRandom.push(a);
	}
	console.log(colorRandom);
	var set = new Set();
	while(set.size != 16) {
		set.add(Math.floor(Math.random() * 16 + 0));
	}
	set = Array.from(set);
	var listItem = getListItem();
	var setSlice = Array.from({length: 8}, (_, i) => set.slice(i*2, i*2+2));
	setSlice.forEach((e,i) => {
		console.log(colorRandom[i]);
		console.log(listItem[e[0]]);
		listItem[e[0]].style.color = colorRandom[i];
		listItem[e[1]].style.color = colorRandom[i];
	});
}
function deleteColor(first,second) {
	if(first.style.color != second.style.color) {
		first.classList.remove("effect");
		first.classList.add("not-effect");
		second.classList.remove("effect");
		second.classList.add("not-effect");
	}else {
		document.body.style.backgroundColor = first.style.color;
		win.push(1);
	}
	test = [];
}
export function handleListItem() { 
	var listElement = getList();
	listElement.addEventListener("click", (event) => {
		var playGame = getPlay();
		if(event.target.tagName != "LI" || !playGame.hidden || win.length == 8 || timeRun < 0 || test.length == 2 || /\seffect/g.test(event.target.className)) {
			return;
		}
		test.push(event.target.dataset.id);
		event.target.classList.remove("not-effect");
		event.target.classList.add("effect");
		if(test.length == 2) {
			let first = listElement.querySelector(`li:nth-child(${test[0]})`);
			let second = listElement.querySelector(`li:nth-child(${test[1]})`);
			setTimeout(() => {
				deleteColor(first,second);
			}, 250);
		}
	});
}
