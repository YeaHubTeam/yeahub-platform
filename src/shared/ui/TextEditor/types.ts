import { Editor } from '@tiptap/react';

export interface EditorProps {
	isInline?: boolean;
	data?: string;
	id?: string | number;
	disabled?: boolean;
	config?: Record<string, unknown>;
	autofocus?: boolean;
	className?: string;
	state?: 'error' | 'default';
	onChange?: (value: string) => void;
	onBlur?: (value: string) => void;
	onFocus?: (value: string) => void;
	onReady?: (editor: Editor) => void;
}
