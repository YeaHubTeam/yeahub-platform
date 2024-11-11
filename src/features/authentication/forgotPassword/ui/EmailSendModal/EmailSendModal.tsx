import classNames from 'classnames';
import { useState } from 'react';

import EmailModal from '@/shared/assets/images/emailModal.png';
import { i18Namespace } from '@/shared/config/i18n';
import { Auth } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Modal } from '@/shared/ui/Modal';
import { Timer } from '@/shared/ui/Timer/Timer';

import {
	IS_EMAIL_SEND_MODAL_TIMER_STARTED_KEY,
	EMAIL_SEND_MODAL_TIMER_START_TIME_KEY,
} from '../../model/constants/forgotPasswordConstants';

import styles from './EmailSendModal.module.css';

interface EmailSendModalProps {
	isOpen: boolean;
	onModalClose: () => void;
	isTimerStarted: boolean;
	setIsTimerStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EmailSendModal = ({
	isOpen,
	onModalClose,
	isTimerStarted,
	setIsTimerStarted,
}: EmailSendModalProps) => {
	const [isSendAgainButtonDisabled, setIsSendAgainButtonDisabled] = useState(false);

	const { t } = useI18nHelpers(i18Namespace.auth);

	const onSendAgain = () => {
		setIsTimerStarted(true);
	};

	return (
		<Modal title={t(Auth.FORGOT_PASSWORD_MODAL_TITLE)} isOpen={isOpen} onClose={onModalClose}>
			<Flex justify="center" align="center" direction="column" className={styles['modal']}>
				<img src={EmailModal} alt="email icon" />
				<p className={styles['modal-subtitle']}>{t(Auth.FORGOT_PASSWORD_MODAL_SUBTITLE)}</p>
				<Timer
					duration={10}
					setIsDisabled={setIsSendAgainButtonDisabled}
					isTimerStartedKey={IS_EMAIL_SEND_MODAL_TIMER_STARTED_KEY}
					timerStartTimeKey={EMAIL_SEND_MODAL_TIMER_START_TIME_KEY}
					isVisible={isTimerStarted}
					setIsVisible={setIsTimerStarted}
					className={styles['timer']}
				/>
				<Button
					className={classNames(styles['button'], {
						[styles['button-disabled']]: isSendAgainButtonDisabled,
					})}
					variant="link"
					disabled={isSendAgainButtonDisabled}
					onClick={onSendAgain}
				>
					{t(Auth.FORGOT_PASSWORD_MODAL_BUTTON)}
				</Button>
			</Flex>
		</Modal>
	);
};
