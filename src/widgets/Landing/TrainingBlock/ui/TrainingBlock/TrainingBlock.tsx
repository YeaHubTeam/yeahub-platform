import { useNavigate } from 'react-router-dom';
import { Button } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { LS_ACCESS_TOKEN_KEY } from '@/shared/constants/authConstants';
import { getFromLS } from '@/shared/helpers/manageLocalStorage';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { useScreenSize } from '@/shared/hooks/useScreenSize';

import { OfferList } from '../OfferList/OfferList';
import { QuestionList } from '../QuestionList/QuestionList';

import styles from './TrainingBlock.module.css';

export const TrainingBlock = () => {
	const navigate = useNavigate();
	const { isDesktop } = useScreenSize();

	const { t } = useI18nHelpers(i18Namespace.landing);

	const handleNavigate = () => {
		const path = getFromLS(LS_ACCESS_TOKEN_KEY) ? ROUTES.interview.page : ROUTES.auth.login.page;
		navigate(path);
	};

	return (
		<section className={styles['training-block']}>
			<div className={styles['left-block']}>
				<div className={styles.container}>
					<h3>{t(Landing.QUESTIONS_LIST)}</h3>
					<QuestionList />
				</div>
			</div>
			<div className={styles['right-block']}>
				<div className={styles.title}>
					<h2>{t(Landing.CONVENIENCE_TRAINER_TITLE)}</h2>
					{!isDesktop ? <p>{t(Landing.SLOGAN_TABLET)}</p> : <p>{t(Landing.SLOGAN)}</p>}
				</div>
				<OfferList />
				<Button className={styles['start-studying']} onClick={handleNavigate}>
					{t(Landing.START_TRAINING)}
				</Button>
			</div>
		</section>
	);
};
