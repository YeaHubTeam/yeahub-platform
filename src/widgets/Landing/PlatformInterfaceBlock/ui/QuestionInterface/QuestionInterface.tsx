import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { useResize } from '@/shared/hooks/useResize';
import { PencilIcon } from '@/shared/ui/_Icons/PencilIcon';

import { Buttons } from '../Buttons/Buttons';

import cls from './QuestionInterface.module.css';

export const QuestionInterface = () => {
	const { t } = useI18nHelpers(i18Namespace.landing);
	const size = useResize();
	const isTablet = size < 1440;

	return (
		<div className={cls['question-interface']}>
			<div className={cls.caption}>
				<PencilIcon />
				<p>
					{t(Landing.PLATFORM_INTERFACE_DESCRIPTION)} <br />
				</p>
			</div>

			<div className={cls.container}>
				<Buttons />

				<h3>{t(Landing.SAMPLE_QUESTION)}</h3>
				<div>
					<p className={cls.rating}>
						{t(Landing.RATING)}:<span>4</span>
					</p>
					<p className={cls.difficulty}>
						{t(Landing.COMPLEXITY)}:<span>10</span>
					</p>
				</div>

				<div className={cls['img-container']}></div>

				{isTablet ? (
					<p className={cls.answer}>{t(Landing.SAMPLE_ANSWER_TABLET)}</p>
				) : (
					<p className={cls.answer}>{t(Landing.SAMPLE_ANSWER_DEFAULT)}</p>
				)}
			</div>
		</div>
	);
};
