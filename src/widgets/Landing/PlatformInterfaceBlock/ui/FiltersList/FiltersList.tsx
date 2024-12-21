import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';

import styles from './FiltersList.module.css';

export const FiltersList = () => {
	const { t } = useTranslation(i18Namespace.questions);

	return (
		<div className={styles.filters}>
			<ul className={styles['filters-list']}>
				<li>
					<p>{t(Questions.COMPLEXITY_TITLE)}</p>
					<ul className={styles['sub-list']}>
						<li>1-3</li>
						<li>4-6</li>
						<li>7-8</li>
						<li className={styles.active}>9-10</li>
					</ul>
				</li>
				<li>
					<p>{t(Questions.RATE_TITLE)}</p>
					<ul className={styles['sub-list']}>
						<li>1</li>
						<li>2</li>
						<li>3</li>
						<li className={styles.active}>4</li>
						<li>5</li>
					</ul>
				</li>
				<li>
					<p>{t(Questions.STATUS_TITLE)}</p>
					<ul className={styles['sub-list']}>
						<li>{t(Questions.STATUS_UNLEARNED)}</li>
						<li>{t(Questions.STATUS_LEARNED)}</li>
						<li className={styles.active}>{t(Questions.STATUS_ALL)}</li>
					</ul>
				</li>
			</ul>
		</div>
	);
};
