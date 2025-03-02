import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { Tabs } from '@/shared/ui/Tabs';

import { EmailConfirmationTab, SubscriptionTab } from '@/widgets/Profile';
import { ChangePasswordTab } from '@/widgets/Profile';

const getTabs = (t: (arg: string) => string) => [
	{
		id: 0,
		title: 'select-tariff',
		label: t(Profile.SETTINGS_TABS_SELECT_TARIFF),
		Component: SubscriptionTab,
	},
	{
		id: 1,
		title: 'change-password',
		label: t(Profile.SETTINGS_TABS_CHANGE_PASSWORD),
		Component: ChangePasswordTab,
	},
	{
		id: 2,
		title: 'email-verify',
		label: t(Profile.SETTINGS_TABS_VERIFY_EMAIL),
		Component: EmailConfirmationTab,
	},
];

const SettingsProfilePage = () => {
	const { hash } = useLocation();
	const { t } = useTranslation(i18Namespace.profile);

	const tabs = getTabs(t);
	const [currentActiveTab, setCurrentActiveTab] = useState(() => {
		return tabs.find((tab) => tab.title === hash.slice(1))?.id ?? 0;
	});

	const ActiveComponent = tabs[currentActiveTab].Component;

	return (
		<>
			<Tabs tabs={tabs} tabToggle={currentActiveTab} setTabToggle={setCurrentActiveTab} />
			<ActiveComponent />
		</>
	);
};

export default SettingsProfilePage;
