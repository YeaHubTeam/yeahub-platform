export type SocialNetworkCode =
	| 'instagram'
	| 'linkedin'
	| 'twitter'
	| 'github'
	| 'behance'
	| 'whatsapp'
	| 'telegram';

export interface SocialNetwork {
	code: SocialNetworkCode;
	title: string;
}

export interface SocialFormValues {
	socialNetwork: SocialNetwork[];
}
