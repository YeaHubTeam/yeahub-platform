import classnames from 'classnames';
import React, { forwardRef } from 'react';

import { ButtonProps } from '../types';

import css from './UiButton.module.css';

export const UiButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
	(
		{
			size = 'M',
			variant = 'primary',
			className = '',
			fullWidth = false,
			children,
			preffix,
			suffix,
			tagName = 'button',
			badge,
			...props
		},
		ref,
	): JSX.Element => {
		const Component = tagName as React.ElementType;

		return (
			<Component
				ref={ref}
				className={classnames(
					css[tagName],
					fullWidth ? css['button-full'] : css[`button-${size.toLowerCase()}`],
					css[`${tagName}-${variant}`],
					className,
				)}
				{...props}
			>
				{preffix}
				{children && <span className={css['button-children']}>{children}</span>}
				{suffix}
				{(badge || badge === 0) && <div className={css['button-badge']}>{badge}</div>}
			</Component>
		);
	},
);

UiButton.displayName = 'UiButton';
