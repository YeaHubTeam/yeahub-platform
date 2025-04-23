import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing, Questions } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { LS_ACCESS_TOKEN_KEY } from '@/shared/constants/authConstants';
import { getFromLS } from '@/shared/helpers/manageLocalStorage';
import { useScreenSize } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';

import { OfferList } from '../OfferList/OfferList';
import { QuestionList } from '../QuestionList/QuestionList';

import styles from './TrainingBlock.module.css';

export const TrainingBlock = () => {
	const navigate = useNavigate();
	const { isDesktop } = useScreenSize();

	const { t } = useTranslation([i18Namespace.landing, i18Namespace.questions]);

	const handleNavigate = () => {
		const path = getFromLS(LS_ACCESS_TOKEN_KEY) ? ROUTES.interview.page : ROUTES.auth.login.page;
		navigate(path);
	};

	return (
		<section className={styles['training-block']}>
			<div className={styles['left-block']}>
				<div className={styles.container}>
					<h3>{t(Questions.PREVIEW_TITLE, { ns: i18Namespace.questions })}</h3>
					<QuestionList />
				</div>
			</div>
			<div className={styles['right-block']}>
				<div className={styles.title}>
					<h2>{t(Landing.TRAINING_TITLE)}</h2>
					{!isDesktop ? (
						<p>{t(Landing.TRAINING_SUBTITLE_TABLET)}</p>
					) : (
						<p>{t(Landing.TRAINING_SUBTITLE)}</p>
					)}
				</div>
				<OfferList />
				<Button className={styles['start-studying']} onClick={handleNavigate}>
					{t(Landing.TRAINING_LINK)}
				</Button>
			</div>
		</section>
	);
};
