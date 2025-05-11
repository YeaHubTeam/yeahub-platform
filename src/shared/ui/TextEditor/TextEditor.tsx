import { textblockTypeInputRule } from '@tiptap/core';
import Code from '@tiptap/extension-code';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Strike from '@tiptap/extension-strike';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import cn from 'classnames';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';
import { common, createLowlight } from 'lowlight';
import { useCallback, useEffect } from 'react';
import 'highlight.js/styles/atom-one-dark.css';

import { BubbleMenu } from './BubbleMenu';
import { createCopyButton } from './createCopyButton';

import './registerHighlightLanguages';

import styles from './TextEditor.module.css';
import { EditorProps } from './types';

const lowlight = createLowlight(common);

// Расширение блока кода с подсветкой и input rule
const CustomCodeBlock = CodeBlockLowlight.extend({
	addInputRules() {
		return [
			textblockTypeInputRule({
				find: /^```([a-z]*)?[\s\n]$/,
				type: this.type,
				getAttributes: (match) => ({
					language: match[1] || 'plaintext',
				}),
			}),
		];
	},

	addNodeView() {
		return ({ node, editor }) => {
			const container = document.createElement('div');
			container.className = styles['code-block-wrapper'];

			const pre = document.createElement('pre');
			pre.className = styles['code-block'];

			const code = document.createElement('code');
			code.classList.add('hljs');

			const rawCode = node.textContent || '';
			const langAttr = node.attrs.language || 'plaintext';

			let language;
			let result;

			if (hljs.getLanguage(langAttr)) {
				language = langAttr;
				result = hljs.highlight(rawCode, { language });
			} else {
				result = hljs.highlightAuto(rawCode);
				language = result.language || 'plaintext';
			}

			code.innerHTML = result.value;
			code.classList.add(`language-${language}`);

			const header = document.createElement('div');
			header.className = styles['code-block-header'];

			const langLabel = document.createElement('span');
			langLabel.textContent = language;
			langLabel.className = styles['code-block-language'];

			const copyButton = createCopyButton(editor, code);

			header.appendChild(langLabel);
			header.appendChild(copyButton);
			container.appendChild(header);
			container.appendChild(pre);
			pre.appendChild(code);

			return {
				dom: container,
				contentDOM: code,
			};
		};
	},
});

export const TextEditor = ({
	isInline = false,
	data = '',
	id,
	disabled = false,
	autofocus = false,
	className,
	onChange,
	onBlur,
	onFocus,
	onReady,
}: EditorProps) => {
	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				codeBlock: false,
				heading: {
					levels: [1, 2],
					HTMLAttributes: {
						class: styles['editor-heading'],
					},
				},
				bulletList: {
					HTMLAttributes: {
						class: styles['bullet-list'],
					},
				},
				orderedList: {
					HTMLAttributes: {
						class: styles['ordered-list'],
					},
				},
				listItem: {
					HTMLAttributes: {
						class: styles['list-item'],
					},
				},
				blockquote: {
					HTMLAttributes: {
						class: styles.blockquote,
					},
				},
			}),
			Code.configure({
				HTMLAttributes: {
					class: styles['inline-code'],
				},
			}),
			CustomCodeBlock.configure({
				lowlight,
				HTMLAttributes: {
					class: styles['code-block'],
				},
				defaultLanguage: 'plaintext',
			}),
			Underline,
			TextAlign.configure({
				types: ['heading', 'paragraph'],
			}),
			Strike,
		],
		content: DOMPurify.sanitize(data),
		editable: !disabled,
		autofocus,
		parseOptions: {
			preserveWhitespace: 'full',
		},
		onUpdate: ({ editor }: { editor: Editor }) => {
			onChange?.(editor.getHTML());
		},
		onBlur: useCallback(
			({ editor }: { editor: Editor }) => {
				onBlur?.(editor.getHTML());
			},
			[onBlur],
		),
		onFocus: useCallback(
			({ editor }: { editor: Editor }) => {
				onFocus?.(editor.getHTML());
			},
			[onFocus],
		),
	});

	useEffect(() => {
		if (editor && onReady) {
			onReady(editor);
		}
	}, [editor, onReady]);

	useEffect(() => {
		if (editor && editor.getHTML() !== data) {
			editor.commands.setContent(DOMPurify.sanitize(data));
		}
	}, [data, editor]);

	return (
		<div
			className={cn(styles['yeahub-text-editor'], className, {
				[styles['inline-prose-mirror']]: isInline,
				[styles['disabled-editor']]: disabled,
			})}
			id={String(id)}
		>
			<BubbleMenu editor={editor} />
			<EditorContent
				editor={editor}
				className={cn(styles['editor-content'], styles['prose-mirror'])}
			/>
		</div>
	);
};

TextEditor.displayName = 'TextEditor';
