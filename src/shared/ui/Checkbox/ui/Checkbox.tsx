import classnames from 'classnames';
import { forwardRef } from 'react';

import { CheckboxProps } from '../model/types';

import styles from './Checkbox.module.css';

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	({ label, checked = false, disabled = false, className, ...props }, ref) => {
		return (
			<label
				className={classnames(styles['checkbox-wrapper'], className, {
					[styles.disabled]: disabled,
				})}
			>
				<input
					ref={ref}
					type="checkbox"
					className={classnames(styles.checkbox)}
					checked={checked}
					disabled={disabled}
					{...props}
				/>
				{label && <span className={styles.label}>{label}</span>}
			</label>
		);
	},
);

Checkbox.displayName = 'Checkbox';
