import classnames from 'classnames';
import { forwardRef } from 'react';

import { CheckboxProps } from '../model/types';

import styles from './Checkbox.module.css';

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	({ label, className, ...props }, ref) => {
		return (
			<label
				className={classnames(styles['checkbox-wrapper'], className, {
					[styles.disabled]: props.disabled,
				})}
			>
				<input ref={ref} type="checkbox" className={classnames(styles.checkbox)} {...props} />
				{label && <span className={styles.label}>{label}</span>}
			</label>
		);
	},
);

Checkbox.displayName = 'Checkbox';
