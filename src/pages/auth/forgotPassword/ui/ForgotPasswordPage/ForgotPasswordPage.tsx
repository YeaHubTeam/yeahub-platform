import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Auth } from '@/shared/config';
import { getFromLS } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';

import { RegistrationLabel } from '@/entities/auth';

import { IS_EMAIL_SEND_MODAL_TIMER_STARTED_KEY } from '../../lib/constants/forgotPasswordConstants';
import { EmailSendModal } from '../EmailSendModal/EmailSendModal';
import { ForgotPassword } from '../ForgotPassword/ForgotPassword';

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
