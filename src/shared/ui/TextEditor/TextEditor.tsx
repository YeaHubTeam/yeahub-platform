import TextAlign from '@tiptap/extension-text-align';
import { CharacterCount } from '@tiptap/extensions';
import { TextSelection } from '@tiptap/pm/state';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import classNames from 'classnames';
import { useEffect, useMemo, useRef } from 'react';

import 'highlight.js/styles/atom-one-dark.css';
import { createCustomCodeBlock, normalizeHtmlContent, createPastePlugin } from '@/shared/libs';
import { BubbleMenuEditor } from '@/shared/ui/BubbleMenuEditor';

import styles from './TextEditor.module.css';

const PARSE_OPTIONS = { preserveWhitespace: 'full' as const };

export interface TextEditorProps {
	isInline?: boolean;
	data?: string;
	id?: string | number;
	limit?: number;
	disabled?: boolean;
	config?: Record<string, unknown>;
	autofocus?: boolean;
	className?: string;
	onChange?: (value: string) => void;
	onBlur?: (value: string) => void;
	onFocus?: (value: string) => void;
	onReady?: (editor: Editor) => void;
}

export const TextEditor = ({
	isInline = false,
	data = '',
	id,
	limit,
	disabled = false,
	autofocus = false,
	className,
	onChange,
	onBlur,
	onFocus,
	onReady,
}: TextEditorProps) => {
	const onChangeRef = useRef(onChange);
	const onBlurRef = useRef(onBlur);
	const onFocusRef = useRef(onFocus);
	const lastEmittedHtml = useRef<string | null>(null);

	onChangeRef.current = onChange;
	onBlurRef.current = onBlur;
	onFocusRef.current = onFocus;

	const initialContent = useRef(normalizeHtmlContent(data));

	const extensions = useMemo(
		() => [
			StarterKit.configure({
				codeBlock: false,
				link: false,
				code: {
					HTMLAttributes: {
						class: styles['inline-code'],
					},
				},
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
			createCustomCodeBlock(styles).configure({
				HTMLAttributes: {
					class: styles['code-block'],
				},
				defaultLanguage: 'plaintext',
			}),
			TextAlign.configure({
				types: ['heading', 'paragraph'],
			}),
			...(limit ? [CharacterCount.configure({ limit })] : []),
		],
		[limit],
	);

	const editorProps = useMemo(
		() => ({
			attributes: {
				class: styles['prose-mirror'],
			},
		}),
		[],
	);

	const editor = useEditor({
		shouldRerenderOnTransaction: true,
		extensions,
		editorProps,
		content: initialContent.current,
		editable: !disabled,
		autofocus,
		parseOptions: PARSE_OPTIONS,
		onUpdate: ({ editor }: { editor: Editor }) => {
			const html = editor.getHTML();
			lastEmittedHtml.current = html;
			onChangeRef.current?.(html);
		},
		onBlur: ({ editor }: { editor: Editor }) => {
			onBlurRef.current?.(editor.getHTML());
		},
		onFocus: ({ editor }: { editor: Editor }) => {
			onFocusRef.current?.(editor.getHTML());
		},
		onCreate({ editor }) {
			editor.registerPlugin(createPastePlugin(editor));

			editor.on('focus', () => {
				const view = editor.view;
				view.dom.style.outline = 'none';
				view.dom.style.boxShadow = 'none';
			});
		},
	});

	const editorContentRef = useRef<HTMLDivElement>(null);

	const textLength = editor?.getText().length || 0;

	useEffect(() => {
		if (editor && onReady) {
			onReady(editor);
		}
	}, [editor, onReady]);

	useEffect(() => {
		if (!editor || editor.isDestroyed) return;

		editor.setEditable(!disabled, false);
	}, [disabled, editor]);

	useEffect(() => {
		if (!editor || editor.isDestroyed) return;

		const next = normalizeHtmlContent(data);
		if (next === lastEmittedHtml.current || next === editor.getHTML()) return;

		editor.commands.setContent(next, { emitUpdate: false });
	}, [data, editor]);

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

	return (
		<div
			className={classNames(styles['yeahub-text-editor'], className, {
				[styles['inline-prose-mirror']]: isInline,
				[styles['disabled-editor']]: disabled,
			})}
			id={String(id)}
		>
			<BubbleMenuEditor editor={editor} />
			<EditorContent ref={editorContentRef} editor={editor} className={styles['editor-content']} />
			{limit && (
				<div className={styles.counter}>
					{textLength}/{limit}
				</div>
			)}
		</div>
	);
};

TextEditor.displayName = 'TextEditor';
