import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { DecorationItemIcon } from '@/shared/ui/_Icons/DecorationItemIcon';
import { StudentIcon } from '@/shared/ui/_Icons/StudentIcon';
import { TrainingIcon } from '@/shared/ui/_Icons/TrainingIcon';

import cls from './Advantages.module.css';

export const Advantages = () => {
	const { t } = useI18nHelpers(i18Namespace.landing);

	return (
		<div className={cls.advantages}>
			<ul className={cls['advantages-list']}>
				<li>
					<StudentIcon />
					{t(Landing.SERVICE_ABILITY_FIRST)}
				</li>
				<li>
					<TrainingIcon />
					{t(Landing.SERVICE_ABILITY_SECOND)}
				</li>
			</ul>

			<div className={cls.decoration}>
				<DecorationItemIcon />
				<DecorationItemIcon />
			</div>

			<p>{t(Landing.ABILITIES_CONCLUSION)}</p>
		</div>
	);
};
