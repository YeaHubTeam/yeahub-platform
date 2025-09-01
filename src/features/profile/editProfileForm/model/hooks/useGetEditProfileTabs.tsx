import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { Tab, useTabs } from '@/shared/ui/Tabs';

import { AboutMeTabForm } from '../../ui/AboutMeTabForm/AboutMeTabForm';
import { AboutMeTabFormSkeleton } from '../../ui/AboutMeTabForm/AboutMeTabForm.skeleton';
import { PersonalInformationTabForm } from '../../ui/PersonalInformationTabForm/PersonalInformationTabForm';
import { PersonalInformationTabFormSkeleton } from '../../ui/PersonalInformationTabForm/PersonalInformationTabForm.skeleton';
import { SkillsTabForm } from '../../ui/SkillsTabForm/SkillsTabForm';
import { SkillsTabFormSkeleton } from '../../ui/SkillsTabForm/SkillsTabForm.skeleton';

type EditProfileTab = 'personal-information' | 'about-me' | 'skills';

interface UseGetEditProfileTabsResult {
	tabs: Tab<EditProfileTab>[];
	activeTab: Tab<EditProfileTab>;
	setActiveTab: Dispatch<SetStateAction<Tab<EditProfileTab>>>;
}

export const useGetEditProfileTabs = (isSkeleton?: boolean): UseGetEditProfileTabsResult => {
	const { t } = useTranslation(i18Namespace.profile);

	const tabs: Tab<EditProfileTab>[] = [
		{
			id: 'personal-information',
			label: t(Profile.TABS_PERSONAL),
			Component: isSkeleton ? PersonalInformationTabFormSkeleton : PersonalInformationTabForm,
		},
		{
			id: 'about-me',
			label: t(Profile.TABS_ABOUT_ME),
			Component: isSkeleton ? AboutMeTabFormSkeleton : AboutMeTabForm,
		},
		{
			id: 'skills',
			label: t(Profile.TABS_SKILLS),
			Component: isSkeleton ? SkillsTabFormSkeleton : SkillsTabForm,
		},
	];

	const { activeTab, setActiveTab } = useTabs(tabs);

	return {
		setActiveTab,
		tabs,
		activeTab,
	};
};
