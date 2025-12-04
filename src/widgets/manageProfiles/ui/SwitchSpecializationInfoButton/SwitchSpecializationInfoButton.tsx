import { useTranslation } from 'react-i18next';

import { i18Namespace, Profile } from '@/shared/config';
import { useModal } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';

import { SwitchSpecializationInfoModal } from '../SwitchSpecializationInfoModal/SwitchSpecializationInfoModal';

export const SwitchSpecializationInfoButton = () => {
	const { t } = useTranslation(i18Namespace.profile);
	const { isOpen, onClose, onToggle } = useModal();

	return (
		<>
			<Button
				size="large"
				variant="link"
				preffix={<Icon size={24} icon="lamp" />}
				onClick={onToggle}
			>
				{t(Profile.MANAGE_PROFILES_MODAL_HOW_SWITCH_SPECIALIZATION_BUTTON)}
			</Button>
			<SwitchSpecializationInfoModal
				buttonOutlineClick={onClose}
				isOpen={isOpen}
				onClose={onClose}
			/>
		</>
	);
};
