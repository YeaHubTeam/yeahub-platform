import classnames from 'classnames';
import { ReactNode } from 'react';

import styles from './Skeleton.module.css';

type SkeletonVariant = 'default' | 'blur';

interface SkeletonBlockProps {
	width?: string | number;
	height?: string | number;
	borderRadius?: string | number;
	style?: React.CSSProperties;
	className?: string;
	dataTestId?: string;
	text?: ReactNode;
	variant?: SkeletonVariant;
}

export const Skeleton = ({
	dataTestId,
	width,
	height,
	variant = 'default',
	borderRadius = '8px',
	style = {},
	className = '',
	text = '',
}: SkeletonBlockProps) => {
	return (
		<div
			data-testid={dataTestId}
			className={classnames(styles.skeleton, styles[variant], className)}
			style={{ width, height, borderRadius, ...style }}
		>
			{text}
		</div>
	);
};
