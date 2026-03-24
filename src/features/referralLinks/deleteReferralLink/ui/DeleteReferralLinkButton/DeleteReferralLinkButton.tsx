import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, ReferralLinks } from '@/shared/config';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';

import { DeleteReferralLinkModal } from '../DeleteReferralLinkModal/DeleteReferralLinkModal';

interface DeleteReferralLinkButtonProps {
	id: string;
}

export const DeleteReferralLinkButton = ({ id }: DeleteReferralLinkButtonProps) => {
	const { t } = useTranslation(i18Namespace.referralLink);
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<Button
				variant="tertiary-link"
				preffix={<Icon icon="trash" size={24} />}
				onClick={() => setIsModalOpen(true)}
			>
				{t(ReferralLinks.ACTION_DELETE)}
			</Button>
			<DeleteReferralLinkModal id={id} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
		</>
	);
};
