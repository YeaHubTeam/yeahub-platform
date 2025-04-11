import classNames from 'classnames';

import { Skeleton } from '@/shared/ui/Skeleton';

import { ImageWithWrapperProps } from './ImageWithWrapper';
import styles from './ImageWithWrapper.module.css';

export const ImageWithWrapperSkeleton = ({ className }: ImageWithWrapperProps) => {
	return <Skeleton className={classNames(styles.wrapper, className)} />;
};
