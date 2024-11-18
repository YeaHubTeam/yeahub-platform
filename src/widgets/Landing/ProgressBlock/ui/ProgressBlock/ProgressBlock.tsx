import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { LevelIcon } from '@/shared/ui/Icons/LevelIcon';
import { ProgressProfileIcon } from '@/shared/ui/Icons/ProgressProfileIcon';

import { Statistics } from '../Statistics/Statistics';

import styles from './ProgressBlock.module.css';

export const ProgressBlock = () => {
	const { t } = useI18nHelpers(i18Namespace.landing);

	return (
		<section className={styles['progress-block']}>
			<div className={styles.caption}>
				<h2>{t(Landing.PROGRESS_BLOCK_TITLE)}</h2>
				<p>{t(Landing.PROGRESS_BLOCK_SUBTITLE)}</p>
			</div>
			<ul className={styles['progress-list']}>
				<li>
					<ProgressProfileIcon />
					{t(Landing.PROGRESS_BLOCK_ADVANTAGES_FIRST)}
				</li>
				<li>
					<LevelIcon />
					{t(Landing.PROGRESS_BLOCK_ADVANTAGES_SECOND)}
				</li>
			</ul>
			<div className={styles['right-block']}>
				<Statistics />
			</div>
		</section>
	);
};
