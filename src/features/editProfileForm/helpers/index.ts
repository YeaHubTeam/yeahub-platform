import { Profile as ProfileI18 } from '@/shared/config/i18n/i18nTranslations';

import { Profile } from '@/entities/profile';
import { SkillsForm } from '@/entities/skill';
import { AboutMeForm, PersonalInformationForm } from '@/entities/user';

import { ProfileSchema } from '../model/types/profileTypes';
export const getTabs = (t: (arg: string) => string) => [
	{
		id: 0,
		title: 'personal-information',
		label: t(ProfileI18.TABS_ITEMS_PERSONALINFORMATION),
		Component: PersonalInformationForm,
	},
	{
		id: 1,
		title: 'about-me',
		label: t(ProfileI18.TABS_ITEMS_ABOUTME),
		Component: AboutMeForm,
	},
	{
		id: 2,
		title: 'skills',
		label: t(ProfileI18.TABS_ITEMS_SKILLS),
		Component: SkillsForm,
	},
	// {
	// 	id: 3,
	// 	title: 'projects',
	// 	label: t('tabs.items.projects'),
	// 	Component: ProjectForm,
	// },
	// {
	// 	id: 4,
	// 	title: 'experience',
	// 	label: t('tabs.items.experience'),
	// 	Component: ExperienceForm,
	// },
	// {
	// 	id: 5,
	// 	title: 'education',
	// 	label: t('tabs.items.education'),
	// 	Component: EducationFrom,
	// },
];

export const mapProfileToForm = (profile: Profile): ProfileSchema => ({
	//image: profile.image_src,
	firstName: profile.user.firstName,
	lastName: profile.user.lastName,
	specialization: profile.specializationId,
	phone: profile.user.phone,
	email: profile.user.email,
	location: profile.user.city,
	socialNetworks: profile.socialNetwork,
	aboutMe: profile.description,
	skills: profile.profileSkills,
});
