import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Profile } from '@/shared/config';
import { Tab, useTabs } from '@/shared/ui/Tabs';

import { AccountTab } from '../../ui/tabs/account/AccountTab/AccountTab';
import { ChangePasswordTab } from '../../ui/tabs/changePassword/ChangePasswordTab/ChangePasswordTab';
import { SubscriptionTab } from '../../ui/tabs/subscriptions/SubscriptionTab/SubscriptionTab';
import { EmailConfirmationTab } from '../../ui/tabs/verification/EmailConfirmationTab/EmailConfirmationTab';

type SettingProfileTab = 'select-tariff' | 'change-password' | 'email-verify' | 'account';

interface UseGetSettingsProfileTabsResult {
	tabs: Tab<SettingProfileTab>[];
	activeTab: Tab<SettingProfileTab>;
	setActiveTab: Dispatch<SetStateAction<Tab<SettingProfileTab>>>;
}

export const useGetSettingsProfileTabs = (): UseGetSettingsProfileTabsResult => {
	const { t } = useTranslation(i18Namespace.profile);

	const tabs: Tab<SettingProfileTab>[] = [
		{
			id: 'select-tariff',
			label: t(Profile.SETTINGS_TABS_SELECT_TARIFF),
			Component: SubscriptionTab,
		},
		{
			id: 'change-password',
			label: t(Profile.SETTINGS_TABS_CHANGE_PASSWORD),
			Component: ChangePasswordTab,
		},
		{
			id: 'email-verify',
			label: t(Profile.SETTINGS_TABS_VERIFY_EMAIL),
			Component: EmailConfirmationTab,
		},
		{
			id: 'account',
			label: t(Profile.SETTINGS_TABS_ACCOUNT),
			Component: AccountTab,
		},
	];

	const { activeTab, setActiveTab } = useTabs(tabs);

	return {
		tabs,
		setActiveTab,
		activeTab,
	};
};
