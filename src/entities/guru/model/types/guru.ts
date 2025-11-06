export interface Guru {
	title: string;
	name: string;
	specializations: number[];
	image: string;
	hasPractice: boolean;
	description: string;
	socials: GuruSocials;
}

export type GuruSocials = {
	telegram: string;
	youtube?: string;
	profileId: string;
	landing?: string;
};
