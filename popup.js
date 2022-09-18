const changeFontButton = document.querySelector('#change-font');
const changeFontButtonTexts = {
	isFontChanged: 'Вернуть шрифт',
	isFontNormal: 'Поменять шрифт',
};

const setButtonText = textChanged => {
	if (textChanged) {
		changeFontButton.textContent = changeFontButtonTexts.isFontChanged;
	} else {
		changeFontButton.textContent = changeFontButtonTexts.isFontNormal;
	}
};

// Take text for button from client
sendMessage({ type: 'getState' }, setButtonText);

// Change player width
changeFontButton.addEventListener('click', () => {
	sendMessage({ type: 'toggleFont' }, setButtonText);
});

async function sendMessage(messageObj, cbfn = () => {}) {
	const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

	chrome.tabs.sendMessage(tab.id, messageObj, cbfn);
}
