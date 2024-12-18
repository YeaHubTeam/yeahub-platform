import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import type { ProfileAchievment } from '@/entities/achievement';

import styles from './AchievmentsBlockItem.module.css';

interface AchievmentsBlockItemProps {
	achievement: ProfileAchievment;
}

export const AchievmentsBlockItem = ({ achievement }: AchievmentsBlockItemProps) => {
	const { t } = useI18nHelpers(i18Namespace.profile);
	const { img } = achievement;

	return (
		<div className={styles['achievement-item']}>
			<img src={img} alt={t(Profile.ACHIEVMENTSLIST_IMAGE_ALT)} />
		</div>
	);
};
