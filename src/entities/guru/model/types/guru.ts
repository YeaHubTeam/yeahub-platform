export interface Guru {
	title: string;
	name: string;
	specializationId: number;
	image: string;
	socials: GuruSocials;
}

export type GuruSocials = {
	telegram: string;
	youtube: string;
	profileId: string;
};
