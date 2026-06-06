import { useTranslation } from 'react-i18next';

import { i18Namespace, ReferralLinks } from '@/shared/config';
import { DeleteButton } from '@/shared/ui/DeleteButton';

import { useDeleteReferralLinkMutation } from '../../api/deleteReferralLinkApi';

interface DeleteReferralLinkButtonProps {
	referralId: string;
	isDetailPage?: boolean;
}

export const DeleteReferralLinkButton = ({
	referralId,
	isDetailPage = false,
}: DeleteReferralLinkButtonProps) => {
	const { t } = useTranslation(i18Namespace.referralLink);
	const [deleteReferralLink] = useDeleteReferralLinkMutation();

	const onDeleteReferralLink = () => {
		deleteReferralLink(referralId);
	};

	return (
		<DeleteButton
			onDelete={onDeleteReferralLink}
			isDetailPage={isDetailPage}
			modalMessage={t(ReferralLinks.DELETE_MODAL_TEXT)}
		/>
	);
};
