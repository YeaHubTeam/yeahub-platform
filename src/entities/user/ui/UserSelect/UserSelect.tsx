import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { User as UserI18n } from '@/shared/config/i18n/i18nTranslations';
import { Dropdown, Option } from '@/shared/ui/Dropdown';
import { Flex } from '@/shared/ui/Flex';
import { SelectWithChips } from '@/shared/ui/SelectWithChips';
import { Text } from '@/shared/ui/Text';

import { useGetUsersListQuery } from '../../api/userApi';

export type UserSelectProps = Omit<
	React.ComponentProps<typeof Dropdown>,
	'options' | 'type' | 'value' | 'onChange' | 'children'
> & {
	value?: string | string[];
	onChange: (value: string | string[]) => void;
	hasMultiple?: boolean;
	disabled?: boolean;
};

export const UserSelect = ({ value, onChange, hasMultiple, disabled }: UserSelectProps) => {
	const { t } = useTranslation(i18Namespace.user);
	const { data: users } = useGetUsersListQuery({ page: 1, limit: 10 });

	const [selectedUsers, setSelectedUsers] = useState<string[]>(
		Array.isArray(value) ? value : value ? [value] : [],
	);

	useEffect(() => {
		setSelectedUsers(Array.isArray(value) ? value : value ? [value] : []);
	}, [value]);

	const handleChange = (newValue: string | undefined) => {
		if (disabled || !newValue) return;

		if (hasMultiple) {
			const updates = [...selectedUsers, newValue];
			setSelectedUsers(updates);
			onChange(updates);
		} else {
			setSelectedUsers([newValue]);
			onChange([newValue]);
		}
	};

	const handleDeleteUser = (id: string) => () => {
		if (disabled) return;
		const updates = selectedUsers.filter((userId) => userId !== id);
		setSelectedUsers(updates);
		onChange(updates);
	};

	const options = useMemo(() => {
		const allOptions = (users?.data || []).map((user) => ({
			label: user.username,
			value: user.id.toString(),
		}));

		if (hasMultiple) {
			return allOptions.filter((opt) => !selectedUsers.includes(opt.value));
		}
		return allOptions;
	}, [users, selectedUsers, hasMultiple]);

	const usersDictionary = useMemo(() => {
		const emptyUser = {
			id: '0',
			title: t(UserI18n.SELECT_CHOOSE),
		};

		return (users?.data || []).reduce(
			(acc, user) => {
				acc[user.id.toString()] = {
					id: user.id.toString(),
					title: user.username,
				};
				return acc;
			},
			{ '0': emptyUser } as Record<string, { id: string; title: string }>,
		);
	}, [users, t]);

	return (
		<Flex direction="column" align="start" gap="8">
			<Text variant="body2" color="black-700">
				{t(UserI18n.USER_NAME)}
			</Text>
			{!hasMultiple ? (
				<Dropdown
					size="S"
					label={options.length ? t(UserI18n.SELECT_CHOOSE) : t(UserI18n.SELECT_EMPTY)}
					disabled={disabled}
					value={usersDictionary[selectedUsers[0] || '0']?.title ?? ''}
					onSelect={(val) => handleChange(String(val))}
				>
					{options.map((option) => (
						<Option value={option.value} label={option.label} key={option.value} />
					))}
				</Dropdown>
			) : (
				<SelectWithChips
					size="S"
					title={t(UserI18n.SELECT_SELECTED)}
					options={options}
					onChange={handleChange}
					selectedItems={selectedUsers}
					handleDeleteItem={handleDeleteUser}
					itemsDictionary={usersDictionary}
					placeholder={options.length ? t(UserI18n.SELECT_CHOOSE) : t(UserI18n.SELECT_EMPTY)}
					disabled={disabled}
				/>
			)}
		</Flex>
	);
};
