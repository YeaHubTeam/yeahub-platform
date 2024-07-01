import { ChangeEvent, useState } from 'react';
import { Icon, Input, IconButton } from 'yeahub-ui-kit';

import styles from './SearchInput.module.css';

interface SearchInputProps {
	onSearch: (query: string) => void;
	placeholder?: string;
}

export const SearchInput = ({ onSearch, placeholder = 'Найти...' }: SearchInputProps) => {
	const [query, setQuery] = useState('');

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
	);
};
