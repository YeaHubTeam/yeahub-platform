import { useTranslation } from 'react-i18next';

import { i18Namespace, Subscription } from '@/shared/config';
import { useModal } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';

import { SubscribeModal } from '../SubscribeModal/SubscribeModal';

interface SubscribeButtonProps {
	subscriptionId: number;
}

export const SubscribeButton = ({ subscriptionId }: SubscribeButtonProps) => {
	const { t } = useTranslation(i18Namespace.subscription);
	const { isOpen, onOpen, onClose } = useModal();

	return (
		<>
			<Button size="large" fullWidth onClick={onOpen}>
				{t(Subscription.CARD_SUBSCRIBE)}
			</Button>
			<SubscribeModal onClose={onClose} isOpen={isOpen} subscriptionId={subscriptionId} />
		</>
	);
};
