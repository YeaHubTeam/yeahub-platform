import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { PencilIcon } from '@/shared/ui/Icons/PencilIcon';

import styles from './QuestionInterface.module.css';

export const QuestionInterface = () => {
	const { t } = useI18nHelpers(i18Namespace.landing);

	return (
		<div className={styles['question-interface']}>
			<div className={styles.caption}>
				<PencilIcon />
				<p>
					{t(Landing.PLATFORM_INTERFACE_DESCRIPTION)} <br />
				</p>
			</div>
			<div className={styles['img-container']}></div>
		</div>
	);
};
