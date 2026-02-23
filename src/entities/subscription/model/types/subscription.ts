export type SubscriptionPermission = {
	id: number;
	name: string;
};

export type SubscriptionRole = {
	id: number;
	name: string;
	permissions: SubscriptionPermission[];
};

export type SubscriptionCode = 'base' | 'free' | 'quarter' | 'year' | 'trial' | 'month';

export type Subscription = {
	id: number;
	name: string;
	code: SubscriptionCode;
	isActive: boolean;
	pricePerMonth: number;
	discount: number;
	monthPeriod: number;
	description: boolean;
	promo: string;
	roles: SubscriptionRole[];
	finalPrice: number;
};

type SubscriptionState = 'canceled' | 'active' | 'inactive';

export interface UserSubscription {
	id: string;
	createDate: string;
	endDate: string;
	subscriptionId: number;
	userId: string;
	state: SubscriptionState;
	subscription: Subscription;
}
export interface ActiveSubscriptionState {
	subscription: UserSubscription | null;
}

export type GetUserSubscriptionResponse = UserSubscription[];
export type GetSubscriptionsResponse = Subscription[];
