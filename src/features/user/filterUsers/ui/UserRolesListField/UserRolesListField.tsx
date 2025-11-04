import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { User } from '@/shared/config/i18n/i18nTranslations';
import { convertRoleNameToEnumKey } from '@/shared/helpers/convertRoleNameToEnumKey';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

import { useGetUserRolesListQuery, UserRole } from '@/entities/user';

interface UserRolesListFieldProps {
	selectedRoles?: number[];
	onChangeRoles: (roles?: number[]) => void;
}

export const UserRolesListField = ({ onChangeRoles, selectedRoles }: UserRolesListFieldProps) => {
	const { t } = useTranslation(i18Namespace.user);

	const { data } = useGetUserRolesListQuery();

	const onClick = (roleId: number) => {
		const isDataExist = selectedRoles?.some((item) => item === roleId);
		const filteredRoles = (selectedRoles || []).filter((item) => item !== roleId);
		const filteredRolesItems = filteredRoles.length > 0 ? filteredRoles : undefined;
		const updates = isDataExist ? filteredRolesItems : [...(selectedRoles || []), roleId];
		onChangeRoles(updates);
	};

	if (!data) return null;

	const preparedData = data.map((role: UserRole) => ({
		id: role.id,
		title: t(User[convertRoleNameToEnumKey(role.name)]),
		active: selectedRoles?.some((selectedRoleIds) => role.id === selectedRoleIds),
	}));

	return <BaseFilterSection data={preparedData} title={t(User.FILTER_ROLE)} onClick={onClick} />;
};
