import classNames from 'classnames';
import DOMPurify from 'dompurify';
import { toHtml } from 'hast-util-to-html';
import { common, createLowlight } from 'lowlight';
import 'highlight.js/styles/atom-one-dark.css';
import { useEffect, useRef } from 'react';

import { determineLanguage } from '@/shared/libs/utils/determineLanguage';

import styles from './TextHtml.module.css';

const lowlight = createLowlight(common);

export interface TextHtmlProps {
	html: string;
	className?: string;
	disableCodeCopy?: boolean;
}

export const TextHtml = ({ className, html, disableCodeCopy = false }: TextHtmlProps) => {
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!contentRef.current) return;

		const processCodeBlocks = () => {
			const parser = new DOMParser();
			const sanitizedHtml = DOMPurify.sanitize(html, {
				ADD_TAGS: ['pre', 'code'],
				ADD_ATTR: ['class'],
				FORBID_ATTR: ['style'],
			});
			const doc = parser.parseFromString(sanitizedHtml, 'text/html');
			const preElements = doc.querySelectorAll('pre');

			preElements.forEach((pre) => {
				const code = pre.querySelector('code');
				if (code) {
					const codeContent = code.textContent || '';
					const initialLanguage = code.className.replace('language-', '') || 'plaintext';
					const language = determineLanguage(codeContent, initialLanguage, lowlight);

					try {
						const result = lowlight.highlight(language, codeContent);
						code.innerHTML = toHtml(result);
						pre.classList.add('hljs');
						code.className = `hljs language-${language}`;

						const wrapper = document.createElement('div');
						wrapper.className = styles['code-block-wrapper'];
						wrapper.style.position = 'relative';

						if (!disableCodeCopy && !wrapper.querySelector('button')) {
							const copyButton = document.createElement('button');
							copyButton.className = styles['code-block-copy'];
							copyButton.disabled = disableCodeCopy;
							copyButton.setAttribute('data-test', 'copy-button');
							copyButton.innerHTML = `
								<div class="${styles['copy-button-content']}">
									<svg class="${styles['copy-icon']}" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
										<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
										<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
									</svg>
									<svg class="${styles['check-icon']}" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
									<span></span>
								</div>
							`;
							copyButton.onclick = () => {
								if (!copyButton.disabled) {
									navigator.clipboard.writeText(codeContent).then(() => {
										copyButton.classList.add(styles['copied']);
										setTimeout(() => {
											copyButton.classList.remove(styles['copied']);
										}, 2000);
									});
								}
							};
							wrapper.appendChild(copyButton);
						}

						const langLabel = document.createElement('span');
						langLabel.textContent = language;
						langLabel.className = styles['code-block-language'];

						const existingWrapper = pre.parentElement;
						if (existingWrapper?.classList.contains(styles['code-block-wrapper'])) {
							existingWrapper.insertBefore(wrapper, pre);
						} else {
							pre.parentNode?.insertBefore(wrapper, pre);
							wrapper.appendChild(pre);
						}
					} catch (_e) {
						const result = lowlight.highlight('plaintext', codeContent);
						code.innerHTML = toHtml(result);
						code.className = 'hljs language-plaintext';
					}
				}
			});

			if (contentRef.current) {
				contentRef.current.innerHTML = '';
				Array.from(doc.body.childNodes).forEach((node) => {
					contentRef.current?.appendChild(node);
				});
			}
		};

		processCodeBlocks();
	}, [html, disableCodeCopy]);

	return (
		<div className={classNames(styles['text-html'], className)}>
			<div ref={contentRef} className={styles.content} />
		</div>
	);
};
