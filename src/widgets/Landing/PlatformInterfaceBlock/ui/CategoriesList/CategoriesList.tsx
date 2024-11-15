import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { CSSIcon } from '@/shared/ui/Icons/CSSIcon';
import { FigmaIcon } from '@/shared/ui/Icons/FigmaIcon';
import { HTMLIcon } from '@/shared/ui/Icons/HTMLIcon';
import { JSIcon } from '@/shared/ui/Icons/JSIcon';
import { ReactIcon } from '@/shared/ui/Icons/ReactIcon';

import styles from './CategoriesList.module.css';

export const CategoriesList = () => {
	const { t } = useI18nHelpers(i18Namespace.landing);
	const { isTablet, isLaptop } = useScreenSize();

	return (
		<div className={styles.container}>
			<p className={styles.title}>{t(Landing.ANSWERS_CATEGORY)}</p>
			<ul className={styles['categories-list']}>
				<li>
					<ReactIcon />
					<p>React</p>
				</li>
				<li>
					<FigmaIcon />
					<p>Figma</p>
				</li>
				<li>
					<HTMLIcon />
					<p>HTML</p>
				</li>
				<li className={styles.css}>
					<CSSIcon />
					<p>CSS</p>
				</li>
				{isTablet || isLaptop ? (
					<li>
						<JSIcon />
						<p>JS</p>
					</li>
				) : (
					''
				)}
			</ul>
			<p className={styles.more}>{t(Landing.VIEW_MORE)}</p>
		</div>
	);
};
