import { useState } from 'react';

import { useScreenSize } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import { ConfirmationDeleteModal } from '@/shared/ui/ConfirmationDeleteModal';

import { useDeleteRequestMutation } from '../../api/deleteRequestApi';

import styles from './DeleteRequest.module.css';

interface DeleteRequestProps {
	requestId: string;
	status: import('@/entities/resource').ResourceRequestStatus;
}

export const DeleteRequest = ({ requestId, status }: DeleteRequestProps) => {
	const { isMobileS } = useScreenSize();
	const [isOpen, setIsOpen] = useState(false);
	const [deleteApplication] = useDeleteRequestMutation();

	const handleConfirm = async () => {
		try {
			await deleteApplication(requestId);
			setIsOpen(false);
		} catch (_) {
			setIsOpen(false);
		}
	};

	return (
		<>
			<Button
				variant="outline"
				size="large"
				fullWidth={isMobileS}
				className={styles.button}
				onClick={() => setIsOpen(true)}
				disabled={status !== 'pending'}
			>
				Отозвать заявку
			</Button>

			<ConfirmationDeleteModal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				onDelete={handleConfirm}
				confirmButtonText={'Да'}
				modalTitle={'Вы действительно хотите отозвать заявку?'}
				discardButtonText={'Нет'}
				deleteDescriptionModal={''}
			/>
		</>
	);
};
