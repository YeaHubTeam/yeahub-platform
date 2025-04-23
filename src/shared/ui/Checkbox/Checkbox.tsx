import classnames from 'classnames';
import { forwardRef } from 'react';

import styles from './Checkbox.module.css';
import { CheckboxProps } from './types';

/**
 * Checkbox component for selecting states (checked/unchecked).
 *
 * @param {string} label - Text label displayed next to the checkbox.
 * @param {boolean} disabled - Disables the checkbox, making it inactive.
 * @param {string} className - Additional CSS class.  .
 */

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
