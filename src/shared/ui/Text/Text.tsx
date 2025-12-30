/* eslint-disable @typescript-eslint/ban-ts-comment */
import classNames from 'classnames';
import { forwardRef, ReactNode } from 'react';

import { Pallete } from '@/shared/libs';

import styles from './Text.module.css';
import { TextVariant } from './types';

export const textMaxRows = [1, 2, 3, 4] as const;

export interface TextProps {
	variant: TextVariant;
	children: ReactNode;
	color?: Pallete;
	maxRows?: (typeof textMaxRows)[number];
	className?: string;
	width?: string | number;
	isMainTitle?: boolean;
	isLimitSize?: boolean;
	isNoWrap?: boolean;
	dataTestId?: string;
}
export const variantToTagMapping: Record<TextVariant, keyof JSX.IntrinsicElements> = {
	head1: 'h1',
	head2: 'h2',
	head3: 'h3',
	head4: 'h4',
	head5: 'h5',
	body1: 'p',
	'body1-accent': 'p',
	body2: 'p',
	'body2-accent': 'p',
	'body2-strong': 'p',
	body3: 'p',
	'body3-accent': 'p',
	'body3-strong': 'p',
	body4: 'p',
	body5: 'p',
	'body5-accent': 'p',
	'body5-strong': 'p',
	'body5-capitalize': 'p',
	body6: 'p',
};

/**
 * Text component for rendering styled text content.
 * The component dynamically applies styles based on the provided props.
 *
 * @param variant - Defines the text style (e.g., `head1`, `body1`).
 * @param color - Specifies the text color from the palette (`black-900` by default).
 * @param maxRows - Limits the text to a maximum number of lines (from 1 to 4).
 * @param children - The text content to display.
 * @param className - Additional CSS classes for customization.
 */

export const Text = forwardRef(
	(
		{
			variant,
			color = 'black-900',
			maxRows,
			children,
			className,
			width,
			isMainTitle,
			isLimitSize,
			isNoWrap,
			dataTestId,
		}: TextProps,
		ref,
	) => {
		const Tag = isMainTitle ? 'h1' : variantToTagMapping[variant];
		return (
			//@ts-ignore
			<Tag
				//@ts-ignore
				ref={ref}
				data-testid={dataTestId}
				className={classNames(
					styles[variant],
					styles[`text-${color}`],
					maxRows && styles[`text-rows-${maxRows}`],
					className,
					{ [styles.limited]: isLimitSize, [styles['no-wrap']]: isNoWrap },
				)}
				style={{ width }}
			>
				{children}
			</Tag>
		);
	},
);

Text.displayName = 'Text';
