import { ChangeEvent, useState } from 'react';
import { Input, Icon } from 'yeahub-ui-kit';

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

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setQuery(value);
		onSearch(value);
	};

	return (
		<Input
			className={styles.input}
			placeholder={placeholder}
			value={query}
			onChange={handleChange}
			preffix={<Icon aria-label="perform a search" icon="search" size={20} />}
		/>
	);
};
