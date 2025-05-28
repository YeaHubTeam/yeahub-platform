import { NodeViewProps } from '@tiptap/core';

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

export function createCodeBlockNodeView(styles: Record<string, string>) {
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

		code.textContent = rawCode;
		code.classList.add('hljs');
		code.classList.add(`language-${langAttr}`);

		container.appendChild(pre);
		pre.appendChild(code);

		return {
			dom: container,
			contentDOM: code,
		};
	};
}
