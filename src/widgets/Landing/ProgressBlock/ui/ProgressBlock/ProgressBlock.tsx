import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { LevelIcon } from '@/shared/ui/Icons/LevelIcon';
import { ProgressProfileIcon } from '@/shared/ui/Icons/ProgressProfileIcon';

import { Statistics } from '../Statistics/Statistics';

import cls from './ProgressBlock.module.css';

export const ProgressBlock = () => {
	const { t } = useI18nHelpers(i18Namespace.landing);

	return (
		<section className={cls['progress-block']}>
			<div className={cls['left-block']}>
				<div className={cls.caption}>
					<h2>{t(Landing.PROGRESS_BLOCK_TITLE)}</h2>
					<p>{t(Landing.PROGRESS_BLOCK_SUBTITLE)}</p>
				</div>

				<ul className={cls['progress-list']}>
					<li>
						<ProgressProfileIcon />
						{t(Landing.PROGRESS_BLOCK_ADVANTAGES_FIRST)}
					</li>
					<li>
						<LevelIcon />
						{t(Landing.PROGRESS_BLOCK_ADVANTAGES_SECOND)}
					</li>
				</ul>
			</div>

			<div className={cls['right-block']}>
				<Statistics />
			</div>
		</section>
	);
};
