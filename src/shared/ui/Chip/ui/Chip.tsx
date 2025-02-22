import cn from 'classnames';
import React, { forwardRef } from 'react';
import { Icon } from 'yeahub-ui-kit';

import { ChipProps } from '../model/types';

import styles from './Chip.module.css';

export const Chip = forwardRef<HTMLDivElement, ChipProps>(
	(
		{ theme = 'primary', label, className, disabled, active, prefix, onClick, onDelete, ...props },
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
				className={cn(
					styles['chip-wrapper'],
					{
						[styles['chip-primary']]: theme === 'primary',
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
				{prefix && <div className={styles['chip-prefix']}>{prefix}</div>}
				{label && <span className={styles['chip-label']}>{label}</span>}{' '}
				{onDelete && (
					<Icon
						className={styles['chip-delete-icon']}
						icon="xCircle"
						size={20}
						color={disabled ? '--palette-ui-black-100' : '--palette-ui-red-600'}
						onClick={onDelete}
					/>
				)}
			</div>
		);
	},
);

Chip.displayName = 'Chip';
