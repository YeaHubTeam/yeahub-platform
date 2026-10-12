import classNames from 'classnames';

import { Skeleton } from '@/shared/ui/Skeleton';

import { SkeletonBlockProps } from '../Skeleton/Skeleton';

import styles from './ImageWithWrapper.module.css';

type ImageWithWrapperSkeletonProps = Pick<
	SkeletonBlockProps,
	'className' | 'width' | 'height' | 'borderRadius'
>;

export const ImageWithWrapperSkeleton = ({
	className,
	width,
	height,
	borderRadius,
}: ImageWithWrapperSkeletonProps) => {
	return (
		<Skeleton
			className={classNames(styles.wrapper, className)}
			width={width}
			height={height}
			borderRadius={borderRadius}
		/>
	);
};
