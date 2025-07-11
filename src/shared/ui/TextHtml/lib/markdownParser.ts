const restoreMarkdownFormatting = (text: string): string => {
	const codeBlocks: string[] = [];
	text = text.replace(/```[\s\S]*?```/g, (m) => {
		codeBlocks.push(m);
		return `%%CODEBLOCK${codeBlocks.length - 1}%%`;
	});

	const cleaned = text
		.replace(/\\([\\`*_{}\\[\]()#+\-.!~|])/g, '$1')
		.replace(/\n{3,}/g, '\n\n')
		.replace(/^(\s*)[-*+]\s/gm, '$1- ')
		.replace(/^#+\s/gm, (m) => m.trim() + ' ');

	return cleaned.replace(/%%CODEBLOCK(\d+)%%/g, (_, i) => codeBlocks[+i]);
};

const escapeHtml = (unsafe: string): string => {
	return unsafe
		.replace(/&/g, '&amp;')
		.replace(/[<>]/g, (c) => (c === '<' ? '&lt;' : '&gt;'))
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
};

export const markdownToHtml = (text: string): string => {
	if (!text) return '';

	const restored = restoreMarkdownFormatting(text);
	const isBlockElement = (s: string) => /^<(pre|code|ul|ol|li|blockquote|hr|h[1-6])/.test(s.trim());

	let processed = restored.replace(/```(\w*)\n([\s\S]*?)\n```/g, (_, lang, code) => {
		const preservedCode = code.replace(/\n/g, '%%NEWLINE%%');
		return `%%CODEBLOCK%%<pre><code class="language-${lang || 'plaintext'}">${escapeHtml(preservedCode)}</code></pre>%%CODEBLOCK%%`;
	});

	processed = processed
		.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
		.replace(/^(#+)\s(.+)$/gm, (_, p1, p2) => `<h${p1.length}>${p2}</h${p1.length}>`)
		.replace(/^-\s(.+)$/gm, '<ul><li>$1</li></ul>')
		.replace(/^\d+\.\s(.+)$/gm, '<ol><li>$1</li></ol>')
		.replace(/^>\s(.+)$/gm, '<blockquote>$1</blockquote>')
		.replace(/^[-*_]{3,}$/gm, '<hr>')
		.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
		.replace(/\*(.+?)\*/g, '<em>$1</em>')
		.replace(/<\/ul>\s*<ul>|<\/ol>\s*<ol>/g, '')
		.replace(/<\/li>\s*<li>/g, '</li><li>')
		.replace(/^([^<\n].+)$/gm, (m) => {
			if (isBlockElement(m) || !m.trim() || m.includes('%%CODEBLOCK%%')) {
				return m;
			}
			return `<p>${m}</p>`;
		});

	processed = processed.replace(/%%CODEBLOCK%%([\s\S]*?)%%CODEBLOCK%%/g, (_, codeBlock) => {
		return codeBlock.replace(/%%NEWLINE%%/g, '\n');
	});

	return processed;
};
