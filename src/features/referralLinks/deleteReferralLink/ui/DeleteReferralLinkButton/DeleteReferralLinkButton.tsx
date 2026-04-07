import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, ReferralLinks } from '@/shared/config';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';

import { DeleteReferralLinkModal } from '../DeleteReferralLinkModal/DeleteReferralLinkModal';

interface DeleteReferralLinkButtonProps {
	id: string;
	isDetailPage?: boolean;
}

export const DeleteReferralLinkButton = ({
	id,
	isDetailPage = false,
}: DeleteReferralLinkButtonProps) => {
	const { t } = useTranslation(i18Namespace.referralLink);
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<Button
				preffix={!isDetailPage && <Icon icon="trash" size={24} />}
				variant={isDetailPage ? 'destructive' : 'tertiary-link'}
				onClick={() => setIsModalOpen(true)}
			>
				{t(ReferralLinks.ACTION_DELETE)}
			</Button>
			<DeleteReferralLinkModal id={id} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
		</>
	);
};
