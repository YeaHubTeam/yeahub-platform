import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { Tab, Tabs, useTabs } from '@/shared/ui/Tabs';

import { AccountTab } from './tabs/AccountTab/AccountTab';
import { ChangePasswordTab } from './tabs/ChangePasswordTab/ChangePasswordTab';
import { EmailConfirmationTab } from './tabs/EmailConfirmationTab/EmailConfirmationTab';
import { SubscriptionTab } from './tabs/SubscriptionTab/SubscriptionTab';

type SettingProfileTab = 'select-tariff' | 'change-password' | 'email-verify' | 'account';

const getTabs = (t: (arg: string) => string): Tab<SettingProfileTab>[] => [
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

const SettingsProfilePage = () => {
	const { t } = useTranslation(i18Namespace.profile);

	const tabs = getTabs(t);
	const { activeTab, setActiveTab } = useTabs(tabs);

	const ActiveComponent = activeTab.Component;

	return (
		<>
			<Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
			<ActiveComponent />
		</>
	);
};

export default SettingsProfilePage;
