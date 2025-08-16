import classNames from 'classnames';

import { Skeleton } from '@/shared/ui/Skeleton';
import styles from '@/shared/ui/TextEditor/TextEditor.module.css';

import { TextEditorProps } from './TextEditor';

export const TextEditorSkeleton = ({ isInline, disabled, className }: Partial<TextEditorProps>) => {
	return (
		<div
			className={classNames(styles['yeahub-text-editor'], className, {
				[styles['inline-prose-mirror']]: isInline,
				[styles['disabled-editor']]: disabled,
			})}
		>
			<Skeleton borderRadius="16px" height="200px" className={styles['editor-content']} />
		</div>
	);
};
