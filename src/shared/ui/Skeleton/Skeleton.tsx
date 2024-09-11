import styles from './Skeleton.module.css';

interface SkeletonBlockProps {
	width?: string | number;
	height?: string | number;
	borderRadius?: string | number;
	style?: React.CSSProperties;
	className?: string;
}

export const Skeleton = ({
	width = '100%',
	height = '100px',
	borderRadius = '30px',
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
