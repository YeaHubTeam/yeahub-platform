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

export type SubscriptionPermissions = {
	id: number;
	name: string;
};

export type SubscriptionRoles = {
	id: number;
	name: string;
	permissions: SubscriptionPermissions[];
};

export type RootSubscriptionAUserSubscription = {
	id: number;
	name: string;
	pricePerMonth: number;
	description: boolean;
	roles: SubscriptionRoles[];
};

export interface UserSubscription {
	id: string;
	createDate?: string;
	endDate?: string;
	subscriptionId: number;
	userId: string;
	subscription: RootSubscriptionAUserSubscription;
}

export type GetUserSubscriptionResponse = UserSubscription[];
