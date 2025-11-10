import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { User as UserI18n } from '@/shared/config/i18n/i18nTranslations';
import { Dropdown, Option } from '@/shared/ui/Dropdown';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { useGetUsersListQuery } from '../../api/userApi';

export type UserSelectProps = Omit<
	React.ComponentProps<typeof Dropdown>,
	'options' | 'type' | 'value' | 'onChange' | 'children'
> & {
	value?: string;
	onChange: (value?: string) => void;
	disabled?: boolean;
};

export const UserSelect = ({ value, onChange, disabled }: UserSelectProps) => {
	const { t } = useTranslation(i18Namespace.user);
	const { data: users } = useGetUsersListQuery({ page: 1, limit: 10 });

	const handleChange = (newValue?: string) => {
		if (disabled) return;
		onChange(newValue);
	};

	const emptyUser = {
		value: 'all',
		label: t(UserI18n.SELECT_CHOOSE),
	};

	const options = useMemo(() => {
		return (users?.data || []).reduce(
			(result, user) => {
				result.push({
					value: user.id.toString(),
					label: user.username,
				});

				return result;
			},
			[emptyUser],
		);
	}, [emptyUser, users]);

	const selectUser = options.find((option) => option.value === value) || emptyUser;

	return (
		<Flex direction="column" align="start" gap="8">
			<Text variant="body2" color="black-700">
				{t(UserI18n.USER_NAME)}
			</Text>
			<Dropdown
				size="S"
				label={selectUser.label}
				disabled={disabled}
				value={selectUser.label}
				onSelect={(val) => {
					handleChange(val !== 'all' ? String(val) : undefined);
				}}
			>
				{options.map((option) => (
					<Option value={option.value} label={option.label} key={option.value} />
				))}
			</Dropdown>
		</Flex>
	);
};
