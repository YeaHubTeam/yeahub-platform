import { NodeViewProps } from '@tiptap/core';
import { Root } from 'hast';
import { toHtml } from 'hast-util-to-html';

const languageMap: Record<string, string> = {
	js: 'javascript',
	jsx: 'javascript',
	ts: 'typescript',
	py: 'python',
	rb: 'ruby',
	html: 'html',
	xml: 'html',
	csharp: 'csharp',
	cs: 'csharp',
	cpp: 'cpp',
	kt: 'kotlin',
	rs: 'rust',
	php: 'php',
	java: 'java',
	css: 'css',
	go: 'go',
	swift: 'swift',
	kotlin: 'kotlin',
	rust: 'rust',
};

type Lowlight = {
	highlight: (lang: string, code: string) => Root;
};

export function createCodeBlockNodeView(styles: Record<string, string>, lowlight: Lowlight) {
	return ({ node }: Pick<NodeViewProps, 'node'>) => {
		const container = document.createElement('div');
		container.className = styles['code-block-wrapper'];

		const pre = document.createElement('pre');
		pre.className = styles['code-block'];

		const code = document.createElement('code');
		code.classList.add('hljs');

		const rawCode = node.textContent || '';
		let langAttr = (node.attrs.language || 'plaintext').toLowerCase().trim();
		langAttr = languageMap[langAttr] || langAttr;

		let result;
		try {
			result = lowlight.highlight(langAttr, rawCode);
			code.innerHTML = toHtml(result);
			code.classList.add(`language-${langAttr}`);
		} catch {
			code.textContent = rawCode;
			code.classList.add('language-plaintext');
		}

		const header = document.createElement('div');
		header.className = styles['code-block-header'];

		const langLabel = document.createElement('span');
		langLabel.textContent = langAttr;
		langLabel.className = styles['code-block-language'];

		header.appendChild(langLabel);
		container.appendChild(header);
		container.appendChild(pre);
		pre.appendChild(code);

		return {
			dom: container,
			contentDOM: code,
		};
	};
}
