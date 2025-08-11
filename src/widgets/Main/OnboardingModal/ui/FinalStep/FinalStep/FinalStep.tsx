import { useTranslation } from 'react-i18next';
import { type To, useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Onboarding } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';

import type { NavItem } from '../../../model/types/types';
import { LayoutStepComponent } from '../../LayoutStepComponent/LayoutStepComponent';
import { NavigationBlock } from '../NavigationBlock/NavigationBlock';

import styles from './FinalStep.module.css';

export const FinalStep = () => {
	const { t } = useTranslation(i18Namespace.onboarding);
	const navigate = useNavigate();

	const onMoveService = (serviceLink: To) => {
		navigate(serviceLink);
	};

	const navItems: NavItem[] = [
		{
			icon: 'question',
			label: t(Onboarding.FINAL_QUESTIONS_LINK),
			route: ROUTES.interview.questions.page,
		},
		{
			icon: 'checkList',
			label: t(Onboarding.FINAL_TRAINER_LINK),
			route: ROUTES.interview.quiz.page,
		},
		{
			icon: 'student',
			label: t(Onboarding.FINAL_INTERVIEW_LINK),
			route: ROUTES.interview.page,
		},
	];
	return (
		<LayoutStepComponent
			title={t(Onboarding.FINAL_TITLE)}
			description={t(Onboarding.FINAL_CONTENT)}
			className={styles['final']}
		>
			<NavigationBlock navItems={navItems} onMoveService={onMoveService} />
		</LayoutStepComponent>
	);
};
