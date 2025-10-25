import { ChangeEvent, useEffect, useState } from 'react';

import { useDebounce } from '@/shared/hooks';
import { Icon } from '@/shared/ui/Icon';
import { Input } from '@/shared/ui/Input';

import styles from './SearchInput.module.css';

interface SearchInputProps {
	onSearch: (query: string) => void;
	placeholder?: string;
	currentValue?: string;
}

export const SearchInput = ({
	onSearch,
	placeholder = 'Найти...',
	currentValue,
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
			className={styles.input}
			placeholder={placeholder}
			value={query}
			onChange={handleChange}
			prefix={<Icon icon="search" size={20} color="black-300" />}
		/>
	);
};
