import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import { Guru, GuruSocialsList } from '@/entities/guru';

import styles from './MentorCard.module.css';

interface CardItemProps {
	guru: Guru;
}

export const MentorCard = ({ guru }: CardItemProps) => {
	const { t } = useTranslation(i18Namespace.landing);

	const { image, name, title, socials, description } = guru;

	return (
		<Card
			withOutsideShadow
			actionTitle={t(Landing.MENTORS_LINK)}
			actionRoute={socials.landing || ''}
			isActionPositionBottom
			className={styles.card}
			size="small"
		>
			<Flex direction="column" gap="12" className={styles.inner}>
				<Flex align="center" gap="8">
					<div className={styles.avatarWrapper}>
						<img src={image} alt={name} className={styles.avatar} />
						<Icon icon="tickWithBackground" color="purple-700" className={styles.tickIcon} />
					</div>

					<Flex direction="column" gap="4">
						<Text variant="body3-strong">{name}</Text>
						<Text variant="body3">{title}</Text>
					</Flex>
				</Flex>

				<Text variant="body3">{description}</Text>

				<GuruSocialsList socials={socials} />
			</Flex>
		</Card>
	);
};
