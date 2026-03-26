import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, ROUTES, ReferralLinks, Translation } from '@/shared/config';
import { Modal } from '@/shared/ui/Modal';

import { useDeleteReferralLinkMutation } from '../../api/deleteReferralLinkApi';

interface DeleteReferralLinkModalProps {
	id: string;
	isOpen: boolean;
	onClose: () => void;
}

export const DeleteReferralLinkModal = ({ id, isOpen, onClose }: DeleteReferralLinkModalProps) => {
	const { t } = useTranslation(i18Namespace.referralLink);
	const { t: tTranslation } = useTranslation(i18Namespace.translation);
	const navigate = useNavigate();
	const [deleteReferralLink, { isLoading }] = useDeleteReferralLinkMutation();

	const handleConfirm = async () => {
		try {
			await deleteReferralLink(id).unwrap();
			onClose();
			navigate(ROUTES.admin.referralLinks.page);
		} catch {
			// Ошибка обработана в onQueryStarted в deleteReferralLinkApi.ts
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title={tTranslation(Translation.MODAL_BLOCK_TITLE)}
			buttonPrimaryText={tTranslation(Translation.MODAL_ACTIONS_OK)}
			buttonOutlineText={tTranslation(Translation.MODAL_ACTIONS_CANCEL)}
			buttonPrimaryClick={handleConfirm}
			buttonOutlineClick={onClose}
			buttonPrimaryDisabled={isLoading}
			buttonOutlineDisabled={isLoading}
		>
			{t(ReferralLinks.DELETE_MODAL_TEXT)}
		</Modal>
	);
};
