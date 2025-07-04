import { Editor } from '@tiptap/react';
import { Plugin } from 'prosemirror-state';

export function createPastePlugin(editorInstance: Editor) {
	return new Plugin({
		props: {
			handlePaste(view, event) {
				const html = event.clipboardData?.getData('text/html');
				if (html) {
					return false;
				}

				const text = event.clipboardData?.getData('text/plain');
				if (!text) return false;

				const { $from } = view.state.selection;
				const parentNodeType = $from.parent.type.name;
				if (parentNodeType === 'codeBlock') {
					return false;
				}

				if (text.match(/^```[\s\S]*```$/)) {
					event.preventDefault();
					const codeContent = text.replace(/^```(\w*)?\n?|\n```$/g, '');
					editorInstance.commands.insertContent({
						type: 'codeBlock',
						attrs: { language: 'plaintext' },
						content: [{ type: 'text', text: codeContent }],
					});
					return true;
				}

				if (text.match(/^#+\s.+/m)) {
					return false;
				}

				if (text.includes('\n')) {
					event.preventDefault();

					const cleanText = text
						.replace(/^plaintext\b|\bplaintext$/gi, '')
						.replace(/^```|```$/g, '')
						.trim();

					editorInstance.commands.insertContent(cleanText);
					return true;
				}

				return false;
			},
		},
	});
}
