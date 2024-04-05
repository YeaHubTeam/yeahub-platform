import { FC, useState } from 'react';

import { UserPreferences } from '@/shared/ui/UserPreferences';

import { SearchInput } from '@/features/common/search-input';

import styles from './Header.module.css';

export const Header: FC = () => {
	const [searchResults, setSearchResults] = useState<string>('');

	const handleSearch = (query: string) => {
		setSearchResults(query);
	};

	console.log(searchResults);

	return (
		<header className={styles.header}>
			<SearchInput onSearch={handleSearch} placeholder={'Найти человека, мероприятие...'} />
			<UserPreferences />
		</header>
	);
};
