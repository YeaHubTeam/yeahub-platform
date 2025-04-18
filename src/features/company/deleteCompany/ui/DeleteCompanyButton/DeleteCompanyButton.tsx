import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { BlockerDialog } from '@/shared/ui/BlockerDialogModal';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';

import { useDeleteCompanyMutation } from '../../api/deleteCompanyApi';

interface DeleteCompanyButtonProps {
	companyId: string;
	isDetailPage?: boolean;
}

export const DeleteCompanyButton = ({
	companyId,
	isDetailPage = false,
}: DeleteCompanyButtonProps) => {
	const [deleteCompanyMutation] = useDeleteCompanyMutation();

	const { t } = useTranslation(i18Namespace.translation);
	const [isDeleteModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const onDeleteCompany = async () => {
		try {
			await deleteCompanyMutation(companyId);
			handleCloseModal();
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error);
		}
	};

	return (
		<>
			<Button
				aria-label="Large"
				style={{
					width: isDetailPage ? 'auto' : '100%',
					padding: isDetailPage ? '0 32px' : '6px 10px',
					justifyContent: isDetailPage ? 'center' : 'flex-start',
				}}
				variant={isDetailPage ? 'destructive' : 'tertiary'}
				onClick={handleOpenModal}
				preffix={isDetailPage ? undefined : <Icon icon="trash" size={20} />}
			>
				{t(Translation.DELETE)}
			</Button>
			{isDeleteModalOpen && (
				<BlockerDialog
					isOpen={isDeleteModalOpen}
					onClose={handleCloseModal}
					onOk={onDeleteCompany}
					onCancel={() => setIsModalOpen(false)}
					message={Translation.MODAL_DELETE_TITLE}
				/>
			)}
		</>
	);
};
