import styles from './Skeleton.module.css';

interface SkeletonBlockProps {
	width?: string | number;
	height?: string | number;
	borderRadius?: string | number;
	style?: React.CSSProperties;
	className?: string;
}

export const Skeleton = ({
	width,
	height,
	borderRadius = '8px',
	style = {},
	className = '',
}: SkeletonBlockProps) => {
	return (
		<div
			className={`${styles.skeleton} ${className}`}
			style={{ width, height, borderRadius, ...style }}
		/>
	);
};
