import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewQuiz, Landing, Questions } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { LS_ACCESS_TOKEN_KEY } from '@/shared/constants/authConstants';
import { getFromLS } from '@/shared/helpers/manageLocalStorage';
import { Button } from '@/shared/ui/Button';
import { FilterIcon } from '@/shared/ui/Icons/FilterIcon';
import { LoopIcon } from '@/shared/ui/Icons/LoopIcon';

import { CategoriesList } from '../CategoriesList/CategoriesList';
import { FiltersList } from '../FiltersList/FiltersList';

import styles from './CategoriesBlock.module.css';

export const CategoriesBlock = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { t } = useTranslation([
		i18Namespace.landing,
		i18Namespace.interviewQuiz,
		i18Namespace.questions,
	]);

	const handleNavigate = () => {
		const path = getFromLS(LS_ACCESS_TOKEN_KEY)
			? ROUTES.interview.quiz.page
			: ROUTES.auth.login.page;
		navigate(path, { state: { from: location.pathname } });
	};

	return (
		<div className={styles['categories-block']}>
			<div className={styles['content-container']}>
				<div className={styles.content}>
					<div className={styles.categories}>
						<div className={styles['categories-input']}>
							<LoopIcon />
							<input
								placeholder={t(Questions.SEARCH_PLACEHOLDER, { ns: i18Namespace.questions })}
								disabled
							/>
						</div>
						<CategoriesList />
					</div>
					<FiltersList />
				</div>
				<div className={styles['caption-block']}>
					<FilterIcon />
					<p>{t(Landing.READY_INTERVIEW_ADVANTAGES_SECOND)}</p>
				</div>
			</div>
			<Button className={styles['start-interview-button']} onClick={handleNavigate}>
				{t(InterviewQuiz.START_QUIZ_LINK, { ns: i18Namespace.interviewQuiz })}
			</Button>
		</div>
	);
};
