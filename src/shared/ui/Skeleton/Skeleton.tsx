import styles from './Skeleton.module.css';

interface SkeletonBlockProps {
	width?: string | number;
	height?: string | number;
	borderRadius?: string | number;
	style?: React.CSSProperties;
	className?: string;
	dataTestId?: string;
}

export const Skeleton = ({
	dataTestId,
	width,
	height,
	borderRadius = '8px',
	style = {},
	className = '',
}: SkeletonBlockProps) => {
	return (
		<div
			data-testid={dataTestId}
			className={`${styles.skeleton} ${className}`}
			style={{ width, height, borderRadius, ...style }}
		/>
	);
};
