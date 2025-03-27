import classnames from 'classnames';
import { forwardRef } from 'react';

import { radioClassName } from '../model/constants';
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
			<label
				ref={ref}
				className={classnames(styles[`${radioClassName}-wrapper`], className)}
				{...otherProps}
			>
				<input
					ref={inputRef}
					type="radio"
					checked={checked}
					disabled={disabled}
					className={classnames(styles[`${radioClassName}-input`], {
						[`checked-disabled`]: disabled && checked,
					})}
					onChange={onChange}
					{...inputProps}
				/>
				<div
					className={classnames(styles[radioClassName], RadioButtonClassName, {
						[styles[`${radioClassName}-checked`]]: checked,
					})}
				></div>
				{label && (
					<span className={classnames(styles[`${radioClassName}-label`], labelClassName)}>
						{label}
					</span>
				)}
			</label>
		);
	},
);

Radio.displayName = 'Radio';

Radio.defaultProps = {
	checked: false,
};
