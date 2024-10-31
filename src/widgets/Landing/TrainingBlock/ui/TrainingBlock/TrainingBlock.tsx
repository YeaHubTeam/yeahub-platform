import { useNavigate } from 'react-router-dom';
import { Button } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { useResize } from '@/shared/hooks/useResize';

import { OfferList } from '../OfferList/OfferList';
import { QuestionList } from '../QuestionList/QuestionList';

import cls from './TrainingBlock.module.css';

export const TrainingBlock = () => {
	const navigate = useNavigate();
	const size = useResize();
	const isTablet = size < 1440;

	const { t } = useI18nHelpers(i18Namespace.landing);

	const handleNavigate = () => {
		navigate(ROUTES.interview.page);
	};

	return (
		<section className={cls['training-block']}>
			<div className={cls['left-block']}>
				<div className={cls.container}>
					<h3>{t(Landing.QUESTIONS_LIST)}</h3>
					<QuestionList />
				</div>
			</div>
			<div className={cls['right-block']}>
				<div className={cls.title}>
					<h2>{t(Landing.CONVENIENCE_TRAINER_TITLE)}</h2>
					{isTablet ? <p>{t(Landing.SLOGAN_TABLET)}</p> : <p>{t(Landing.SLOGAN)}</p>}
				</div>
				<OfferList />
				<Button className={cls['start-studying']} onClick={handleNavigate}>
					{t(Landing.START_TRAINING)}
				</Button>
			</div>
		</section>
	);
};
