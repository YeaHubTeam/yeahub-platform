import { Level } from '@tiptap/extension-heading';
import { BubbleMenu as TiptapBubbleMenu, Editor } from '@tiptap/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TextEditor } from '@/shared/config/i18n/i18nTranslations';

import styles from './BubbleMenu.module.css';

interface BubbleMenuProps {
	editor: Editor | null;
}

const BubbleMenu: React.FC<BubbleMenuProps> = ({ editor }) => {
	const [showHeadings, setShowHeadings] = useState(false);
	const { t } = useTranslation();

	if (!editor) return null;

	return (
		<TiptapBubbleMenu
			className={styles['bubble-menu']}
			tippyOptions={{ duration: 100 }}
			editor={editor}
		>
			<div className={styles['bubble-menu-group']}>
				<button
					type="button"
					onClick={() => editor.chain().focus().toggleBold().run()}
					className={
						editor.isActive('bold') ? styles['bubble-button-active'] : styles['bubble-button']
					}
					title={`${t(TextEditor.BOLD)} (Ctrl+B)`}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
						<path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
					</svg>
				</button>
				<button
					type="button"
					onClick={() => editor.chain().focus().toggleItalic().run()}
					className={
						editor.isActive('italic') ? styles['bubble-button-active'] : styles['bubble-button']
					}
					title={`${t(TextEditor.ITALIC)} (Ctrl+I)`}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<line x1="19" y1="4" x2="10" y2="4"></line>
						<line x1="14" y1="20" x2="5" y2="20"></line>
						<line x1="15" y1="4" x2="9" y2="20"></line>
					</svg>
				</button>
				<button
					type="button"
					onClick={() => editor.chain().focus().toggleUnderline().run()}
					className={
						editor.isActive('underline') ? styles['bubble-button-active'] : styles['bubble-button']
					}
					title={`${t(TextEditor.UNDERLINE)} (Ctrl+U)`}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"></path>
						<line x1="4" y1="21" x2="20" y2="21"></line>
					</svg>
				</button>
				<button
					type="button"
					onClick={() => editor.chain().focus().toggleStrike().run()}
					className={
						editor.isActive('strike') ? styles['bubble-button-active'] : styles['bubble-button']
					}
					title={t(TextEditor.STRIKE)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M16 4H9a4 4 0 0 0 0 8h6a4 4 0 0 1 0 8H8" />
						<line x1="4" y1="12" x2="20" y2="12" />
					</svg>
				</button>
				<button
					type="button"
					onClick={() => editor.chain().focus().toggleCode().run()}
					className={
						editor.isActive('code') ? styles['bubble-button-active'] : styles['bubble-button']
					}
					title={t(TextEditor.CODE_INLINE)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<polyline points="16 18 22 12 16 6"></polyline>
						<polyline points="8 6 2 12 8 18"></polyline>
					</svg>
				</button>
			</div>

			<div className={styles['bubble-menu-group']}>
				<button
					type="button"
					onClick={() => editor.chain().focus().setTextAlign('left').run()}
					className={
						editor.isActive({ textAlign: 'left' })
							? styles['bubble-button-active']
							: styles['bubble-button']
					}
					title={t(TextEditor.ALIGN_LEFT)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<line x1="21" y1="6" x2="3" y2="6"></line>
						<line x1="15" y1="10" x2="3" y2="10"></line>
						<line x1="21" y1="14" x2="3" y2="14"></line>
						<line x1="15" y1="18" x2="3" y2="18"></line>
					</svg>
				</button>
				<button
					type="button"
					onClick={() => editor.chain().focus().setTextAlign('center').run()}
					className={
						editor.isActive({ textAlign: 'center' })
							? styles['bubble-button-active']
							: styles['bubble-button']
					}
					title={t(TextEditor.ALIGN_CENTER)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<line x1="21" y1="6" x2="3" y2="6"></line>
						<line x1="18" y1="10" x2="6" y2="10"></line>
						<line x1="21" y1="14" x2="3" y2="14"></line>
						<line x1="18" y1="18" x2="6" y2="18"></line>
					</svg>
				</button>
				<button
					type="button"
					onClick={() => editor.chain().focus().setTextAlign('right').run()}
					className={
						editor.isActive({ textAlign: 'right' })
							? styles['bubble-button-active']
							: styles['bubble-button']
					}
					title={t(TextEditor.ALIGN_RIGHT)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<line x1="21" y1="10" x2="7" y2="10"></line>
						<line x1="21" y1="6" x2="3" y2="6"></line>
						<line x1="21" y1="14" x2="3" y2="14"></line>
						<line x1="21" y1="18" x2="7" y2="18"></line>
					</svg>
				</button>
			</div>

			<div className={styles['bubble-menu-group']}>
				<button
					type="button"
					onClick={() => setShowHeadings(!showHeadings)}
					className={styles['bubble-button']}
					title={t(TextEditor.HEADINGS)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M4 12h8"></path>
						<path d="M4 18V6"></path>
						<path d="M12 18V6"></path>
						<path d="M21 18h-4c-.5 0-1-.2-1.4-.6-.4-.4-.6-.9-.6-1.4V7c0-.5.2-1 .6-1.4C16 5.2 16.5 5 17 5h4"></path>
					</svg>
				</button>

				{showHeadings && (
					<div className={styles['heading-dropdown']}>
						{[1, 2].map((level) => (
							<button
								key={level}
								type="button"
								onClick={() => {
									editor
										.chain()
										.focus()
										.toggleHeading({ level: level as Level })
										.run();
									setShowHeadings((prev) => !prev);
								}}
								className={
									editor.isActive('heading', { level: level as Level })
										? styles['bubble-button-active']
										: styles['bubble-button']
								}
							>
								H{level}
							</button>
						))}
					</div>
				)}
			</div>

			<div className={styles['bubble-menu-group']}>
				<button
					type="button"
					onClick={() => editor.chain().focus().toggleBlockquote().run()}
					className={
						editor.isActive('blockquote') ? styles['bubble-button-active'] : styles['bubble-button']
					}
					title={t(TextEditor.BLOCKQUOTE)}
				>
					{'" "'}
				</button>
				<button
					type="button"
					onClick={() => {
						const isActive = editor.isActive('codeBlock');
						const command = editor.chain().focus();

						if (isActive) {
							command.toggleCodeBlock().run();
						} else {
							command.setNode('codeBlock', { language: 'typescript' }).run();
						}
					}}
					className={
						editor.isActive('codeBlock') ? styles['bubble-button-active'] : styles['bubble-button']
					}
					title={t(TextEditor.CODE_BLOCK)}
				>
					{'</>'}
				</button>
			</div>

			<div className={styles['bubble-menu-group']}>
				<button
					type="button"
					onClick={() => editor.chain().focus().undo().run()}
					disabled={!editor.can().undo()}
					className={styles['bubble-button']}
					title={`${t(TextEditor.UNDO)} (Ctrl+Z)`}
				>
					↺
				</button>
				<button
					type="button"
					onClick={() => editor.chain().focus().redo().run()}
					disabled={!editor.can().redo()}
					className={styles['bubble-button']}
					title={`${t(TextEditor.REDO)} (Ctrl+Y)`}
				>
					↻
				</button>
			</div>

			<div className={styles['bubble-menu-group']}>
				<button
					type="button"
					onClick={() => editor.chain().focus().toggleBulletList().run()}
					className={
						editor.isActive('bulletList') ? styles['bubble-button-active'] : styles['bubble-button']
					}
					title={t(TextEditor.BULLET_LIST)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<line x1="8" y1="6" x2="21" y2="6"></line>
						<line x1="8" y1="12" x2="21" y2="12"></line>
						<line x1="8" y1="18" x2="21" y2="18"></line>
						<circle cx="3" cy="6" r="1"></circle>
						<circle cx="3" cy="12" r="1"></circle>
						<circle cx="3" cy="18" r="1"></circle>
					</svg>
				</button>
				<button
					type="button"
					onClick={() => editor.chain().focus().toggleOrderedList().run()}
					className={
						editor.isActive('orderedList')
							? styles['bubble-button-active']
							: styles['bubble-button']
					}
					title={t(TextEditor.ORDERED_LIST)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<line x1="10" y1="6" x2="21" y2="6"></line>
						<line x1="10" y1="12" x2="21" y2="12"></line>
						<line x1="10" y1="18" x2="21" y2="18"></line>
						<path d="M4 6h1v4"></path>
						<path d="M4 10h2"></path>
						<path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path>
					</svg>
				</button>
			</div>
		</TiptapBubbleMenu>
	);
};

export { BubbleMenu };
