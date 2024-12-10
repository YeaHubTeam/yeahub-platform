import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Tabs } from '@/shared/ui/Tabs';

import { ChangePasswordTab, EmailConfirmationTab, SubscriptionTab } from '@/widgets/Profile';

const getTabs = (t: (arg: string) => string) => [
	{
		id: 0,
		title: 'select-tariff',
		label: t(Translation.SELECT_TARIFF),
		Component: SubscriptionTab,
	},
	{
		id: 1,
		title: 'change-password',
		label: t(Translation.CHANGE_PASSWORD),
		Component: ChangePasswordTab,
	},
	{
		id: 2,
		title: 'email-verify',
		label: t(Translation.EMAIL_VERIFY),
		Component: EmailConfirmationTab,
	},
];

const SettingsProfilePage = () => {
	const { hash } = useLocation();
	const { t } = useI18nHelpers(i18Namespace.profile);

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
