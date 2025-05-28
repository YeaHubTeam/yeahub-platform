import { textblockTypeInputRule } from '@tiptap/core';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { type Root } from 'hast';

import { createCodeBlockNodeView } from './createCodeBlockNodeView';

type LowlightType = {
	highlight: (lang: string, code: string) => Root;
	registered: (lang: string) => boolean;
};

export function createCustomCodeBlock(styles: Record<string, string>, lowlight: LowlightType) {
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
			return createCodeBlockNodeView(styles, lowlight);
		},
	});
}
