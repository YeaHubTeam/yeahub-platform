import { convertSpacesToTabs } from '@/shared/utils/textEditor/convertSpacesToTabs';

export function parseHtmlToTiptapContent(html: string) {
	const parser = new DOMParser();
	const doc = parser.parseFromString(html, 'text/html');
	const result: {
		type: string;
		attrs?: { language: string };
		content: { type: string; text: string }[];
	}[] = [];

	doc.body.childNodes.forEach((node) => {
		if (node.nodeType === Node.ELEMENT_NODE) {
			const el = node as HTMLElement;
			if (el.tagName === 'PRE' || el.tagName === 'CODE') {
				const codeText = el.textContent || '';
				if (codeText.trim()) {
					result.push({
						type: 'codeBlock',
						attrs: { language: 'plaintext' },
						content: [{ type: 'text', text: convertSpacesToTabs(codeText, 2) }],
					});
				}
			} else {
				const text = el.textContent || '';
				if (text.trim()) {
					result.push({ type: 'paragraph', content: [{ type: 'text', text }] });
				}
			}
		} else if (node.nodeType === Node.TEXT_NODE) {
			const text = node.textContent?.trim();
			if (text) {
				result.push({ type: 'paragraph', content: [{ type: 'text', text }] });
			}
		}
	});

	return result.filter(
		(block) =>
			block.content &&
			block.content.length > 0 &&
			block.content.some((c) => c.text && c.text.trim()),
	);
}
