import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, Translation } from '@/shared/config';
import { LS_MODAL_NY_DASHBOARD_KEY, SELECT_TARIFF_SETTINGS_TAB, setToLS } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Modal } from '@/shared/ui/Modal';
import { Text } from '@/shared/ui/Text';

import styles from './NYModal.module.css';

interface NYModalProps {
	isOpenModal?: boolean;
}

export const NYModal = ({ isOpenModal }: NYModalProps) => {
	const { t } = useTranslation(i18Namespace.translation);
	const navigate = useNavigate();

	const [isOpen, setIsOpen] = useState(isOpenModal);

	const onCloseModal = () => {
		setIsOpen(false);
		setToLS(LS_MODAL_NY_DASHBOARD_KEY, false);
	};
	const onMoveToSubscriptions = () => {
		navigate(SELECT_TARIFF_SETTINGS_TAB);
		setToLS(LS_MODAL_NY_DASHBOARD_KEY, false);
		setIsOpen(false);
	};

	if (!isOpen) {
		return null;
	}

	return (
		<Modal className={styles.modal} hasPadding={false} isOpen={isOpen} onClose={onCloseModal}>
			<Flex gap="14" direction="column" className={styles.content}>
				<Text color="white-900" variant="body6">
					{t(Translation.MODAL_NY_TITLE)}
				</Text>
				<Text color="white-900" variant="body3">
					{t(Translation.MODAL_NY_TEXT)}
				</Text>
				<Button
					className={styles.button}
					onClick={onMoveToSubscriptions}
					variant="destructive"
					size="large"
				>
					{t(Translation.MODAL_NY_BUTTON)}
				</Button>
			</Flex>
		</Modal>
	);
};
