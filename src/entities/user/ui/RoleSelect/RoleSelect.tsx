import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, User } from '@/shared/config';
import { EntitySelect, type EntitySelectProps } from '@/shared/ui/EntitySelect';

import { UserRole } from '../../model/types/user';
import { convertRoleNameToEnumKey } from '../../model/utils/convertRoleNameToEnumKey';

import styles from './RoleSelect.module.css';

export type RoleSelectProps = Pick<
	EntitySelectProps<number>,
	'value' | 'disabled' | 'hasMultiple'
> & {
	onChange: (value: number[]) => void;
	availableRoles: UserRole[];
};

export const RoleSelect = ({
	value,
	onChange,
	availableRoles,
	disabled,
	hasMultiple = true,
}: RoleSelectProps) => {
	const { t } = useTranslation(i18Namespace.user);

	const items = useMemo(
		() =>
			availableRoles.map((role) => ({
				id: role.id,
				title: t(User[convertRoleNameToEnumKey(role.name)]),
			})),
		[availableRoles, t],
	);

	return (
		<div className={styles.container}>
			<EntitySelect
				items={items}
				value={value}
				onChange={(v) => onChange(Array.isArray(v) ? v : [v])}
				hasMultiple={hasMultiple}
				disabled={disabled}
				chooseTranslationKey={t(User.SELECT_CHOOSE)}
				emptyTranslationKey={t(User.SELECT_EMPTY)}
				selectedTranslationKey={t(User.SELECT_SELECTED)}
			/>
		</div>
	);
};
