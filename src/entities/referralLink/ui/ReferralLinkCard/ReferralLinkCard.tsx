import { useTranslation } from 'react-i18next';

import { i18Namespace, ReferralLinks } from '@/shared/config';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './ReferralLinkCard.module.css';
interface ReferralLinkCardProps {
	code: string;
	link: string;
}

export const ReferralLinkCard = ({ code, link }: ReferralLinkCardProps) => {
	const { t } = useTranslation(i18Namespace.referralLink);
	return (
		<Card className={styles.card} withOutsideShadow>
			<Flex direction="column" gap="14">
				<Text variant="body5-accent">
					{t(ReferralLinks.DETAIL_REF_CODE)}: {code}
				</Text>
				<Text variant="body3-accent">
					{t(ReferralLinks.DETAIL_URL)}:{' '}
					<a className={styles.link} href={link}>
						{link}
					</a>
				</Text>
			</Flex>
		</Card>
	);
};
