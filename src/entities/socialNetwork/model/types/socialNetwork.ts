export type SocialNetworkCode =
	| 'instagram'
	| 'linkedin'
	| 'twitter'
	| 'github'
	| 'behance'
	| 'whatsapp'
	| 'telegram'
	| 'facebook'
	| 'youtube';

export interface SocialNetwork {
	code: SocialNetworkCode;
	title: string;
}
