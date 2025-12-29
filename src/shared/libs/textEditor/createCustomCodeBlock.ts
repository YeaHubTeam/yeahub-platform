import { textblockTypeInputRule } from '@tiptap/core';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight } from 'lowlight';

import { createCodeBlockNodeView } from './createCodeBlockNodeView';

const lowlight = createLowlight();

export function createCustomCodeBlock(styles: Record<string, string>) {
	return CodeBlockLowlight.extend({
		addInputRules() {
			return [
				textblockTypeInputRule({
					find: /^```([a-z0-9+#/\\-]*)?[\s\n]$/i,
					type: this.type,
					getAttributes: (match) => ({
						language: match[1] || 'plaintext',
					}),
				}),
			];
		},

		addNodeView() {
			return createCodeBlockNodeView(styles);
		},
	}).configure({ lowlight });
}
