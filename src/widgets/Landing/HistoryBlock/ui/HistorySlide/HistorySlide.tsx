import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './HistorySlide.module.css';
interface HistorySlideProps {
	src: string;
	alt: string;
	text: string;
}

export const HistorySlide = ({ src, alt, text }: HistorySlideProps) => {
	return (
		<Flex justify="center" align="center" className={styles['slide-item']}>
			<Flex direction="column" justify="center" align="center" className={styles['slide-card']}>
				<img className={styles['slide-image']} src={src} alt={alt} />
				<Text variant="body3" className={styles['slide-text']}>
					{text}
				</Text>
			</Flex>
		</Flex>
	);
};
