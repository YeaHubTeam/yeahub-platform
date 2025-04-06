import classnames from 'classnames';
import { forwardRef } from 'react';

import { RadioProps } from '../model/types';

import styles from './Radio.module.css';

export const Radio = forwardRef<HTMLLabelElement, RadioProps>(
	(
		{
			className,
			label,
			disabled,
			checked,
			inputRef,
			inputProps,
			labelClassName,
			RadioButtonClassName,
			onChange,
			...otherProps
		},
		ref,
	): JSX.Element => {
		return (
			<label ref={ref} className={classnames(styles['radio-wrapper'], className)} {...otherProps}>
				<input
					ref={inputRef}
					type="radio"
					checked={checked}
					disabled={disabled}
					className={classnames(styles['radio-input'], {
						[`checked-disabled`]: disabled && checked,
					})}
					onChange={onChange}
					{...inputProps}
				/>
				<div
					className={classnames(styles['radio'], RadioButtonClassName, {
						[styles['radio-checked']]: checked,
					})}
				></div>
				{label && (
					<span className={classnames(styles['radio-label'], labelClassName)}>{label}</span>
				)}
			</label>
		);
	},
);

Radio.displayName = 'Radio';
