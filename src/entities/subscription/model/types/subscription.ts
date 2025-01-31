import { FC, SVGProps } from 'react';

export interface Subscription {
	id: number;
	icon: string | FC<SVGProps<SVGSVGElement>>;
	name: string;
	description: string;
	price: number;
	advantages: string[];
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
