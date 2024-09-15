import { Button, Modal, ModalContent, ModalDescription, ModalHeading } from 'yeahub-ui-kit';

import styles from './BlockerDialogModal.module.css';

interface BlockerDialogModalProps {
	asChild?: boolean;
	children?: React.ReactNode;
	onOk?: () => void;
	onCancel?: () => void;
}

export const BlockerDialog = ({
	asChild = false,
	children,
	onCancel,
	onOk,
}: BlockerDialogModalProps) => {
	const handleOk = () => onOk && onOk();
	const handleCancel = () => onCancel && onCancel();
	return (
		<Modal open>
			{asChild && children ? (
				<ModalContent className={styles.content}>{children}</ModalContent>
			) : (
				<ModalContent className={styles.content}>
					<ModalHeading className={styles.title}>Подтвердить действие</ModalHeading>
					<ModalDescription className={styles.description}>
						У вас есть несохраненные данные. Вы хотите продолжить?
					</ModalDescription>
					<div className={styles['buttons-wrapper']}>
						<Button onClick={handleOk}>Да</Button>
						<Button theme="outline" onClick={handleCancel}>
							Нет
						</Button>
					</div>
				</ModalContent>
			)}
		</Modal>
	);
};
