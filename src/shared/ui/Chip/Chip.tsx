import classNames from 'classnames';
import React, { forwardRef } from 'react';

import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import styles from './Chip.module.css';
import { ChipProps } from './types';

export const Chip = forwardRef<HTMLDivElement, ChipProps>(
	(
		{
			variant = 'small',
			theme = 'primary',
			label,
			className,
			disabled,
			active,
			prefix,
			onClick,
			onDelete,
			...props
		},
		ref,
	): JSX.Element => {
		const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
			if (event.key === 'Enter' || event.key === ' ') {
				event.preventDefault();
				onClick?.();
			}
		};

		return (
			<div
				{...props}
				className={classNames(
					styles['chip-wrapper'],
					styles[variant],
					{
						[styles['chip-primary']]: theme === 'primary',
						[styles['chip-outlined']]: theme === 'outlined',
						[styles['chip-clickable']]: onClick,
						[styles['chip-disabled']]: disabled,
						[styles['chip-active']]: active,
					},
					className,
				)}
				aria-hidden={disabled}
				aria-disabled={disabled}
				onClick={!disabled ? onClick : undefined}
				onKeyDown={!disabled ? handleKeyDown : undefined}
				role="button"
				tabIndex={0}
				ref={ref}
			>
				{prefix && (
					<div className={classNames(styles['chip-prefix'], { [styles.gap]: label })}>{prefix}</div>
				)}
				{label && (
					<Text variant="body3-accent" color="black-800" className={styles['chip-label']}>
						{label}
					</Text>
				)}{' '}
				{onDelete && (
					<Icon
						className={styles['chip-delete-icon']}
						icon="closeCircle"
						size={20}
						color={disabled ? 'black-100' : 'red-600'}
						onClick={onDelete}
					/>
				)}
			</div>
		);
	},
);

Chip.displayName = 'Chip';
