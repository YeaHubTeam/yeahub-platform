import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { DislikeIcon } from '@/shared/ui/Icons/DislikeIcon';
import { LikeIcon } from '@/shared/ui/Icons/LikeIcon';
import { NextIcon } from '@/shared/ui/Icons/NextIcon';
import { PreviousIcon } from '@/shared/ui/Icons/PreviousIcon';
import { ReplayIcon } from '@/shared/ui/Icons/ReplayIcon';

import cls from './Control.module.css';

export const Control = () => {
	const { t } = useI18nHelpers(i18Namespace.landing);

	return (
		<div className={cls.control}>
			<PreviousIcon />
			<NextIcon />

			<ul className={cls['control-list']}>
				<li>
					<DislikeIcon />
					<span>{t(Landing.DON_NOT_KNOW)}</span>
				</li>
				<li>
					<ReplayIcon />
					<span>{t(Landing.REPEAT)}</span>
				</li>
				<li>
					<LikeIcon />
					<span>{t(Landing.KNOW)}</span>
				</li>
			</ul>
		</div>
	);
};
