import classnames from 'classnames';
import React, { forwardRef } from 'react';

import { getTagName } from '../model/helpers';
import { ButtonProps } from '../model/types';

import styles from './Button.module.css';

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
	(
		{
			size = 'M',
			variant = 'primary',
			className = '',
			fullWidth = false,
			destructive = false,
			children,
			preffix,
			suffix,
			badge,
			...props
		},
		ref,
	): JSX.Element => {
		const tagName = getTagName(variant);

		const Component = tagName as React.ElementType;

		return (
			<Component
				ref={ref}
				className={classnames(
					styles[tagName],
					fullWidth ? styles['button-full'] : styles[`${tagName}-${size.toLowerCase()}`],
					destructive && tagName === 'a'
						? styles['a-link-destructive']
						: styles[`${tagName}-${variant}`],
					className,
				)}
				{...props}
			>
				{preffix}
				{children}
				{suffix}
				{badge && badge !== '0' ? <div className={styles['button-badge']}>{badge}</div> : null}
			</Component>
		);
	},
);

Button.displayName = 'Button';
