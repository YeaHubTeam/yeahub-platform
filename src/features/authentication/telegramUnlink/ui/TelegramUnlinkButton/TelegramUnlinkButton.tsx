import { useTranslation } from 'react-i18next';

import { i18Namespace, Profile } from '@/shared/config';
import { useModal } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';

import { useTelegramUnlinkMutation } from '../../api/telegramUnlinkApi';
import ConfirmTelegramUnlinkModal from '../ConfirmTelegramUnlinkModal/ConfirmTelegramUnlinkModal';

export const TelegramUnlinkButton = () => {
	const { t } = useTranslation(i18Namespace.profile);

	const {
		isOpen: isOpenTelegramUnlinkConfirmModal,
		onClose: onCloseTelegramUnlinkConfirmModal,
		onOpen: onOpenTelegramUnlinkConfirmModal,
	} = useModal();

	const [telegramUnlink, { isLoading }] = useTelegramUnlinkMutation();

	const onTelegramUnlink = () => {
		telegramUnlink();
		onCloseTelegramUnlinkConfirmModal();
	};

	return (
		<>
			<Button variant="destructive" onClick={onOpenTelegramUnlinkConfirmModal} disabled={isLoading}>
				{t(Profile.TELEGRAM_VERIFIED_BUTTON)}
			</Button>
			<ConfirmTelegramUnlinkModal
				isOpen={isOpenTelegramUnlinkConfirmModal}
				onOk={onTelegramUnlink}
				onClose={onCloseTelegramUnlinkConfirmModal}
			/>
		</>
	);
};
