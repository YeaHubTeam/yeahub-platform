//TODO: change name
export interface Subscription {
	id: number;
	icon: React.ReactNode;
	name: string;
	description: string;
	price: number;
	hasSubscribeButton: boolean;
	discountedPrice?: number;
	advantages: { title: string; isActive: boolean }[];
}

export type SubscriptionPermission = {
	id: number;
	name: string;
};

export type SubscriptionRole = {
	id: number;
	name: string;
	permissions: SubscriptionPermission[];
};

export type SubscriptionRoot = {
	id: number;
	name: string;
	pricePerMonth: number;
	description: boolean;
	roles: SubscriptionRole[];
};

export interface UserSubscription {
	id: string;
	createDate: string;
	endDate: string;
	subscriptionId: number;
	userId: string;
	subscription: SubscriptionRoot;
}

export type GetUserSubscriptionResponse = UserSubscription[];
