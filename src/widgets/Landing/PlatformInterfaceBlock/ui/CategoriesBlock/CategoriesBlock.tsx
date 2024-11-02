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

import cls from './CategoriesBlock.module.css';

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
		<div className={cls['categories-block']}>
			<div className={cls['content-container']}>
				<div className={cls.content}>
					<div className={cls.categories}>
						<div className={cls['categories-input']}>
							<LoopIcon />
							<input placeholder={t(Landing.SEARCH_INPUT_PLACEHOLDER)} disabled />
						</div>
						<CategoriesList />
					</div>
					<FiltersList />
				</div>
				<div className={cls['caption-block']}>
					<FilterIcon />
					<p>{t(Landing.DESCRIPTION_FILTER)}</p>
				</div>
			</div>
			<Button className={cls['start-interview-button']} onClick={handleNavigate}>
				{t(Landing.START_INTERVIEW)}
			</Button>
		</div>
	);
};
