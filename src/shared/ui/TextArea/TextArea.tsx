import classnames from 'classnames';
import { forwardRef } from 'react';

import { textAreaClassName } from './constants';
import { TextAreaProps } from './types';

import styles from './TextArea.module.css';

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
	({ className, state = 'default', isReadonly, disabled, ...otherProps }, ref): JSX.Element => {
		return (
			<textarea
				ref={ref}
				className={classnames(styles[textAreaClassName], className, {
					[styles[`${textAreaClassName}-error`]]: state === 'error',
					[styles[`${textAreaClassName}-valid`]]: state === 'valid',
					[styles[`${textAreaClassName}-disabled`]]: isReadonly || disabled,
				})}
				disabled={isReadonly || disabled}
				{...otherProps}
			/>
		);
	},
);

TextArea.displayName = 'TextArea';
