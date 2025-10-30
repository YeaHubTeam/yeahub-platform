import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import PlusSvg from '@/shared/assets/icons/Plus1.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { FiltersDrawer } from '@/shared/ui/FiltersDrawer/FiltersDrawer';
import { Flex } from '@/shared/ui/Flex';
import { SearchInput } from '@/shared/ui/SearchInput';

import styles from './SearchSection.module.css';

interface SearchSectionProps {
	to?: string;
	showRemoveButton?: boolean;
	showResetFilterButton?: boolean;
	onSearch: (value: string) => void;
	searchValue?: string;
	renderRemoveButton?: () => ReactNode;
	renderFilter?: () => ReactNode;
	onResetFilters?: () => void;
}

export const SearchSection = ({
	to,
	onSearch,
	searchValue,
	showRemoveButton,
	renderRemoveButton,
	renderFilter,
	onResetFilters,
	showResetFilterButton,
}: SearchSectionProps) => {
	const { t } = useTranslation(i18Namespace.translation);

	return (
		<Card>
			<Flex className={styles.section} justify="between">
				<Flex gap="10">
					{renderFilter && <FiltersDrawer>{renderFilter()}</FiltersDrawer>}
					<SearchInput
						placeholder={t(Translation.SEARCH)}
						onSearch={onSearch}
						currentValue={searchValue}
					/>
				</Flex>
				<Flex gap="10" align="center">
					{onResetFilters && showResetFilterButton && (
						<Button size="large" onClick={onResetFilters} variant="outline">
							{t(Translation.STUB_FILTER_SUBMIT)}
						</Button>
					)}
					{showRemoveButton && renderRemoveButton && renderRemoveButton()}
					{to && (
						<NavLink to={to}>
							<Button size="large">
								{t(Translation.CREATE)}
								<PlusSvg className={styles['plus-svg']} />
							</Button>
						</NavLink>
					)}
				</Flex>
			</Flex>
		</Card>
	);
};
