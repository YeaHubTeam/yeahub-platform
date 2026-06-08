import { useTranslation } from 'react-i18next';

import { i18Namespace, User } from '@/shared/config';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

import { useGetUserRolesListQuery } from '../../api/userApi';
import { UserRole } from '../../model/types/user';
import { convertRoleNameToEnumKey } from '../../model/utils/convertRoleNameToEnumKey';

interface UserRolesListFieldProps {
	selectedRoles?: number[];
	title: string;
	onChangeRoles: (roles?: number[]) => void;
}

export const UserRolesListField = ({
	onChangeRoles,
	selectedRoles,
	title,
}: UserRolesListFieldProps) => {
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

	return <BaseFilterSection data={preparedData} title={title} onClick={onClick} />;
};
