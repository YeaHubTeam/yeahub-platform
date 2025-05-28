import Code from '@tiptap/extension-code';
import Strike from '@tiptap/extension-strike';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import cn from 'classnames';
import { common, createLowlight } from 'lowlight';
import { useCallback, useEffect, useRef } from 'react';
import 'highlight.js/styles/atom-one-dark.css';

import '@/shared/utils/textEditor/registerHighlightLanguages';

import { BubbleMenu } from '@/shared/ui/BubbleMenu/BubbleMenu';
import { EditorProps } from '@/shared/ui/TextEditor/types';
import { createCustomCodeBlock, normalizeHtmlContent } from '@/shared/utils/textEditor';

import styles from './TextEditor.module.css';

const lowlight = createLowlight(common);

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
					levels: [1, 2, 3, 4, 5, 6],
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
						class: styles['blockquote'],
					},
				},
			}),
			Code.configure({
				HTMLAttributes: {
					class: styles['inline-code'],
				},
			}),
			createCustomCodeBlock(styles, lowlight).configure({
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
		content: normalizeHtmlContent(data, 4),
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

	const editorContentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (editor && onReady) {
			onReady(editor);
		}
	}, [editor, onReady]);

	useEffect(() => {
		if (!editorContentRef.current) return;
		const handleTab = (e: KeyboardEvent) => {
			if (!editor) return;
			const isCode = editor.isActive('codeBlock');
			if (isCode && e.key === 'Tab') {
				e.preventDefault();
				if (e.shiftKey) {
					editor.commands.command(({ tr, state }) => {
						const { selection } = state;
						const { from } = selection;
						tr.insertText('', from - 1, from);
						return true;
					});
				} else {
					editor.commands.insertContent('\t');
				}
			}
		};
		const node = editorContentRef.current;
		node.addEventListener('keydown', handleTab);
		return () => node.removeEventListener('keydown', handleTab);
	}, [editor]);

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
				ref={editorContentRef}
				editor={editor}
				className={cn(styles['editor-content'], styles['prose-mirror'])}
			/>
		</div>
	);
};

TextEditor.displayName = 'TextEditor';
