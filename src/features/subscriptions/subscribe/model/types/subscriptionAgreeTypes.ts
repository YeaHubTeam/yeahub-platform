export interface SubscriptionAgreeFormValues {
	email: string;
	isOfferAgreed: boolean;
	isConsentAgreed: boolean;
}

export interface GetPaymentUrlParamsRequest {
	subscriptionId: number;
	email: string;
}
