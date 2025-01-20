import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { User } from '@/shared/config/i18n/i18nTranslations';
import { SelectWithChips } from '@/shared/ui/SelectWithChips';

import { UserRole } from '../../model/types/user';

import styles from './UserSelect.module.css';

type UserSelectProps = {
	value: number[];
	onChange: (value: number[]) => void;
	availableRoles: UserRole[];
	disabled?: boolean;
	hasMultiple?: boolean;
};

const convertRoleNameToEnumKey = (roleName: string): keyof typeof User => {
	return roleName.replace(/-/g, '_').toUpperCase() as keyof typeof User;
};

export const UserSelect = ({
	value,
	onChange,
	availableRoles,
	disabled,
}: UserSelectProps): JSX.Element => {
	const { t } = useTranslation([i18Namespace.user]);

	const handleChange = (selectedValue?: string) => {
		if (selectedValue) {
			handleAddRole(selectedValue);
		}
	};

	const handleAddRole = (roleId: string) => {
		const updatedRoles = [...value, Number(roleId)];
		onChange(updatedRoles);
	};

	const roleOptions = useMemo(
		() =>
			availableRoles
				.filter((role) => !value.includes(role.id))
				.map((role) => ({
					label: role.name,
					value: role.id.toString(),
				})),
		[availableRoles, value],
	);

	const rolesDictionary = useMemo(
		() =>
			availableRoles.reduce(
				(acc, role) => {
					acc[role.id] = { id: role.id, title: t(User[convertRoleNameToEnumKey(role.name)]) };
					return acc;
				},
				{} as Record<number, { id: number; title: string }>,
			),
		[availableRoles],
	);

	return (
		<div className={styles.container}>
			<SelectWithChips
				options={roleOptions}
				onChange={handleChange}
				selectedItems={value}
				handleDeleteItem={() => () => {}}
				itemsDictionary={rolesDictionary}
				placeholder={t(User.SELECT_CHOOSE)}
				disabled={disabled}
			/>
		</div>
	);
};
