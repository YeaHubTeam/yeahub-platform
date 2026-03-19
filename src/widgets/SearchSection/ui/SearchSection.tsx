import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import PlusSvg from '@/shared/assets/icons/plus1.svg';
import { i18Namespace, Translation, ROUTES } from '@/shared/config';
import { route } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { FiltersDrawer } from '@/shared/ui/FiltersDrawer';
import { Flex } from '@/shared/ui/Flex';
import { Popover, PopoverMenuItem } from '@/shared/ui/Popover';
import { SearchInput } from '@/shared/ui/SearchInput';

import styles from './SearchSection.module.css';

interface SearchSectionProps {
	to?: string;
	showRemoveButton?: boolean;
	showResetFilterButton?: boolean;
	onSearch?: (value: string) => void;
	searchValue?: string;
	renderRemoveButton?: () => ReactNode;
	renderFilter?: () => ReactNode;
	onResetFilters?: () => void;
	hasFilters?: boolean;
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
	hasFilters,
}: SearchSectionProps) => {
	const { t } = useTranslation(i18Namespace.translation);
	const navigate = useNavigate();

	const handleCreateQuestion = () => {
		navigate(route(ROUTES.admin.questions.create.page));
	};

	const handleCreateMultipleQuestions = () => {
		navigate(route(ROUTES.admin.questions.createMultiple.page));
	};

	const menuItems: PopoverMenuItem[] = [
		{
			title: t(Translation.CREATE),
			onClick: handleCreateQuestion,
		},
		{
			title: t(Translation.CREATE_MULTIPLE),
			onClick: handleCreateMultipleQuestions,
		},
	];

	return (
		<Card>
			<Flex className={styles.section} justify="between">
				<Flex gap="10">
					{renderFilter && <FiltersDrawer hasFilters={hasFilters}>{renderFilter()}</FiltersDrawer>}
					{onSearch && (
						<SearchInput
							placeholder={t(Translation.SEARCH)}
							onSearch={onSearch}
							currentValue={searchValue}
						/>
					)}
				</Flex>
				<Flex gap="10" align="center">
					{onResetFilters && showResetFilterButton && (
						<Button size="large" onClick={onResetFilters} variant="outline">
							{t(Translation.STUB_FILTER_SUBMIT)}
						</Button>
					)}
					{showRemoveButton && renderRemoveButton && renderRemoveButton()}
					{to && (
						<Popover menuItems={menuItems}>
							{({ onToggle }) => (
								<Button size="large" onClick={onToggle}>
									{t(Translation.CREATE)}
									<PlusSvg className={styles['plus-svg']} />
								</Button>
							)}
						</Popover>
					)}
				</Flex>
			</Flex>
		</Card>
	);
};
