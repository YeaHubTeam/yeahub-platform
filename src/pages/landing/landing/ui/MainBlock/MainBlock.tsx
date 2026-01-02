import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './MainBlock.module.css';

interface MainBlockProps {
	questionImg: string;
	text: string;
}

export const MainBlock = ({ questionImg, text }: MainBlockProps) => {
	return (
		<Flex gap="20" direction="column" className={styles['main-block']}>
			<div className={styles['image-wrapper']}>
				<img className={styles['image']} src={questionImg} alt="quiz example" />
			</div>
			<Text variant="body3" color="white-900">
				{text}
			</Text>
		</Flex>
	);
};
