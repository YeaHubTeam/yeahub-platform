import { useModal } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';

import { SubscribeModal } from '../SubscribeModal/SubscribeModal';

interface SubscribeButtonProps {
	subscriptionId: number;
}

export const SubscribeButton = ({ subscriptionId }: SubscribeButtonProps) => {
	const { isOpen, onOpen, onClose } = useModal();

	return (
		<>
			<Button size="large" fullWidth onClick={onOpen}>
				Подписаться
			</Button>
			<SubscribeModal onClose={onClose} isOpen={isOpen} subscriptionId={subscriptionId} />
		</>
	);
};
