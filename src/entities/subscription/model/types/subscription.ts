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

export interface UserSubscription {
	id: string;
	createDate?: string | undefined;
	endDate?: string;
	subscriptionId: number;
	userId: string;
	subscription: {
		id: number;
		name: string;
		pricePerMonth: number;
		description: boolean;
		roles: [
			{
				id: number;
				name: string;
				permissions: SubscriptionPermissions[];
			},
		];
	};
}

export type GetUserSubscriptionRespons = UserSubscription[] | undefined;
