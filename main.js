
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
		const data = document.createElement('button');
		data.innerText = 'Akció másol';
		data.addEventListener('click', () => {
			const s = document.querySelector('h1.page-title').innerText + '\t'
				+ globalThis.location.href + '\t'
				+ Number.parseInt(document.querySelector('p.product-new-price').innerText.replaceAll('.', ''));
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
			console.log(s);
			navigator.clipboard.writeText(s);
		});
		div.append(pairing);
	} else {
		const counter = document.createElement('div');
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
		console.log(e.alt.split(' ')[0].toLowerCase());
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

function start() {
	if (globalThis.location.href.includes('emag.hu')) {
		emag();
	}

	if (globalThis.location.href.includes('arukereso.hu')) {
		arukereso();
	}
}

start();
