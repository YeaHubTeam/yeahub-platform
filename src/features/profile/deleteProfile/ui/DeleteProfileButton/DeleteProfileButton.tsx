import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useModal } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';

import { DeleteProfileModal } from './DeleteProfileModal/DeleteProfileModal';

interface DeleteProfileButtonProps {
	profileId: string;
	className?: string;
}

export const DeleteProfileButton = ({ profileId, className = '' }: DeleteProfileButtonProps) => {
	const { t } = useTranslation(i18Namespace.translation);

	const { isOpen, onOpen, onClose } = useModal();

	return (
		<>
			<Button variant="link" destructive onClick={onOpen} className={className}>
				{t(Translation.DELETE)}
			</Button>
			<DeleteProfileModal profileId={profileId} isOpen={isOpen} onClose={onClose} />
		</>
	);
};
