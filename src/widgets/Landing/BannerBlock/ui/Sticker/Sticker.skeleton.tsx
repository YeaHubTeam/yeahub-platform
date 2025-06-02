import classNames from 'classnames';

import { Skeleton } from '@/shared/ui/Skeleton';

import { StickerProps } from './Sticker';
import styles from './Sticker.module.css';

export const StickerSkeleton = ({
	className,
	width,
}: Partial<StickerProps> & { width: string | number }) => {
	return (
		<Skeleton
			width={width}
			height={25}
			borderRadius="40px"
			style={{ boxShadow: 'none' }}
			className={classNames(styles.sticker, className)}
		/>
	);
};
