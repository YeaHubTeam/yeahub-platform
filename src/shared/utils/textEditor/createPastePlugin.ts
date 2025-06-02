import { Editor } from '@tiptap/react';
import { Plugin } from 'prosemirror-state';

import { convertSpacesToTabs } from './convertSpacesToTabs';

export function createPastePlugin(editorInstance: Editor) {
	return new Plugin({
		props: {
			handlePaste(view, event, _slice) {
				const html = event.clipboardData?.getData('text/html');
				if (html) {
					return false;
				}
				const text = event.clipboardData?.getData('text/plain');
				const state = view.state;
				const { $from } = state.selection;
				const parentNodeType = $from.parent.type.name;
				if (parentNodeType === 'codeBlock') {
					return false;
				}
				if (text && text.includes('\n')) {
					event.preventDefault();
					const codeWithTabs = convertSpacesToTabs(text, 2);
					editorInstance.commands.insertContent({
						type: 'codeBlock',
						attrs: { language: 'plaintext' },
						content: [{ type: 'text', text: codeWithTabs }],
					});
					return true;
				}
				return false;
			},
		},
	});
}
