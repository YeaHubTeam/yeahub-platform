import { FC, useState } from 'react';

import { UserPreferences } from '@/shared/ui/UserPreferences';

import { SearchInput } from '@/features/common/search-input';
import { ThemeSwitcher } from '@/features/theme/switch-theme';

import styles from './Header.module.css';

export const Header: FC = () => {
	const [searchResults, setSearchResults] = useState<string>('');

	const handleSearch = (query: string) => {
		console.log(searchResults);
		setSearchResults(query);
	};

	return (
		<header className={styles.header}>
			<SearchInput onSearch={handleSearch} placeholder={'Найти человека, мероприятие...'} />
			<ThemeSwitcher />
			<UserPreferences />
		</header>
	);
};
