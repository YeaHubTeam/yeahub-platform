import { i18Namespace } from '@/shared/config/i18n';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

import { useGetRolesListQuery } from '../../api/userRoleApi';
import { UserRole } from '../../model/types/user';

interface ChooseUsersRoleProps {
	selectedRoles?: number[];
	onChangeRoles: (roles: number[]) => void;
}

export const ChooseUsersRole = ({ onChangeRoles, selectedRoles }: ChooseUsersRoleProps) => {
	const { t } = useI18nHelpers(i18Namespace.user);

	const { data } = useGetRolesListQuery();

	const onClick = (roleId: number) => {
		const isDataExist = selectedRoles?.some((item) => item === roleId);
		const updates = isDataExist
			? (selectedRoles || []).filter((item) => item !== roleId)
			: [...(selectedRoles || []), roleId];
		onChangeRoles(updates);
	};

	if (!data) return null;

	const preparedData = (data || []).map((role: UserRole) => ({
		id: role.id,
		title: t(`roles.${role.name}`, { defaultValue: role.name }),
		active: selectedRoles?.some((selectedRole) => role.id === selectedRole),
	}));

	return <BaseFilterSection data={preparedData} title={t('filter.role.title')} onClick={onClick} />;
};
