import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { Tabs } from '@/shared/ui/Tabs';

import {
	AccountTab,
	EmailConfirmationTab,
	SubscriptionTab,
	ChangePasswordTab,
} from '@/widgets/Profile';

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
	{
		id: 3,
		title: 'account',
		label: t(Profile.SETTINGS_TABS_ACCOUNT),
		Component: AccountTab,
	},
];

const SettingsProfilePage = () => {
	const { hash } = useLocation();
	const { t } = useTranslation(i18Namespace.profile);

	const tabs = getTabs(t);

	const index = tabs.findIndex((tab) => tab.title === hash.slice(1));

	const [currentActiveTab, setCurrentActiveTab] = useState(() => {
		return index !== -1 ? index : 0;
	});

	useEffect(() => {
		if (index !== -1) {
			setCurrentActiveTab(index);
		}
	}, [hash]);

	const ActiveComponent = tabs[currentActiveTab].Component;

	return (
		<>
			<Tabs tabs={tabs} tabToggle={currentActiveTab} setTabToggle={setCurrentActiveTab} />
			<ActiveComponent />
		</>
	);
};

export default SettingsProfilePage;
