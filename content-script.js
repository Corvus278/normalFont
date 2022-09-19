window.setTimeout(main, 5000);

function main() {
	const app = new App();
	chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
		switch (request.type) {
			case 'toggleFont':
				app.toggleFont();
				sendResponse(app.fontIsChange);
				break;
			case 'getState':
				sendResponse(app.fontIsChange);
				break;
		}
	});
}

class App {
	#fontIsChange = false;

	constructor() {
		this.link = document.createElement('link');
		this.link.type = 'text/css';
		this.link.rel = 'stylesheet';
		this.link.href =
			'https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap';

		this.style = document.createElement('style');
		this.style.innerHTML = `
      * {
        font-family: Rubik, sans-serif !important;
      }
    `;
	}

	get fontIsChange() {
		return this.#fontIsChange;
	}

	addLink = () => {
		this.#fontIsChange = true;
		document.head.appendChild(this.link);
	};

	addCss = () => {
		this.#fontIsChange = true;
		document.head.appendChild(this.style);
	};

	removeLink = () => {
		this.#fontIsChange = false;
		document.head.removeChild(this.link);
	};

	removeCss = () => {
		this.#fontIsChange = false;
		document.head.removeChild(this.style);
	};

	addAll = () => {
		this.addLink();
		this.addCss();
	};

	removeAll = () => {
		this.removeLink();
		this.removeCss();
	};

	toggleFont = () => {
		this.#fontIsChange ? this.removeAll() : this.addAll();
	};
}
