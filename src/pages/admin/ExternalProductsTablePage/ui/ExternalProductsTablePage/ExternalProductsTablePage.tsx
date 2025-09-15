import { useSelector } from 'react-redux';

import { useAppDispatch, useQueryFilter } from '@/shared/hooks';
import { SelectedAdminEntities } from '@/shared/types/types';
import { Card } from '@/shared/ui/Card';
import { EmptyStub } from '@/shared/ui/EmptyStub';
import { Flex } from '@/shared/ui/Flex';

import { useGetExternalProductsListQuery } from '@/entities/external-product';

import { DeleteExternalProductsButton } from '@/features/external-product/deleteExternalProducts';

import { ExternalProductsTable } from '@/widgets/external-product';
import { SearchSection } from '@/widgets/SearchSection';

import {
	getExternalProductsSearch,
	getSelectedExternalProducts,
} from '../../model/selectors/ExternalProductsTablePageSelectors';
import { externalProductsTablePageActions } from '../../model/slice/externalProductsTablePageSlice';
import { ExternalProductsTablePagePagination } from '../ExternalProductsTablePagePagination/ExternalProductsTablePagePagination';

// import { externalProductsMock } from '@/entities/external-product/api/__mocks__/data';
import styles from './ExternalProductsTablePage.module.css';

/**
 * Page showing info about all the external products
 * @constructor
 */

const ExternalProductsTablePage = () => {
	const dispatch = useAppDispatch();
	const search = useSelector(getExternalProductsSearch);
	const selectedExternalProducts = useSelector(getSelectedExternalProducts);

	const { filter, handleFilterChange, resetFilters } = useQueryFilter();
	const { page } = filter;

	const { data: externalProducts } = useGetExternalProductsListQuery({
		page: page || 1,
		limit: 10,
		name: search || undefined,
	});

	const onSelectExternalProducts = (ids: SelectedAdminEntities) => {
		dispatch(externalProductsTablePageActions.setSelectedExternalProducts(ids));
	};

	const onChangePage = (page: number) => {
		handleFilterChange({ page });
		dispatch(externalProductsTablePageActions.setSelectedExternalProducts([]));
	};

	const onChangeSearch = (value: string) => {
		dispatch(externalProductsTablePageActions.setSearch(value));
		dispatch(externalProductsTablePageActions.setSelectedExternalProducts([]));
	};

	return (
		<Flex componentType="main" direction="column" gap="24">
			<SearchSection
				onSearch={onChangeSearch}
				searchValue={search}
				showRemoveButton={selectedExternalProducts.length > 0}
				renderRemoveButton={() => (
					<DeleteExternalProductsButton externalProductsToRemove={selectedExternalProducts} />
				)}
			/>

			<Card className={styles.content}>
				<ExternalProductsTable
					externalProducts={externalProducts?.data}
					selectedExternalProducts={selectedExternalProducts}
					onSelectExternalProducts={onSelectExternalProducts}
				/>

				{externalProducts?.data && externalProducts.data.length > 0 && (
					<ExternalProductsTablePagePagination
						externalProductsResponse={externalProducts}
						currentPage={page || 1}
						onPageChange={onChangePage}
					/>
				)}

				{externalProducts?.data && externalProducts.data.length === 0 && (
					<EmptyStub
						text={search ? `По запросу "${search}" ничего не найдено` : 'Нет данных'}
						resetFilters={resetFilters}
					/>
				)}
			</Card>
		</Flex>
	);
};

export default ExternalProductsTablePage;
