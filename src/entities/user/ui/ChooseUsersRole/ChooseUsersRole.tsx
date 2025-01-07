// import { useState } from 'react';

import { i18Namespace } from '@/shared/config/i18n';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

const roles = [
	{ id: 1, title: '1' },
	{ id: 2, title: '2' },
	{ id: 3, title: '3' },
	{ id: 4, title: '4' },
	{ id: 5, title: '5' },
];

interface ChooseUsersRoleProps {
	selectedRoles?: number[];
	onChangeRoles: (roles: number[]) => void;
}

export const ChooseUsersRole = ({ onChangeRoles, selectedRoles }: ChooseUsersRoleProps) => {
	const { t } = useI18nHelpers(i18Namespace.user);
	// const [roles, setRoles] = useState<Role[]>([]);

	const onClick = (roleId: number) => {
		const isDataExist = selectedRoles?.some((item) => item === roleId);
		const updates = isDataExist
			? (selectedRoles || []).filter((item) => item !== roleId)
			: [...(selectedRoles || []), roleId];
		onChangeRoles(updates);
	};

	const preparedData = roles.map((role) => ({
		...role,
		active: selectedRoles?.some((selectedRole) => role.id === selectedRole),
	}));

	return <BaseFilterSection data={preparedData} title={t('filter.role.title')} onClick={onClick} />;
};
