import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config';
import { Subscription } from '@/shared/config';
import { useModal } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';

import { UnsubscribeModal } from '../UnsubscribeModal/UnsubscribeModal';

import styles from './UnsubscribeButton.module.css';

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
				variant="tertiary"
				aria-label="Cancel subscription"
				onClick={handleUnsubscribeModalOpen}
				className={styles['unsubscribe-button']}
			>
				{t(Subscription.CANCEL_SUBSCRIPTION)}
			</Button>
			<UnsubscribeModal isOpen={isUnsubscribeModalOpen} onClose={handleUnsubscribeModalClose} />
		</>
	);
};
