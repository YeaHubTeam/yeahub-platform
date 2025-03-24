import classnames from 'classnames';
import { forwardRef } from 'react';

import { TextAreaProps } from '../model/types';

import styles from './TextArea.module.css';
const compPrefix = `yeahub-textarea`;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
	({ className, state = 'default', isReadonly, disabled, ...otherProps }, ref): JSX.Element => {
		return (
			<textarea
				ref={ref}
				className={classnames(styles[compPrefix], className, {
					[styles[`${compPrefix}-error`]]: state === 'error',
					[styles[`${compPrefix}-valid`]]: state === 'valid',
					[styles[`${compPrefix}-disabled`]]: isReadonly || disabled,
				})}
				disabled={isReadonly || disabled}
				{...otherProps}
			/>
		);
	},
);

TextArea.displayName = 'TextArea';
