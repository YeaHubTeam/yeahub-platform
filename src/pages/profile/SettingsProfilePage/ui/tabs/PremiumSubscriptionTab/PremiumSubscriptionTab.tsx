import { ActiveSubscriptionInfo } from '@/features/subscriptions/activeSubscription';
import { PaymentHistory } from '@/features/subscriptions/paymentHistory';

export const PremiumSubscriptionTab = () => {
	return (
		<>
			<ActiveSubscriptionInfo />
			<PaymentHistory />
		</>
	);
};
