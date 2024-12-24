import classNames from 'classnames';

import { ColorVariant, TextVarian } from '../model/types/types';

import styles from './Text.module.css';

interface TextProps {
	variant: TextVarian;
	children: string;
	color?: ColorVariant;
	maxRows?: 1 | 2 | 3 | 4;
	textAlign?: 'left' | 'center' | 'right';
	className?: string;
}
const variantToTagMapping: Record<TextVarian, keyof JSX.IntrinsicElements> = {
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

export const Text = ({
	variant,
	color = 'black900',
	textAlign = 'left',
	maxRows,
	children,
	className,
}: TextProps) => {
	const Tag = variantToTagMapping[variant];
	return (
		<Tag
			className={classNames(
				styles[variant],
				styles[`text-${color}`],
				styles[`text-${textAlign}`],
				maxRows && styles[`text-rows-${maxRows}`],
				className,
			)}
		>
			{children}
		</Tag>
	);
};
