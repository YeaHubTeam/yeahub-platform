import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config';
import { Subscription } from '@/shared/config';
import { useModal } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';

import { UnsubscribeModal } from '../UnsubscribeModal/UnsubscribeModal';

export const UnsubscribeButton = () => {
	const {
		isOpen: isUnsubscribeModalOpen,
		onOpen: handleUnsubscribeModalOpen,
		onClose: handleUnsubscribeModalClose,
	} = useModal();
	const { t } = useTranslation(i18Namespace.subscription);

	return (
		<>
			<Button
				variant="destructive-outline"
				aria-label="Cancel subscription"
				onClick={handleUnsubscribeModalOpen}
			>
				{t(Subscription.CANCEL_SUBSCRIPTION)}
			</Button>
			<UnsubscribeModal isOpen={isUnsubscribeModalOpen} onClose={handleUnsubscribeModalClose} />
		</>
	);
};
