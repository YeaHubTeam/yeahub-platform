import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { DislikeIcon } from '@/shared/ui/Icons/DislikeIcon';
import { LikeIcon } from '@/shared/ui/Icons/LikeIcon';

import styles from './Control.module.css';

export const Control = () => {
	const { t } = useI18nHelpers(i18Namespace.landing);

	return (
		<div className={styles.control}>
			<ul className={styles['control-list']}>
				<li>
					<DislikeIcon />
					<span>{t(Landing.DON_NOT_KNOW)}</span>
				</li>
				<li>
					<LikeIcon />
					<span>{t(Landing.KNOW)}</span>
				</li>
			</ul>
		</div>
	);
};
