import classNames from 'classnames';
import { ChangeEvent, useEffect, useState } from 'react';

import { useDebounce } from '@/shared/libs';
import { Icon } from '@/shared/ui/Icon';
import { Input } from '@/shared/ui/Input';

import styles from './SearchInput.module.css';

interface SearchInputProps {
	onSearch: (query: string) => void;
	placeholder?: string;
	currentValue?: string;
	className?: string;
}

export const SearchInput = ({
	onSearch,
	placeholder = 'Найти...',
	currentValue,
	className,
}: SearchInputProps) => {
	const [query, setQuery] = useState(currentValue || '');

	useEffect(() => {
		setQuery(currentValue || '');
	}, [currentValue]);

	const debouncedSearch = useDebounce(onSearch, 500);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setQuery(value);
		debouncedSearch(value);
	};

	return (
		<Input
			className={classNames(styles.input, className)}
			placeholder={placeholder}
			value={query}
			onChange={handleChange}
			prefix={<Icon icon="search" size={20} color="black-300" />}
		/>
	);
};
