import classNames from 'classnames';

import { TextSkeleton } from '@/shared/ui/Text';

import styles from './Sticker.module.css';

interface StickerProps {
	className?: string;
	width: string | number;
}

export const StickerSkeleton = ({ className, width }: StickerProps) => {
	return (
		<div className={classNames(styles.stickerBorder, className)}>
			<TextSkeleton width={width} variant="body2" className="" />
		</div>
	);
};
