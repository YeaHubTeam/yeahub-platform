import Clock from '@/shared/assets/icons/clockSquare.svg';
import Lock from '@/shared/assets/icons/lockKeyholeMinimalistic.svg';
import { useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './NoQuestionsCard.module.css';

interface NoQuestionsCardProps {
	icon: 'clock' | 'lock';
	text: string;
}

export const NoQuestionsCard = ({ icon, text }: NoQuestionsCardProps) => {
	const { isMobile } = useScreenSize();
	const size = isMobile ? 44 : 76;
	return (
		<Card className={styles.wrapper} withOutsideShadow>
			<Flex justify="center" align="center" gap="8" direction="column">
				{icon === 'lock' && <Lock width={size} height={size} className={styles.icon} />}
				{icon === 'clock' && <Clock width={size} height={size} className={styles.icon} />}
				<Text variant="body4" className={styles.text}>
					{text}
				</Text>
			</Flex>
		</Card>
	);
};
