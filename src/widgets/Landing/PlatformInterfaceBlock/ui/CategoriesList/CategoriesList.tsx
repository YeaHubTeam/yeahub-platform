import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { FigmaIcon } from '@/shared/ui/Icons/FigmaIcon';
import { SkillIcon } from '@/shared/ui/Icons/SkillIcon';

import styles from './CategoriesList.module.css';

export const CategoriesList = () => {
	const { t } = useI18nHelpers(i18Namespace.landing);
	const { isTablet, isLaptop } = useScreenSize();

	return (
		<div className={styles.container}>
			<p className={styles.title}>{t(Landing.ANSWERS_CATEGORY)}</p>
			<ul className={styles['categories-list']}>
				<li>
					<FigmaIcon />
					<p>Figma</p>
				</li>
				<li>
					<SkillIcon />
					<p>Wireframing</p>
				</li>
				<li>
					<SkillIcon />
					<p>Wireframing</p>
				</li>
				<li className={styles.css}>
					<FigmaIcon />
					<p>CSS</p>
				</li>
				{isTablet || isLaptop ? (
					<li>
						<FigmaIcon />
						<p> Figma</p>
					</li>
				) : (
					''
				)}
			</ul>
			<p className={styles.more}>{t(Landing.VIEW_MORE)}</p>
		</div>
	);
};
