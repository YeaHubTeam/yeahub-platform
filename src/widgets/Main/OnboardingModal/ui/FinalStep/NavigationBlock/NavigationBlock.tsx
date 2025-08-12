import { useTranslation } from 'react-i18next';
import { To, useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Onboarding } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import type { NavItem } from '../../../model/types/types';

import styles from './NavigationBlock.module.css';

export const NavigationBlock = () => {
	const { t } = useTranslation(i18Namespace.onboarding);
	const navigate = useNavigate();

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
			route: ROUTES.interview.collections.page,
		},
	];

	const onMoveService = (serviceLink: To) => {
		navigate(serviceLink);
	};

	return (
		<Flex
			componentType={'ul'}
			justify={'center'}
			gap={'20'}
			wrap={'wrap'}
			className={styles['list-container']}
		>
			{navItems.map(({ icon, label, route }) => (
				<Button
					key={label}
					variant="link-purple"
					size={'small'}
					onClick={() => onMoveService(route)}
					preffix={<Icon icon={icon} size={20} />}
				>
					<Text variant={'body2'} color={'purple-700'}>
						{label}
					</Text>
				</Button>
			))}
		</Flex>
	);
};
