import classnames from 'classnames';
import { forwardRef } from 'react';

import { textAreaClassName } from './constants';
import styles from './TextArea.module.css';
import { TextAreaProps } from './types';

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
	(
		{ className, state = 'default', isReadonly, disabled, limit, value, ...otherProps },
		ref,
	): JSX.Element => {
		const valueLength = String(value ?? '').length;

		return (
			<div className={styles.wrapper}>
				<textarea
					ref={ref}
					maxLength={limit}
					className={classnames(styles[textAreaClassName], className, {
						[styles[`${textAreaClassName}-error`]]: state === 'error',
						[styles[`${textAreaClassName}-valid`]]: state === 'valid',
						[styles[`${textAreaClassName}-disabled`]]: isReadonly || disabled,
					})}
					disabled={isReadonly || disabled}
					{...otherProps}
				/>

				{limit && (
					<div className={styles.counter}>
						{valueLength}/{limit}
					</div>
				)}
			</div>
		);
	},
);

TextArea.displayName = 'TextArea';
