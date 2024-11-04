import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { KnowledgebaseIcon } from '@/shared/ui/Icons/KnowledgebaseIcon';
import { ProgressIcon } from '@/shared/ui/Icons/ProgressIcon';
import { TrainingIcon } from '@/shared/ui/Icons/TrainingIcon';

import styles from './AdvantagesList.module.css';

export const AdvantagesList = () => {
	const { t } = useI18nHelpers(i18Namespace.landing);

	return (
		<div className={styles.advantages}>
			<ul className={styles['advantages-list']}>
				<li>
					<KnowledgebaseIcon />
					<h3>{t(Landing.KNOWLEDGE_BASE_TITLE)}</h3>
					<p>{t(Landing.KNOWLEDGE_BASE_DESCRIPTION)}</p>
				</li>
				<li>
					<ProgressIcon />
					<h3>{t(Landing.STUDYING_PROGRESS_TITLE)}</h3>
					<p>{t(Landing.STUDYING_PROGRESS_DESCRIPTION)}</p>
				</li>
				<li>
					<TrainingIcon />
					<h3>{t(Landing.CONVENIENCE_TRAINER_TITLE)}</h3>
					<p>{t(Landing.CONVENIENCE_TRAINER_DESCRIPTION)}</p>
				</li>
			</ul>
		</div>
	);
};