import { useSelector } from 'react-redux';

import { useAppDispatch, useAppSelector, SelectedAdminEntities } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { TablePagination } from '@/shared/ui/TablePagination';

import { getUserId } from '@/entities/profile';
import { useGetSpecializationsListQuery } from '@/entities/specialization';

import { DeleteSpecializationsButton } from '@/features/specialization/deleteSpecializations';
import {
	SpecializationsFilters,
	useSpecializationsFilters,
} from '@/features/specialization/filterSpecializations';

import { SearchSection } from '@/widgets/SearchSection';

import { getSelectedSpecializations } from '../../model/selectors/specializationsPageSelectors';
import { specializationsPageActions } from '../../model/slices/specializationsPageSlice';
import { SpecializationsTable } from '../SpecializationsTable/SpecializationsTable';

import styles from './SpecializationsPage.module.css';

const SpecializationsPage = () => {
	const dispatch = useAppDispatch();

	const userId = useAppSelector(getUserId);

	const { filters, hasFilters, onChangePage, onChangeAuthor, onChangeTitle, onChangeIsMy } =
		useSpecializationsFilters({
			page: 1,
		});

	const selectedSpecializations = useSelector(getSelectedSpecializations);

	const { data: specializations } = useGetSpecializationsListQuery({
		authorId: filters.isMy ? userId : filters.author,
		title: filters.title,
		page: filters.page,
	});

	const onSelectSpecializations = (ids: SelectedAdminEntities) => {
		dispatch(specializationsPageActions.setSelectedSpecializations(ids));
	};

	return (
		<Flex componentType="main" direction="column" gap="24">
			<SearchSection
				to="create"
				showRemoveButton={selectedSpecializations.length > 0}
				onSearch={onChangeTitle}
				searchValue={filters.title}
				hasFilters={hasFilters}
				renderRemoveButton={() => (
					<DeleteSpecializationsButton specializationsToRemove={selectedSpecializations} />
				)}
				renderFilter={() => (
					<SpecializationsFilters
						filters={filters}
						onChangeAuthor={onChangeAuthor}
						onChangeIsMy={onChangeIsMy}
					/>
				)}
			/>
			<Card className={styles.content}>
				{specializations && (
					<>
						<SpecializationsTable
							specializations={specializations?.data}
							selectedSpecializations={selectedSpecializations}
							onSelectSpecializations={onSelectSpecializations}
						/>
						<TablePagination
							page={filters.page || 1}
							onChangePage={onChangePage}
							limit={specializations.limit}
							total={specializations.total}
						/>
					</>
				)}
			</Card>
		</Flex>
	);
};

export default SpecializationsPage;
