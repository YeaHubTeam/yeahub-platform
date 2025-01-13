import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { toCamelCase } from '@/shared/helpers/toCamelCase';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

import { useGetUserRolesListQuery } from '../../api/userApi';
import { UserRole } from '../../model/types/user';

interface ChooseUsersRoleProps {
	selectedRoleIds?: number[];
	onChangeRoles: (roles: number[]) => void;
}

export const ChooseUsersRole = ({ onChangeRoles, selectedRoleIds }: ChooseUsersRoleProps) => {
	const { t } = useTranslation(i18Namespace.user);

	const { data } = useGetUserRolesListQuery();

	const onClick = (roleId: number) => {
		const isDataExist = selectedRoleIds?.some((item) => item === roleId);
		const updates = isDataExist
			? (selectedRoleIds || []).filter((item) => item !== roleId)
			: [...(selectedRoleIds || []), roleId];
		onChangeRoles(updates);
	};

	if (!data) return null;

	const preparedData = data.map((role: UserRole) => ({
		id: role.id,
		title: t(`roles.${toCamelCase(role.name)}`, { defaultValue: toCamelCase(role.name) }),
		active: selectedRoleIds?.some((selectedRoleIds) => role.id === selectedRoleIds),
	}));

	return <BaseFilterSection data={preparedData} title={t('filter.role.title')} onClick={onClick} />;
};
