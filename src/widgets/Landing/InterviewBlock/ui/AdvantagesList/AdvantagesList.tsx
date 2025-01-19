import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { KnowledgebaseIcon } from '@/shared/ui/Icons/KnowledgebaseIcon';
import { ProgressIcon } from '@/shared/ui/Icons/ProgressIcon';
import { TrainingIcon } from '@/shared/ui/Icons/TrainingIcon';

import styles from './AdvantagesList.module.css';

export const AdvantagesList = () => {
	const { t } = useTranslation(i18Namespace.landing);

	return (
		<div className={styles.advantages}>
			<ul className={styles['advantages-list']}>
				<li className={styles['advantage-card']}>
					<KnowledgebaseIcon />
					<div className={styles['advantage-card-body']}>
						<h3>{t(Landing.MAIN_ADVANTAGES_FIRST_TITLE)}</h3>
						<p>{t(Landing.MAIN_ADVANTAGES_FIRST_DESCRIPTION)}</p>
					</div>
				</li>
				<li className={styles['advantage-card']}>
					<ProgressIcon />
					<div className={styles['advantage-card-body']}>
						<h3>{t(Landing.MAIN_ADVANTAGES_SECOND_TITLE)}</h3>
						<p>{t(Landing.MAIN_ADVANTAGES_SECOND_DESCRIPTION)}</p>
					</div>
				</li>
				<li className={styles['advantage-card']}>
					<TrainingIcon />
					<div className={styles['advantage-card-body']}>
						<h3>{t(Landing.MAIN_ADVANTAGES_THIRD_TITLE)}</h3>
						<p>{t(Landing.MAIN_ADVANTAGES_THIRD_DESCRIPTION)}</p>
					</div>
				</li>
			</ul>
		</div>
	);
};
