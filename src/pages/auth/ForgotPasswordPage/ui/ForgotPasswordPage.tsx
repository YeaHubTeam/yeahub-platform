import classNames from 'classnames';
import { useState } from 'react';

import EmailModal from '@/shared/assets/images/emailModal.png';
import { i18Namespace } from '@/shared/config/i18n';
import { Auth } from '@/shared/config/i18n/i18nTranslations';
import { getFromLS } from '@/shared/helpers/manageLocalStorage';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Modal } from '@/shared/ui/Modal';
import { Timer } from '@/shared/ui/Timer/Timer';
import { toast } from '@/shared/ui/Toast';

import { RegistrationLabel } from '@/entities/auth';

import { useSendEmailRecoveryPasswordMutation } from '@/features/authentication/forgotPassword';

import { ForgotPassword as ForgotPasswordForm } from '@/widgets/authentication/forgotPassword';

import styles from './ForgotPasswordPage.module.css';

const isTimerStartedKey = 'isTimerStarted';

const ForgotPassword = () => {
	const [sendEmailRecoveryPassword] = useSendEmailRecoveryPasswordMutation();
	const [isOpen, setIsOpen] = useState(getFromLS(isTimerStartedKey) === 'true');
	const [isDisabled, setIsDisabled] = useState(getFromLS(isTimerStartedKey) === 'true');
	const [isTimerStarted, setIsTimerStarted] = useState(getFromLS(isTimerStartedKey) === 'true');
	const [email, setEmail] = useState('');

	const { t } = useI18nHelpers(i18Namespace.auth);

	const handleSendAgain = async () => {
		try {
			setIsTimerStarted(true);
			setIsDisabled(true);
			sendEmailRecoveryPassword({ email });
		} catch (error) {
			toast.error(t(Auth.FORGOT_PASSWORD_ENTERED_INCORRECT_EMAIL));
			// eslint-disable-next-line no-console
			console.error(error);
		}
	};

	const onSubmit = (email: string) => {
		setEmail(email);
		setIsOpen(true);
		setIsTimerStarted(true);
	};

	const handleModalClose = () => {
		if (!isTimerStarted) {
			setIsOpen(false);
		}
	};

	return (
		<>
			<div className={styles['wrapper']}>
				<Flex className={styles['content']} direction="column" justify="between">
					<div>
						<h1 className={styles['title']}>{t(Auth.FORGOT_PASSWORD_TITLE)}</h1>
						<p className={styles['subtitle']}>{t(Auth.FORGOT_PASSWORD_SUBTITLE)}</p>
						<ForgotPasswordForm onSubmit={onSubmit} />
					</div>
					<div className={styles['registration-label-wrapper']}>
						<RegistrationLabel />
					</div>
				</Flex>
			</div>
			<Modal title={t(Auth.FORGOT_PASSWORD_MODAL_TITLE)} isOpen={isOpen} onClose={handleModalClose}>
				<Flex justify="center" align="center" direction="column" className={styles['modal']}>
					<img src={EmailModal} alt="email icon" />
					<p className={styles['modal-subtitle']}>{t(Auth.FORGOT_PASSWORD_MODAL_SUBTITLE)}</p>
					<Timer
						duration={60}
						setIsDisabled={setIsDisabled}
						isTimerStartedKey={isTimerStartedKey}
						isVisible={isTimerStarted}
						setIsVisible={setIsTimerStarted}
						className={styles['timer']}
					/>
					<Button
						className={classNames(styles['button'], { [styles['button-disabled']]: isDisabled })}
						variant="link"
						disabled={isDisabled}
						onClick={handleSendAgain}
					>
						{t(Auth.FORGOT_PASSWORD_MODAL_BUTTON)}
					</Button>
				</Flex>
			</Modal>
		</>
	);
};

export default ForgotPassword;
