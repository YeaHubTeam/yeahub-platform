import { ChangeEvent, FC, FormEvent, useState } from 'react';

import SearchIcon from '@/shared/assets/icons/search.svg';

import styles from './SearchInput.module.css';

interface SearchInputProps {
	onSearch: (query: string) => void;
	placeholder?: string;
}

export const SearchInput: FC<SearchInputProps> = ({ onSearch, placeholder = 'Найти...' }) => {
	const [query, setQuery] = useState('');

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setQuery(value);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSearch(query);
		setQuery('');
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<input
				className={`${styles.search}`}
				type="search"
				value={query}
				onChange={handleChange}
				placeholder={placeholder}
			/>
			<SearchIcon className={styles.icon} />
		</form>
	);
};
