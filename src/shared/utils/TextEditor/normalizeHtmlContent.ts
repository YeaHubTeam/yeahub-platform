import DOMPurify from 'dompurify';

import { normalizeIndentation } from './normalizeIndentation';

export function normalizeHtmlContent(htmlContent: string, spacesCount = 4): string {
	if (!htmlContent) return '';

	const tempDiv = document.createElement('div');
	tempDiv.innerHTML = DOMPurify.sanitize(htmlContent);

	const codeBlocks = tempDiv.querySelectorAll('pre code');

	codeBlocks.forEach((codeElement) => {
		const codeText = codeElement.textContent || '';
		if (codeText.trim()) {
			const normalizedCode = normalizeIndentation(codeText, spacesCount);
			codeElement.textContent = normalizedCode;
		}

		const preElement = codeElement.parentElement;
		if (preElement && preElement.tagName.toLowerCase() === 'pre') {
			const currentClasses = Array.from(codeElement.classList);
			const hasCodeBlockClass = currentClasses.some(
				(cls) => cls.includes('code-block') || cls.includes('TextEditor-module'),
			);

			if (hasCodeBlockClass) {
				codeElement.className = 'hljs';

				const languageClass = currentClasses.find((cls) => cls.startsWith('language-'));
				if (languageClass) {
					codeElement.classList.add(languageClass);
				}
			}

			const preClasses = Array.from(preElement.classList);
			const hasPreCodeBlockClass = preClasses.some(
				(cls) => cls.includes('code-block') || cls.includes('TextEditor-module'),
			);

			if (hasPreCodeBlockClass) {
				preElement.className = '';
			}
		}
	});

	const standaloneCodeBlocks = tempDiv.querySelectorAll('code:not(pre code)');
	standaloneCodeBlocks.forEach((codeElement) => {
		const currentClasses = Array.from(codeElement.classList);
		const hasInlineCodeClass = currentClasses.some(
			(cls) => cls.includes('inline-code') || cls.includes('TextEditor-module'),
		);

		if (hasInlineCodeClass) {
			codeElement.className = '';
		}
	});

	return tempDiv.innerHTML;
}
