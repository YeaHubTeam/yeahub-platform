import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

import { useGetRolesListQuery } from '../../api/userRoleApi';
import { UserRole } from '../../model/types/user';

interface ChooseUsersRoleProps {
	selectedRoleIds?: number[];
	onChangeRoles: (roles: number[]) => void;
}

const toCamelCase = (str: string): string => {
	return str
		.split('-')
		.map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
		.join('');
};

export const ChooseUsersRole = ({ onChangeRoles, selectedRoleIds }: ChooseUsersRoleProps) => {
	const { t } = useTranslation(i18Namespace.user);

	const { data } = useGetRolesListQuery();

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
