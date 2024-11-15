import DotsVertical from '@/shared/assets/icons/DotsVertical.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { ChevronUp } from '@/shared/ui/Icons/ChevronUp';
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
			<div className={styles['question-example']}>
				<DotsVertical className={styles['dots-icon']} />
				<ChevronUp className={styles['chevron-icon']} />
				<h3 className={styles.question}>{t(Landing.PLATFORM_INTERFACE_QUESTION)}</h3>
				<div className={styles['question-body']}>
					<div className={styles['question-info']}>
						<div className={styles['question-tag']}>
							{t(Landing.PLATFORM_INTERFACE_RATING)}: <span>4</span>
						</div>
						<div className={styles['question-tag']}>
							{t(Landing.PLATFORM_INTERFACE_COMPLEXITY)}: <span>10</span>
						</div>
					</div>
					<div
						className={styles.answer}
						dangerouslySetInnerHTML={{ __html: t(Landing.PLATFORM_INTERFACE_ANSWER) }}
					></div>
				</div>
			</div>
		</div>
	);
};
