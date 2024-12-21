import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Auth } from '@/shared/config/i18n/i18nTranslations';
import { getFromLS } from '@/shared/helpers/manageLocalStorage';
import { Flex } from '@/shared/ui/Flex';

import { RegistrationLabel } from '@/entities/auth';

import {
	EmailSendModal,
	IS_EMAIL_SEND_MODAL_TIMER_STARTED_KEY,
} from '@/features/authentication/forgotPassword';

import { ForgotPassword } from '@/widgets/authentication/forgotPassword';

import styles from './ForgotPasswordPage.module.css';

const ForgotPasswordPage = () => {
	const [isOpen, setIsOpen] = useState(!!getFromLS(IS_EMAIL_SEND_MODAL_TIMER_STARTED_KEY) === true);
	const [isTimerStarted, setIsTimerStarted] = useState(
		!!getFromLS(IS_EMAIL_SEND_MODAL_TIMER_STARTED_KEY) === true,
	);

	const [email, setEmail] = useState('');

	const { t } = useTranslation(i18Namespace.auth);

	const onModalClose = () => {
		if (!isTimerStarted) {
			setIsOpen(false);
		}
	};

	const onForgotPasswordSubmit = (email: string) => {
		setEmail(email);
		setIsOpen(true);
		setIsTimerStarted(true);
	};

	return (
		<>
			<Flex className={styles['wrapper']} justify="center" align="start">
				<Flex className={styles['content']} direction="column" justify="between">
					<div>
						<h1 className={styles['title']}>{t(Auth.FORGOT_PASSWORD_TITLE)}</h1>
						<p className={styles['subtitle']}>{t(Auth.FORGOT_PASSWORD_SUBTITLE)}</p>
						<ForgotPassword onSubmit={onForgotPasswordSubmit} />
					</div>
					<div className={styles['registration-label-wrapper']}>
						<RegistrationLabel />
					</div>
				</Flex>
			</Flex>
			<EmailSendModal
				email={email}
				isOpen={isOpen}
				onModalClose={onModalClose}
				isTimerStarted={isTimerStarted}
				setIsTimerStarted={setIsTimerStarted}
			/>
		</>
	);
};

export default ForgotPasswordPage;
