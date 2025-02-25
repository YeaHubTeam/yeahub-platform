import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import interviewImg from '@/shared/assets/images/landing/interviewImg.avif';
import interviewImgMobile from '@/shared/assets/images/landing/interviewImgMobile.avif';
import interviewImgTablet from '@/shared/assets/images/landing/interviewImgTablet.avif';
import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { LS_ACCESS_TOKEN_KEY } from '@/shared/constants/authConstants';
import { getFromLS } from '@/shared/helpers/manageLocalStorage';
import { Button } from '@/shared/ui/Button';

import { AdvantagesList } from '../AdvantagesList/AdvantagesList';
import { InterviewTitle } from '../InterviewTitle/InterviewTitle';
import { Progress } from '../Progress/Progress';
import { Skills } from '../Skills/Skills';

import styles from './InterviewBlock.module.css';

export const InterviewBlock = () => {
	const navigate = useNavigate();
	const { t } = useTranslation(i18Namespace.landing);

	const handleNavigate = () => {
		const path = getFromLS(LS_ACCESS_TOKEN_KEY) ? ROUTES.platformRoute : ROUTES.auth.login.page;
		navigate(path);
	};

	return (
		<section className={styles['interview-block']}>
			<div className={styles.container}>
				<div className={styles['left-block']}>
					<span>{t(Landing.MAIN_BADGE)}</span>
					<InterviewTitle />
					<p className={styles['article-description']}>{t(Landing.MAIN_SUBTITLE)}</p>
					<Button variant="primary" size="large" onClick={handleNavigate}>
						{t(Landing.MAIN_LINK)}
					</Button>
				</div>
				<div className={styles['right-block']}>
					<Skills />

					<picture>
						<source media="(max-width: 767px)" srcSet={interviewImgMobile} />
						<source media="(max-width: 1439px)" srcSet={interviewImgTablet} />
						<img
							className={styles.wallpaper}
							src={interviewImg}
							alt="Топ вопросов на собеседовании"
							fetchPriority="high"
							width="498"
							height="491"
						/>
					</picture>

					<Progress />
				</div>
			</div>

			<AdvantagesList />
		</section>
	);
};
