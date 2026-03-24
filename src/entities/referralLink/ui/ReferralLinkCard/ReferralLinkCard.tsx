import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './ReferralLinkCard.module.css';
interface ReferralLinkCardProps {
	code: string;
	link: string;
}

export const ReferralLinkCard = ({ code, link }: ReferralLinkCardProps) => {
	return (
		<Card className={styles.card} withOutsideShadow>
			<Flex direction="column" gap="14">
				<Text variant="body5-accent">Промокод: {code}</Text>
				<Text variant="body3-accent">
					Ссылка:{' '}
					<a className={styles.link} href={link}>
						{link}
					</a>
				</Text>
			</Flex>
		</Card>
	);
};
