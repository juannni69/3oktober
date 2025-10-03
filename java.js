// JavaScript to open/close the right side panel
document.addEventListener('DOMContentLoaded', function(){
	const openBtn = document.getElementById('open-panel');
	const closeBtn = document.getElementById('close-panel');
	const panel = document.getElementById('side-panel');
    
	// Create overlay element
	const overlay = document.createElement('div');
	overlay.className = 'overlay';
	document.body.appendChild(overlay);

		let lastFocused = null;

		function focusableElements(container){
			return Array.from(container.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'))
				.filter(el => el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement);
		}

		function openPanel(){
			lastFocused = document.activeElement;
			panel.classList.add('open');
			overlay.classList.add('show');
			document.documentElement.classList.add('no-scroll');
			document.body.classList.add('no-scroll');
			panel.setAttribute('aria-hidden', 'false');
			openBtn.setAttribute('aria-expanded', 'true');
			// move focus into the panel
			panel.focus();
			// set focus to first focusable element inside
			const focusables = focusableElements(panel);
			if(focusables.length) focusables[0].focus();
		}

		function closePanel(){
			panel.classList.remove('open');
			overlay.classList.remove('show');
			document.documentElement.classList.remove('no-scroll');
			document.body.classList.remove('no-scroll');
			panel.setAttribute('aria-hidden', 'true');
			openBtn.setAttribute('aria-expanded', 'false');
			// restore focus
			if(lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
		}

	openBtn.addEventListener('click', openPanel);
	closeBtn.addEventListener('click', closePanel);
	overlay.addEventListener('click', closePanel);

	// Close with Escape
	document.addEventListener('keydown', function(e){
		if(e.key === 'Escape' && panel.classList.contains('open')){
			closePanel();
		}
	});

		// Trap focus inside panel when open
		document.addEventListener('keydown', function(e){
			if(!panel.classList.contains('open')) return;
			if(e.key !== 'Tab') return;
			const focusables = focusableElements(panel);
			if(!focusables.length) return;
			const first = focusables[0];
			const last = focusables[focusables.length -1];
			if(e.shiftKey){
				if(document.activeElement === first){
					e.preventDefault();
					last.focus();
				}
			} else {
				if(document.activeElement === last){
					e.preventDefault();
					first.focus();
				}
			}
		});
});
