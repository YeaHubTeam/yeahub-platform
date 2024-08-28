interface Skill {
	id: number;
	title: string;
	description: string;
	imageSrc: string;
	createdAt: string;
	updatedAt: string;
}

export interface socialNetwork {
	code: string;
	title: string;
}

export interface User {
	address: string;
	avatarUrl: string;
	birthday: string;
	city: string;
	country: string;
	createdAt: string;
	email: string;
	firstName: string;
	id: string;
	lastName: string;
	passwordHash: string;
	phone: string;
	refreshToken: string;
	updatedAt: string;
	userRoles: string[];
}

export interface Profile {
	id: string;
	userId: string;
	profileType: number;
	specializationId: number;
	markingWeight: number;
	description: string;
	links: string[];
	image_src: string;
	profileSkills: Skill[];
	socialNetwork: socialNetwork[];
	user: User;
}
