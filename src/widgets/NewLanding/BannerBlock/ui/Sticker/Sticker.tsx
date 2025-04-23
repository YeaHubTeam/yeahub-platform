import cn from 'classnames';

import { Text } from '@/shared/ui/Text';

import styles from './Sticker.module.css';

interface StickerProps {
	text: string;
	classNames?: string;
}

export const Sticker = ({ text, classNames }: StickerProps) => {
	return (
		<div className={cn(styles.sticker, classNames)}>
			<Text variant="body2" color="white-900" className={styles.text}>
				{text}
			</Text>
			{/* для мобильной версии также нет варианта текста />*/}
		</div>
	);
};
