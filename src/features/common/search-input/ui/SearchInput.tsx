import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { Icon, Input, IconButton } from 'yeahub-ui-kit';

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
			<Input
				className={styles.input}
				placeholder={placeholder}
				value={query}
				onChange={handleChange}
				preffix={
					<IconButton
						type="submit"
						aria-label="perform a search"
						form="square"
						icon={<Icon icon="search" size={20} />}
						size="small"
						theme="tertiary"
					/>
				}
			/>
		</form>
	);
};

/*Подключение к будущему компоненту */
export const Component: FC = () => {
	const [searchResults, setSearchResults] = useState<string>('');

	const handleSearch = (query: string) => {
		setSearchResults(query);
	};

	console.log(searchResults);

	return (
		<>
			<SearchInput onSearch={handleSearch} placeholder={'Найти человека, мероприятие...'} />
		</>
	);
};
