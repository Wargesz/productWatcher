
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
	const id = document.createElement('div');
	id.innerText = globalThis.location.href.includes('/pd/') ? globalThis.location.href.split('/pd/')[1].split('/')[0] : '';
	div.style.marginRight = '2em';
	div.append(id);
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
	if (globalThis.location.href.includes('/pd/')) {
		const data = document.createElement('button');
		data.innerText = 'Copy data';
		data.addEventListener('click', () => {
			const s = document.querySelector('h1.page-title').innerText + '\t'
				+ globalThis.location.href + '\t'
				+ Number.parseInt(document.querySelector('p.product-new-price').innerText.replaceAll('.', ''));
			navigator.clipboard.writeText(s);
		});
		div.append(data);
	} else {
		const button = document.createElement('button');
		button.addEventListener('click', () => {
			if (input.value == '') {
				alert('empty sale name');
				return;
			}

			for (const e of getItems(input.value)) {
				window.open(e.parentElement.parentElement.parentElement.parentElement.href + '?watcher=y');
			}
		});
		button.innerText = 'Open all';
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
	button.innerText = 'eval';
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
