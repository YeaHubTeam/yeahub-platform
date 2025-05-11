import { Editor } from '@tiptap/react';

import styles from './TextEditor.module.css';

export function createCopyButton(editor: Editor, code: HTMLElement): HTMLButtonElement {
	const button = document.createElement('button');
	button.className = styles['code-block-copy'];
	button.title = 'Скопировать';
	button.disabled = !editor.isEditable;
	button.setAttribute('data-test', 'copy-button');

	const copyIcon = createSvgIcon(
		styles['copy-icon'],
		`
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  `,
	);

	const checkIcon = createSvgIcon(
		styles['check-icon'],
		`
    <polyline points="20 6 9 17 4 12"></polyline>
  `,
	);
	checkIcon.style.display = 'none';

	const content = document.createElement('div');
	content.className = styles['copy-button-content'];
	content.appendChild(copyIcon);
	content.appendChild(checkIcon);

	button.appendChild(content);

	button.onclick = () => {
		if (!button.disabled) {
			navigator.clipboard.writeText(code.textContent || '').then(() => {
				button.classList.add(styles['copied']);
				copyIcon.style.display = 'none';
				checkIcon.style.display = 'block';

				setTimeout(() => {
					button.classList.remove(styles['copied']);
					copyIcon.style.display = 'block';
					checkIcon.style.display = 'none';
				}, 2000);
			});
		}
	};

	return button;
}

function createSvgIcon(className: string, inner: string): SVGSVGElement {
	const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	svg.setAttribute('class', className);
	svg.setAttribute('width', '16');
	svg.setAttribute('height', '16');
	svg.setAttribute('viewBox', '0 0 24 24');
	svg.setAttribute('fill', 'none');
	svg.setAttribute('stroke', 'currentColor');
	svg.setAttribute('stroke-width', '2');
	svg.setAttribute('stroke-linecap', 'round');
	svg.setAttribute('stroke-linejoin', 'round');
	svg.innerHTML = inner;
	return svg;
}
