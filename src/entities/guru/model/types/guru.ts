export interface Guru {
	title: string;
	name: string;
	specializations: number[];
	hasPractice: boolean;
	description: string;
	image: string;
	socials: GuruSocials;
}

export type GuruSocials = {
	telegram: string;
	youtube?: string;
	profileId: string;
	landing: string;
};
