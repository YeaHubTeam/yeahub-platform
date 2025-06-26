import Code from '@tiptap/extension-code';
import Strike from '@tiptap/extension-strike';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import cn from 'classnames';
import { TextSelection } from 'prosemirror-state';
import { useCallback, useEffect, useRef } from 'react';

import 'highlight.js/styles/atom-one-dark.css';
import { BubbleMenuEditor } from '@/shared/ui/BubbleMenuEditor/BubbleMenuEditor';
import { EditorProps } from '@/shared/ui/TextEditor/types';
import { createCustomCodeBlock, normalizeHtmlContent } from '@/shared/utils/textEditor';
import { createPastePlugin } from '@/shared/utils/textEditor/createPastePlugin';

import styles from './TextEditor.module.css';

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
			createCustomCodeBlock(styles).configure({
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
		content: normalizeHtmlContent(data),
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
			if (!editor.isActive('codeBlock') || e.key !== 'Tab') return;

			e.preventDefault();

			editor.commands.command(({ tr, state }) => {
				const { from, to } = state.selection;
				const selectedText = state.doc.textBetween(from, to, '\n');
				const lines = selectedText.split('\n');

				const updatedLines = lines.map((line) => {
					if (e.shiftKey) {
						if (line.startsWith('\t')) return line.slice(1);
						if (line.startsWith('    ')) return line.slice(4);
						return line;
					} else {
						return '\t' + line;
					}
				});

				const newText = updatedLines.join('\n');
				tr.insertText(newText, from, to);

				const delta = newText.length - selectedText.length;
				tr.setSelection(TextSelection.create(tr.doc, from, to + delta));

				return true;
			});
		};

		const node = editorContentRef.current;
		node.addEventListener('keydown', handleTab);
		return () => node.removeEventListener('keydown', handleTab);
	}, [editor]);

	useEffect(() => {
		if (editor) {
			editor.registerPlugin(createPastePlugin(editor));
		}
	}, [editor]);

	return (
		<div
			className={cn(styles['yeahub-text-editor'], className, {
				[styles['inline-prose-mirror']]: isInline,
				[styles['disabled-editor']]: disabled,
			})}
			id={String(id)}
		>
			<BubbleMenuEditor editor={editor} />
			<EditorContent
				ref={editorContentRef}
				editor={editor}
				className={cn(styles['editor-content'], styles['prose-mirror'])}
			/>
		</div>
	);
};

TextEditor.displayName = 'TextEditor';
