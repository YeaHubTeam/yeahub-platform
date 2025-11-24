import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { Tab, useTabs } from '@/shared/ui/Tabs';

import { AboutMeTabForm } from '../../ui/AboutMeTabForm/AboutMeTabForm';
import { PersonalInformationTabForm } from '../../ui/PersonalInformationTabForm/PersonalInformationTabForm';
import { SkillsTabForm } from '../../ui/SkillsTabForm/SkillsTabForm';
import { EditProfileTab } from '../types/editProfileTypes';

interface UseGetEditProfileTabsResult {
	tabs: Tab<EditProfileTab>[];
	activeTab: Tab<EditProfileTab>;
	setActiveTab: Dispatch<SetStateAction<Tab<EditProfileTab>>>;
}

export const useGetEditProfileTabs = (): UseGetEditProfileTabsResult => {
	const { t } = useTranslation(i18Namespace.profile);

	const tabs: Tab<EditProfileTab>[] = [
		{
			id: 'personal-information',
			label: t(Profile.TABS_PERSONAL),
			Component: PersonalInformationTabForm,
		},
		{
			id: 'about-me',
			label: t(Profile.TABS_ABOUT_ME),
			Component: AboutMeTabForm,
		},
		{
			id: 'skills',
			label: t(Profile.TABS_SKILLS),
			Component: SkillsTabForm,
		},
	];

	const { activeTab, setActiveTab } = useTabs(tabs);

	return {
		setActiveTab,
		tabs,
		activeTab,
	};
};
