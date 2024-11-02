import { useNavigate } from 'react-router-dom';
import { Button } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { LS_ACCESS_TOKEN_KEY } from '@/shared/constants/authConstants';
import { getFromLS } from '@/shared/helpers/manageLocalStorage';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { FilterIcon } from '@/shared/ui/Icons/FilterIcon';
import { LoopIcon } from '@/shared/ui/Icons/LoopIcon';

import { CategoriesList } from '../CategoriesList/CategoriesList';
import { FiltersList } from '../FiltersList/FiltersList';

import styles from './CategoriesBlock.module.css';

export const CategoriesBlock = () => {
	const navigate = useNavigate();
	const { t } = useI18nHelpers(i18Namespace.landing);

	const handleNavigate = () => {
		const path = getFromLS(LS_ACCESS_TOKEN_KEY)
			? ROUTES.interview.quiz.page
			: ROUTES.auth.login.page;
		navigate(path);
	};

	return (
		<div className={styles['categories-block']}>
			<div className={styles['content-container']}>
				<div className={styles.content}>
					<div className={styles.categories}>
						<div className={styles['categories-input']}>
							<LoopIcon />
							<input placeholder={t(Landing.SEARCH_INPUT_PLACEHOLDER)} disabled />
						</div>
						<CategoriesList />
					</div>
					<FiltersList />
				</div>
				<div className={styles['caption-block']}>
					<FilterIcon />
					<p>{t(Landing.DESCRIPTION_FILTER)}</p>
				</div>
			</div>
			<Button className={styles['start-interview-button']} onClick={handleNavigate}>
				{t(Landing.START_INTERVIEW)}
			</Button>
		</div>
	);
};
