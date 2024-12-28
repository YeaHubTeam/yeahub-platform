import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { DecorationItemIcon } from '@/shared/ui/Icons/DecorationItemIcon';
import { StudentIcon } from '@/shared/ui/Icons/StudentIcon';
import { TrainingIcon } from '@/shared/ui/Icons/TrainingIcon';

import styles from './Advantages.module.css';

export const Advantages = () => {
	const { t } = useTranslation(i18Namespace.landing);

	return (
		<div className={styles.advantages}>
			<ul className={styles['advantages-list']}>
				<li>
					<StudentIcon />
					{t(Landing.INTERVIEW_ADVANTAGES_FIRST)}
				</li>
				<li>
					<TrainingIcon />
					{t(Landing.INTERVIEW_ADVANTAGES_SECOND)}
				</li>
			</ul>

			<div className={styles.decoration}>
				<DecorationItemIcon />
				<DecorationItemIcon />
			</div>

			<p>{t(Landing.INTERVIEW_SUBTITLE)}</p>
		</div>
	);
};
