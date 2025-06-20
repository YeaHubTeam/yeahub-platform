import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Marketplace } from '@/shared/config/i18n/i18nTranslations';
import { useDebounce } from '@/shared/hooks/useDebounced';
import { SearchInput } from '@/shared/ui/SearchInput';

interface SearchBlockProps {
	onChangeSearch: (value: string) => void;
}

export const SearchBlock = ({ onChangeSearch }: SearchBlockProps) => {
	const { t } = useTranslation(i18Namespace.marketplace);

	const handleSearch = (value: string) => {
		onChangeSearch(value);
	};
	const debouncedSearch = useDebounce(handleSearch, 500);

	return <SearchInput placeholder={t(Marketplace.SEARCH_PLACEHOLDER)} onSearch={debouncedSearch} />;
};
