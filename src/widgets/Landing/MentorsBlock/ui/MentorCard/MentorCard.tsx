import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { Card } from '@/shared/ui/Card';

import { Guru, GurusItem } from '@/entities/guru';

import styles from './MentorCard.module.css';

interface MentorCardProps {
	guru: Guru;
}

export const MentorCard = ({ guru }: MentorCardProps) => {
	const { t } = useTranslation(i18Namespace.landing);

	const { socials, description } = guru;

	return (
		<Card
			withOutsideShadow
			actionTitle={t(Landing.MENTORS_LINK)}
			actionRoute={socials.landing || ''}
			isActionPositionBottom
			className={styles.card}
			size="small"
		>
			<GurusItem
				guru={guru}
				description={description}
				avatarSize={53}
				avatarIcon={{ icon: 'tickWithBackground' }}
			/>
		</Card>
	);
};
