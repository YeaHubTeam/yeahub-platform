import classnames from 'classnames';
import { forwardRef } from 'react';

import { Flex } from '@/shared/ui/Flex';

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
			<Flex align="center" ref={ref} {...otherProps}>
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
			</Flex>
		);
	},
);

Switch.displayName = 'Switch';
