import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Modal, ModalContent, ModalDescription, ModalHeading } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { Button } from '@/shared/ui/Button';

import styles from './BlockerDialogModal.module.css';

interface BlockerDialogModalProps {
	asChild?: boolean;
	children?: React.ReactNode;
	onOk?: () => void;
	onCancel?: () => void;
	containerClassName?: string;
	message?: string;
}

export const BlockerDialog = ({
	asChild = false,
	children,
	onCancel,
	onOk,
	containerClassName = '',
	message,
}: BlockerDialogModalProps) => {
	const { t } = useTranslation(i18Namespace.translation);

	const handleOk = () => onOk && onOk();
	const handleCancel = () => onCancel && onCancel();

	const containerStyle = classNames(styles.content, containerClassName);
	return (
		<Modal open>
			{asChild && children ? (
				<ModalContent className={containerStyle}>{children}</ModalContent>
			) : (
				<ModalContent className={containerStyle}>
					<ModalHeading className={styles.title}>{t(Translation.MODAL_BLOCK_TITLE)}</ModalHeading>
					<ModalDescription className={styles.description}>
						{t(message ?? Translation.MODAL_BLOCK_DESCRIPTION)}
					</ModalDescription>
					<div className={styles['buttons-wrapper']}>
						<Button onClick={handleOk}>{t(Translation.MODAL_ACTIONS_OK)}</Button>
						<Button variant="outline" onClick={handleCancel}>
							{t(Translation.MODAL_ACTIONS_CANCEL)}
						</Button>
					</div>
				</ModalContent>
			)}
		</Modal>
	);
};
