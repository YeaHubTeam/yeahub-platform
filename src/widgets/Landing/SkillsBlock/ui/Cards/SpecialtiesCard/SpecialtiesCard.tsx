import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';

import { CardLayout } from '@/widgets/Landing/SkillsBlock/ui/Cards/CardLayout/CardLayout';

import { specialties } from '../../../model/constants';
import { Badge } from '../../Badge/Badge';

import styles from './SpecialtiesCard.module.css';

export const SpecialtiesCard = () => {
	const { t } = useTranslation(i18Namespace.landing);
	return (
		<CardLayout
			firstRow={
				<>
					<Badge
						src={specialties.dataScience.src}
						badgeText={specialties.dataScience.badgeText}
						showBadgeText
					/>
					<Badge src={specialties.ml.src} badgeText={specialties.ml.badgeText} showBadgeText />
				</>
			}
			secondRow={
				<>
					<Badge
						src={specialties.testing.src}
						badgeText={specialties.testing.badgeText}
						showBadgeText
					/>
					<Badge
						variant={'secondary'}
						src={specialties.frontend.src}
						badgeText={specialties.frontend.badgeText}
						showBadgeText
						className={styles.secondary}
					/>
					<Badge
						src={specialties.gameDevelopment.src}
						badgeText={specialties.gameDevelopment.badgeText}
						showBadgeText
					/>
				</>
			}
			thirdRow={
				<>
					<Badge
						src={specialties.androidDev.src}
						badgeText={specialties.androidDev.badgeText}
						showBadgeText
					/>
					<Badge
						src={specialties.androidDev.src}
						badgeText={specialties.androidDev.badgeText}
						showBadgeText
					/>
					<Badge
						src={specialties.iosDev.src}
						badgeText={specialties.iosDev.badgeText}
						showBadgeText
					/>
				</>
			}
			hasOffset
			gap={styles.gap}
			title={t(Landing.SPECIALTY_TITLE)}
			description={t(Landing.SPECIALTY_DESCRIPTION)}
		/>
	);
};
