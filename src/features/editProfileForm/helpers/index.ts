import { Profile as ProfileI18 } from '@/shared/config/i18n/i18nTranslations';

import { Profile } from '@/entities/profile';

import { ProfileSchema } from '../model/types/editProfileTypes';
import { AboutMeTabForm } from '../ui/AboutMeTabForm/AboutMeTabForm';
import { PersonalInformationTabForm } from '../ui/PersonalInformationTabForm/PersonalInformationTabForm';
import { SkillsTabForm } from '../ui/SkillsTabForm/SkillsTabForm';

export const getTabs = (t: (arg: string) => string) => [
	{
		id: 0,
		title: 'personal-information',
		label: t(ProfileI18.TABS_ITEMS_PERSONALINFORMATION),
		Component: PersonalInformationTabForm,
	},
	{
		id: 1,
		title: 'about-me',
		label: t(ProfileI18.TABS_ITEMS_ABOUTME),
		Component: AboutMeTabForm,
	},
	{
		id: 2,
		title: 'skills',
		label: t(ProfileI18.TABS_ITEMS_SKILLS),
		Component: SkillsTabForm,
	},
	// {
	// 	id: 3,
	// 	title: 'projects',
	// 	label: t('tabs.items.projects'),
	// 	Component: ProjectsTabForm,
	// },
	// {
	// 	id: 4,
	// 	title: 'experience',
	// 	label: t('tabs.items.experience'),
	// 	Component: ExperienceTabForm,
	// },
	// {
	// 	id: 5,
	// 	title: 'education',
	// 	label: t('tabs.items.education'),
	// 	Component: EducationTabFrom,
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
