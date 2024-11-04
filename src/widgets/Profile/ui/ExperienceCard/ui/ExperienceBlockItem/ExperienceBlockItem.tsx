import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import type { ProfileExperience } from '@/entities/experience';

import styles from './ExperienceBlockItem.module.css';

interface ExperienceBlockItemProps {
	experience: ProfileExperience;
}

export const ExperienceBlockItem = ({ experience }: ExperienceBlockItemProps) => {
	const { name, imgUrl, company, schedule, seniority, location } = experience;
	const { t } = useI18nHelpers(i18Namespace.profile);
	return (
		<>
			<div className={styles['experience-item']}>
				<div className={styles['experience-logo']}>
					<img src={imgUrl} alt={t(Profile.EXPERIENCELIST_IMAGE_ALT)} />
				</div>
				<div className={styles['experience-content']}>
					<h3 className={styles['experience-name']}>{name}</h3>
					<ul className={styles['experience-info']}>
						<li className={styles['experience-company']}>{company}</li>
						<li className={styles['experience-schedule']}>{schedule}</li>
						<li className={styles['experience-seniority']}>{seniority}</li>
					</ul>
					<span className={styles['experience-location']}>{location}</span>
				</div>
			</div>
			<span className={styles['separator']}></span>
		</>
	);
};
