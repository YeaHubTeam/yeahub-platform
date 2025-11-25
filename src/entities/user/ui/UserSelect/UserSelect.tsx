import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { User as UserI18n } from '@/shared/config/i18n/i18nTranslations';
import { useDebounce } from '@/shared/hooks';
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

const USER_ID_NOT_FOUND_KEY = 'toast.user.user.id.not_found';

export const UserSelect = ({ value, onChange, disabled }: UserSelectProps) => {
	const { t } = useTranslation([i18Namespace.user, i18Namespace.translation]);

	const [searchValue, setSearchValue] = useState('');
	const [debouncedValue, setDebouncedValue] = useState('');

	const debouncedSetValue = useDebounce((value: string) => {
		setDebouncedValue(value);
	}, 500);

	const { data: users, isFetching } = useGetUsersListQuery({
		search: debouncedValue,
		page: 1,
		limit: 10,
	});

	const handleChange = (newValue?: string) => {
		if (disabled) return;
		onChange(newValue);
	};

	const emptyUser = {
		value: 'all',
		label: t(UserI18n.SELECT_CHOOSE),
	};

	const handleSearchChange = (val: string) => {
		setSearchValue(val);
		debouncedSetValue(val);
	};

	const options = useMemo(() => {
		return (users?.data || []).map((user) => ({
			value: user.id.toString(),
			label: user.username,
		}));
	}, [users]);

	const selectUser = options.find((option) => option.value === value) || emptyUser;
	const showNotFoundMessage = !isFetching && debouncedValue && options.length === 0;
	const notFoundText = t(USER_ID_NOT_FOUND_KEY, { ns: i18Namespace.translation });
	const displayValue = showNotFoundMessage ? notFoundText : searchValue || selectUser.label;

	return (
		<Flex direction="column" align="start" gap="8">
			<Text variant="body2" color="black-700">
				{t(UserI18n.USER_NAME)}
			</Text>
			<Dropdown
				size="S"
				label={selectUser.label}
				disabled={disabled}
				value={displayValue}
				isInput={true}
				inputValue={searchValue}
				onChangeValue={handleSearchChange}
				onSelect={(val) => {
					const selected = options.find((opt) => opt.value === val);
					handleChange(val !== 'all' ? String(val) : undefined);
					setSearchValue(selected?.label ?? '');
				}}
			>
				{showNotFoundMessage ? (
					<Option value="" label={notFoundText} disabled />
				) : (
					options.map((option) => (
						<Option value={option.value} label={option.label} key={option.value} />
					))
				)}
			</Dropdown>
		</Flex>
	);
};
