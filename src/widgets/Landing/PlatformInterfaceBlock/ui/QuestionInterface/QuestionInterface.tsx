import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { PencilIcon } from '@/shared/ui/Icons/PencilIcon';

import { Buttons } from '../Buttons/Buttons';

import styles from './QuestionInterface.module.css';

export const QuestionInterface = () => {
	const { t } = useI18nHelpers(i18Namespace.landing);
	const { isDesktop } = useScreenSize();

	return (
		<div className={styles['question-interface']}>
			<div className={styles.caption}>
				<PencilIcon />
				<p>
					{t(Landing.PLATFORM_INTERFACE_DESCRIPTION)} <br />
				</p>
			</div>

			<div className={styles.container}>
				<Buttons />

				<h3>{t(Landing.SAMPLE_QUESTION)}</h3>
				<div>
					<p className={styles.rating}>
						{t(Landing.RATING)}:<span>4</span>
					</p>
					<p className={styles.difficulty}>
						{t(Landing.COMPLEXITY)}:<span>10</span>
					</p>
				</div>

				<div className={styles['img-container']}></div>

				{!isDesktop ? (
					<p className={styles.answer}>{t(Landing.SAMPLE_ANSWER_TABLET)}</p>
				) : (
					<p className={styles.answer}>{t(Landing.SAMPLE_ANSWER_DEFAULT)}</p>
				)}
			</div>
		</div>
	);
};
