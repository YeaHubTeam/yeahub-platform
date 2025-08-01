import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewQuizResult } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { bars } from '../../model/assets';
import { AboutBenefits } from '../CallToActionBlock/AboutBenefits/AboutBenefits';

import styles from './CallToActionBlock.module.css';

export const CallToActionBlock = () => {
	const { t } = useTranslation(i18Namespace.interviewQuizResult);

	const navigate = useNavigate();

	const handleButtonClick = () => {
		navigate(ROUTES.settings.page);
	};

	return (
		<Flex direction="column">
			<img className={styles.image} src={bars} alt="bars" />
			<Text variant="body5-strong" className={styles.title}>
				{t(InterviewQuizResult.MODAL_TITLE)}
			</Text>
			<AboutBenefits />
			<Button onClick={handleButtonClick} size="large" fullWidth className={styles.button}>
				{t(InterviewQuizResult.MODAL_CTA)}
			</Button>
			<Text variant="body3-accent" color="black-600" className={styles.trial}>
				{t(InterviewQuizResult.MODAL_TRIAL)}
			</Text>
		</Flex>
	);
};
