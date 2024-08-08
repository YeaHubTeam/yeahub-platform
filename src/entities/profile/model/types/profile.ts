// import { IconsName } from 'yeahub-ui-kit/build/components/Icon/common';

interface Skill {
	id: number;
	title: string;
	description: string;
	imageSrc: string;
	createdAt: string;
	updatedAt: string;
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
}

// export interface ProfileInfo {
// 	id: string;
// 	first_name: string;
// 	last_name: string;
// 	status: string;
// 	age: number;
// 	position: string;
// 	schedule: string;
// 	experience: number;
// 	location: string;
// 	phone: string;
// 	email: string;
// 	img: string;
// }

// export interface ProfileLink {
// 	id: string;
// 	name: string;
// }

// export interface ProfileSkill {
// 	id: string;
// 	name: string;
// 	iconName: IconsName;
// }

// export interface ProfileProject {
// 	id: string;
// 	name: string;
// 	imgUrl: string;
// }

// export interface ProfileExperience {
// 	id: string;
// 	name: string;
// 	imgUrl: string;
// 	company: string;
// 	schedule: string;
// 	seniority: string;
// 	location: string;
// }

// export interface ProfileEducation {
// 	id: number;
// 	university: string;
// 	name: string;
// 	rank: string;
// 	time: string;
// }

// export interface ProfileAchievment {
// 	id: number;
// 	img: string;
// }
