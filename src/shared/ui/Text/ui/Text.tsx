import classNames from 'classnames';

import styles from './Text.module.css';
interface TextProps {
	size?: 'h1' | 'h2' | 'h3' | 'large' | 'medium' | 'small';
	color?: string;
	maxRows?: 1 | 2 | 3 | 4;
	textAlign?: 'left' | 'center' | 'right';
	className?: string;
	fontWeight?: 400 | 500 | 600 | 700 | 800 | 900;
	children: string;
}
export const Text = ({
	size = 'large',
	color = 'black900',
	maxRows,
	textAlign = 'left',
	className,
	fontWeight = 400,
	children,
}: TextProps) => {
	const Tag = size === 'h1' ? 'h1' : size === 'h2' ? 'h2' : size === 'h3' ? 'h3' : 'p';
	const classes = classNames(
		styles.text,
		styles[`text-${size}`],
		styles[`text-${color}`],
		styles[`text-align-${textAlign}`],
		styles[`text-weight-${fontWeight}`],
		{ [styles[`text-clamp-${maxRows}`]]: maxRows },
		className,
	);
	return <Tag className={classes}>{children}</Tag>;
};
