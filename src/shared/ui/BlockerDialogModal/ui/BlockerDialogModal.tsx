import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { Modal } from '@/shared/ui/Modal';

import styles from './BlockerDialogModal.module.css';

interface BlockerDialogModalProps {
	isOpen: boolean;
	onClose: () => void;
	asChild?: boolean;
	children?: React.ReactNode;
	onOk?: () => void;
	onCancel?: () => void;
	containerClassName?: string;
	message?: string;
}

export const BlockerDialog = ({
	isOpen,
	onClose,
	asChild = false,
	children,
	onCancel,
	onOk,
	containerClassName = '',
	message,
}: BlockerDialogModalProps) => {
	const { t } = useTranslation(i18Namespace.translation);

	const handleOk = () => onOk?.();
	const handleCancel = () => onCancel?.();

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title={t(Translation.MODAL_BLOCK_TITLE)}
			buttonPrimaryText={t(Translation.MODAL_ACTIONS_OK)}
			buttonOutlineText={t(Translation.MODAL_ACTIONS_CANCEL)}
			buttonPrimaryClick={handleOk}
			buttonOutlineClick={handleCancel}
		>
			<div className={classNames(styles.content, containerClassName)}>
				{asChild && children ? (
					children
				) : (
					<div>{t(message ?? Translation.MODAL_BLOCK_DESCRIPTION)}</div>
				)}
			</div>
		</Modal>
	);
};
