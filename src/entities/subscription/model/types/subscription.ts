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
