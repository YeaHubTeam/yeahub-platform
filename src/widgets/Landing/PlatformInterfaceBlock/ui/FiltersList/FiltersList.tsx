import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import styles from './FiltersList.module.css';

export const FiltersList = () => {
	const { t } = useI18nHelpers(i18Namespace.landing);

	return (
		<div className={styles.filters}>
			<ul className={styles['filters-list']}>
				<li>
					<p>{t(Landing.COMPLEXITY_LEVEL)}</p>
					<ul className={styles['sub-list']}>
						<li>1-3</li>
						<li>4-6</li>
						<li>7-8</li>
						<li className={styles.active}>9-10</li>
					</ul>
				</li>
				<li>
					<p>{t(Landing.RATING)}</p>
					<ul className={styles['sub-list']}>
						<li>1</li>
						<li>2</li>
						<li>3</li>
						<li className={styles.active}>4</li>
						<li>5</li>
					</ul>
				</li>
				<li>
					<p>{t(Landing.STATUS)}</p>
					<ul className={styles['sub-list']}>
						<li>{t(Landing.LEARNED)}</li>
						<li>{t(Landing.UNLEARNED)}</li>
						<li>{t(Landing.SAVED)}</li>
						<li className={styles.active}>{t(Landing.ALL)}</li>
					</ul>
				</li>
			</ul>
		</div>
	);
};
