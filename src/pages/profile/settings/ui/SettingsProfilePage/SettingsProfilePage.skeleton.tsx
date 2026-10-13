import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

import { TabsSkeleton } from '@/shared/ui/Tabs';

import { AccountTabSkeleton } from '../tabs/AccountTab/AccountTab.skeleton';
import { ChangePasswordTabSkeleton } from '../tabs/ChangePasswordTab/ChangePasswordTab.skeleton';
import { EmailConfirmationTabSkeleton } from '../tabs/EmailConfirmationTab/EmailConfirmationTab.skeleton';
import { FreeSubscriptionTabSkeleton } from '../tabs/FreeSubscriptionTab/FreeSubscriptionTab.skeleton';

type SettingProfileTab = 'select-tariff' | 'change-password' | 'email-verify' | 'account';

export const SettingsProfilePageSkeleton = () => {
	const location = useLocation();
	const currentTab = location.hash.replace('#', '') as SettingProfileTab;
	const tabs: Record<SettingProfileTab, ReactNode> = {
		'select-tariff': <FreeSubscriptionTabSkeleton />,
		'change-password': <ChangePasswordTabSkeleton />,
		'email-verify': <EmailConfirmationTabSkeleton />,
		account: <AccountTabSkeleton />,
	};

	return (
		<>
			<TabsSkeleton tabs={Object.keys(tabs)} />
			{tabs[currentTab] || <FreeSubscriptionTabSkeleton />}
		</>
	);
};
