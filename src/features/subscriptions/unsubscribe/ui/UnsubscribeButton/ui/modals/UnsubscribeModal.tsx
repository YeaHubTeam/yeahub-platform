import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Subscription, Translation } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector } from '@/shared/hooks';
import { Modal } from '@/shared/ui/Modal';
import { TextHtml } from '@/shared/ui/TextHtml';

import { getFullProfile } from '@/entities/profile';

import { useGetSubscriptionInfoQuery } from '@/features/subscriptions/unsubscribe/ui/UnsubscribeButton/api/getSubscriptionInfoApi';
import { useUnsubscribeMutation } from '@/features/subscriptions/unsubscribe/ui/UnsubscribeButton/api/unsubscribeApi';

import { UnsubscribeModalProps } from '../../model/types/types';

import styles from './UnsubscribeModal.module.css';

export const UnsubscribeModal = ({ isOpen, onClose }: UnsubscribeModalProps) => {
	const { t } = useTranslation([i18Namespace.subscription, i18Namespace.translation]);

	const profile = useAppSelector(getFullProfile);

	const { data } = useGetSubscriptionInfoQuery(profile?.id);
	const subscriptionId = data?.[0]?.subscriptionId;

	const [unsubscribe] = useUnsubscribeMutation();

	const handleClose = () => {
		onClose();
	};

	const handleUnsubscribe = () => {
		unsubscribe({
			subscriptionId: subscriptionId,
			userId: profile?.id,
		});
		onClose();
	};

	return (
		<Modal
			title={t(Subscription.UNSUBSCRIBE_MODAL_TITLE)}
			variant="error"
			buttonPrimaryText={t(Subscription.UNSUBSCRIBE_MODAL_BUTTON)}
			buttonOutlineText={t(Translation.CANCEL, { ns: 'translation' })}
			buttonOutlineClick={handleClose}
			buttonPrimaryClick={handleUnsubscribe}
			isOpen={isOpen}
			onClose={handleClose}
		>
			<TextHtml
				html={t(Subscription.UNSUBSCRIBE_MODAL_DESCRIPTION)}
				className={styles.description}
			/>
		</Modal>
	);
};
