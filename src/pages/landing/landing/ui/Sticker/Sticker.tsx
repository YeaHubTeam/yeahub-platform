import classNames from 'classnames';

import { Text } from '@/shared/ui/Text';

import styles from './Sticker.module.css';

export interface StickerProps {
	text: string;
	className?: string;
}

export const Sticker = ({ text, className }: StickerProps) => {
	return (
		<div className={classNames(styles.sticker, className)}>
			<Text variant="body2" color="white-900" className={styles.text}>
				{text}
			</Text>
			{/* для мобильной версии также нет варианта текста />*/}
		</div>
	);
};
