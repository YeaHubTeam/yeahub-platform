import { useNavigate } from 'react-router-dom';

import interviewImg from '@/shared/assets/images/landing/interviewImg.png';
import interviewImgMobile from '@/shared/assets/images/landing/interviewImgMobile.png';
import interviewImgTablet from '@/shared/assets/images/landing/interviewImgTablet.png';
import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { LS_ACCESS_TOKEN_KEY } from '@/shared/constants/authConstants';
import { getFromLS } from '@/shared/helpers/manageLocalStorage';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Button } from '@/shared/ui/Button';

import { AdvantagesList } from '../AdvantagesList/AdvantagesList';
import { Progress } from '../Progress/Progress';
import { Skills } from '../Skills/Skills';

import styles from './InterviewBlock.module.css';

export const InterviewBlock = () => {
	const navigate = useNavigate();
	const { t } = useI18nHelpers(i18Namespace.landing);

	const handleNavigate = () => {
		const path = getFromLS(LS_ACCESS_TOKEN_KEY) ? ROUTES.platformRoute : ROUTES.auth.login.page;
		navigate(path);
	};

	return (
		<section className={styles['interview-block']}>
			<div className={styles.container}>
				<div className={styles['left-block']}>
					<span>{t(Landing.QUESTIONS_TOP)}</span>
					<h2 className={styles.article}>{t(Landing.HEADER)}</h2>
					<p className={styles['article-description']}>{t(Landing.HEADER_DESCRIPTION)}</p>
					<Button variant="primary" className={styles['join-button']} onClick={handleNavigate}>
						{t(Landing.JOIN)}
					</Button>
				</div>
				<div className={styles['right-block']}>
					<Skills />

					<picture>
						<source media="(max-width: 767px)" srcSet={interviewImgMobile} />
						<source media="(max-width: 1439px)" srcSet={interviewImgTablet} />
						<img className={styles.wallpaper} src={interviewImg} alt="wallpaper" />
					</picture>

					<Progress />
				</div>
			</div>

			<AdvantagesList />
		</section>
	);
};
