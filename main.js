let highlightSemaphore = false;

function emag() {
	if (globalThis.location.href.includes('watcher=y')) {
		const vendor = document.querySelector('div.product-page-pricing.product-highlight div.fs-14.fw-semibold.mt-2').innerText;
		if (vendor != 'Forgalmazza a(z): eMAG' && !vendor.toLowerCase().includes('tefal')) {
			window.close();
			return;
		}

		globalThis.location = globalThis.location.href.replace('?watcher=y', '');
	}

	const div = document.createElement('div');
	div.style.position = 'fixed';
	div.style.left = 0;
	div.style.bottom = '50%';
	if (globalThis.location.href.includes('/pd/')) {
		determinePrice();
		const data = document.createElement('button');
		data.innerText = 'Akció másol';
		data.addEventListener('click', () => {
			const s = document.querySelector('h1.page-title').innerText + '\t'
				+ globalThis.location.href + '\t'
				+ Number.parseInt(document.querySelector('.watcher-price').innerText.replaceAll('.', ''));
			navigator.clipboard.writeText(s);
		});
		div.append(data);
		const pairing = document.createElement('button');
		pairing.innerText = 'Párosítás másol';
		pairing.addEventListener('click', () => {
			const rawBrand = document.querySelector('div.disclaimer-section.my-5 > p > a').innerText.toLowerCase();
			const brand = rawBrand[0].toUpperCase() + rawBrand.slice(1);
			const re = new RegExp(`(${brand}[, ])|(${brand.toUpperCase()}[, ])`, 'g');
			const s = brand + '\t' + document.querySelector('h1.page-title').innerText.replace(re, '') + '\t'
				+ globalThis.location.href.split('/pd/')[1].split('/')[0];
			navigator.clipboard.writeText(s);
		});
		div.append(pairing);
	} else {
		const observer = new MutationObserver(() => {
			if (!highlightSemaphore) {
				highlightSemaphore = true;
				highlightEmagProducts();
				const input = document.querySelector('input#watcher');
				if (input.value == '') {
					return;
				}

				document.querySelector('div#watcher-count').innerText = getItems(input.value).length;
			}
		});

		observer.observe(document.querySelector('#card_grid'), {
			childList: true,
		});
		const counter = document.createElement('div');
		counter.id = 'watcher-count';
		counter.innerText = 0;
		div.append(counter);
		const input = document.createElement('input');
		input.placeholder = 'akció neve';
		input.id = 'watcher';
		input.style.display = 'block';
		input.addEventListener('input', () => {
			if (input.value == '') {
				return;
			}

			counter.innerText = getItems(input.value).length;
		});
		div.append(input);
		const button = document.createElement('button');
		button.addEventListener('click', () => {
			if (input.value == '') {
				alert('nem adtál meg akció nevet');
				return;
			}

			for (const e of getItems(input.value)) {
				window.open(e.parentElement.parentElement.parentElement.parentElement.href + '?watcher=y');
			}
		});
		button.innerText = 'Mind megnyit';
		div.append(button);
	}

	document.querySelector('body').append(div);
	highlightEmagProducts();
}

function getItems(keyword) {
	const a = [];
	for (const e of document.querySelectorAll('div.page-container span.badge span')) {
		e.innerText.toLowerCase().includes(keyword.toLowerCase()) ? a.push(e) : 0;
	}

	return a;
}

function arukereso() {
	const div = document.createElement('div');
	div.style.position = 'fixed';
	div.style.left = 0;
	div.style.bottom = '50%';
	div.id = 'producter';
	const button = document.createElement('button');
	button.addEventListener('click', evalProduts);
	button.innerText = 'Mind megnyit';
	div.append(button);
	document.querySelector('body').append(div);
	const sites = 'alza.hu emag mediamarkt euronics.hu auchan pepita.hu bestbyte';
	let has = false;
	for (const e of document.querySelectorAll('.col-logo img.logo-host')) {
		if (sites.includes(e.alt.split(' ')[0].toLowerCase())) {
			e.parentElement.parentElement.parentElement.style.border = '0.4em solid blue';
			has = true;
		}
	}

	if (globalThis.location.href.includes('?watcher=y') && document.querySelector('.col-logo img') && !has) {
		window.close();
	}
}

function evalProduts() {
	for (const item of document.querySelectorAll('.product-box-container a.image')) {
		window.open(item.href + '?watcher=y');
	}
}

function determinePrice() {
	setTimeout(() => {
		const voucher = document.querySelector('form.main-product-form div[data-voucher]');
		if (voucher) {
			const originalPrice = Number.parseInt(document.querySelector('form.main-product-form p.product-new-price').innerText.replaceAll('.', ''));
			const percent = Number.parseInt(JSON.parse(voucher.dataset.voucher).name.split('%')[0].split('-')[1]);
			const salePrice = Math.floor(originalPrice * (100 - percent) / 100);
			const div = document.createElement('p');
			div.innerText = 'Kupon ár:';
			const p = document.createElement('p');
			p.classList.add('watcher-price');
			p.innerText = salePrice;
			div.append(p);
			document.querySelector('form.main-product-form p.product-new-price').append(div);
		} else {
			document.querySelector('form.main-product-form p.product-new-price').classList.add('watcher-price');
		}
	}, 3000);
}

function highlightEmagProducts() {
	setTimeout(() => {
		for (const card of document.querySelectorAll('.page-container .card-v2')) {
			(async () => {
				const parser = new DOMParser();
				const r = await fetch(card.querySelector('a').href);
				const t = await r.text();
				const virtualDoc = parser.parseFromString(t, 'text/html');
                const vendor = virtualDoc.querySelector('.highlight-box div.product-page-pricing.product-highlight div.fs-14.fw-semibold.mt-2').innerText.toLowerCase().replace(/(\n|\t| )/g, '');
				card.style.border = vendor.includes('forgalmazzaa(z):emag') ? '0.4em solid blue' : 'thin solid gray';
			})();
		}
	}, 2000);
	highlightSemaphore = false;
}

function start() {
	if (globalThis.location.href.includes('emag.hu')) {
		emag();
	}

	if (globalThis.location.href.includes('arukereso.hu')) {
		arukereso();
	}
}

start();
