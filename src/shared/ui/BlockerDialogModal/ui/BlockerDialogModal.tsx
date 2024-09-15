import classNames from 'classnames';
import { Button, Modal, ModalContent, ModalDescription, ModalHeading } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import styles from './BlockerDialogModal.module.css';

interface BlockerDialogModalProps {
	asChild?: boolean;
	children?: React.ReactNode;
	onOk?: () => void;
	onCancel?: () => void;
	containerClassName?: string;
}

export const BlockerDialog = ({
	asChild = false,
	children,
	onCancel,
	onOk,
	containerClassName = '',
}: BlockerDialogModalProps) => {
	const { t } = useI18nHelpers(i18Namespace.translation);

	const handleOk = () => onOk && onOk();
	const handleCancel = () => onCancel && onCancel();

	const containerStyle = classNames(styles.content, containerClassName);
	return (
		<Modal open>
			{asChild && children ? (
				<ModalContent className={containerStyle}>{children}</ModalContent>
			) : (
				<ModalContent className={containerStyle}>
					<ModalHeading className={styles.title}>{t('blockModal.confirmTitle')}</ModalHeading>
					<ModalDescription className={styles.description}>
						{t('blockModal.confirmDescription')}
					</ModalDescription>
					<div className={styles['buttons-wrapper']}>
						<Button onClick={handleOk}>{t('blockModal.action.ok')}</Button>
						<Button theme="outline" onClick={handleCancel}>
							{t('blockModal.action.cancel')}
						</Button>
					</div>
				</ModalContent>
			)}
		</Modal>
	);
};
