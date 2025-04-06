import classnames from 'classnames';
import { forwardRef } from 'react';

import { SwitchProps } from '../model/types';

import styles from './Switch.module.css';
export const Switch = forwardRef<HTMLDivElement, SwitchProps>(
	(
		{
			checked,
			disabled = false,
			onChange,
			inputRef,
			inputProps = {},
			label,
			labelClassName,
			switchClassName,
			...otherProps
		},
		ref,
	): JSX.Element => {
		return (
			<div ref={ref} {...otherProps}>
				<label className={classnames(styles.switch, switchClassName)}>
					<input
						ref={inputRef}
						type="checkbox"
						checked={checked}
						disabled={disabled}
						className={styles['switch-input']}
						onChange={onChange}
						role="switch"
						aria-checked={checked}
						{...inputProps}
					/>
					<span className={styles['switch-slider']} />
				</label>
				{label && (
					<span className={classnames(styles['switch-label'], labelClassName)}>{label}</span>
				)}
			</div>
		);
	},
);

Switch.displayName = 'Switch';
