import { useScreenSize } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Icon, IconName } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import styles from './NoQuestionsCard.module.css';

interface NoQuestionsCardProps {
	icon: IconName;
	text: string;
}

export const NoQuestionsCard = ({ icon, text }: NoQuestionsCardProps) => {
	const { isMobile } = useScreenSize();

	return (
		<Card className={styles.wrapper} withOutsideShadow>
			<Flex justify="center" align="center" gap="8" direction="column">
				<Icon size={isMobile ? 44 : 76} icon={icon} color="purple-700" aria-hidden="true" />
				<Text variant="body4" className={styles.text}>
					{text}
				</Text>
			</Flex>
		</Card>
	);
};
