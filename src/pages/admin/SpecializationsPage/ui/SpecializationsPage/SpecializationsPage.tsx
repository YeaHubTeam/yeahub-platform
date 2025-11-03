import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/hooks';
import { SelectedAdminEntities } from '@/shared/types/types';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { useGetSpecializationsListQuery } from '@/entities/specialization';

import { DeleteSpecializationsButton } from '@/features/specialization/deleteSpecializations';
import {
	SpecializationsFilters,
	useSpecializationsFilters,
} from '@/features/specialization/filterSecializations';

import { SearchSection } from '@/widgets/SearchSection';
import { SpecializationsTable } from '@/widgets/SpecializationsTable';

import { getSelectedSpecializations } from '../../model/selectors/specializationsPageSelectors';
import { specializationsPageActions } from '../../model/slices/specializationsPageSlice';
import { SpecializationsPagePagination } from '../SpecializationsPagePagination/SpecializationsPagePagination';

import styles from './SpecializationsPage.module.css';

const SpecializationsPage = () => {
	const dispatch = useAppDispatch();
	const { filters, hasFilters, onChangePage, onChangeAuthor, onChangeTitle } =
		useSpecializationsFilters({
			page: 1,
		});
	const selectedSpecializations = useSelector(getSelectedSpecializations);

	const { data: specializations } = useGetSpecializationsListQuery({
		authorId: filters.author,
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
					<SpecializationsFilters filters={filters} onChangeAuthor={onChangeAuthor} />
				)}
			/>
			<Card className={styles.content}>
				<SpecializationsTable
					specializations={specializations?.data}
					selectedSpecializations={selectedSpecializations}
					onSelectSpecializations={onSelectSpecializations}
				/>
				<SpecializationsPagePagination
					specializations={specializations}
					currentPage={filters.page || 1}
					onPageChange={onChangePage}
				/>
			</Card>
		</Flex>
	);
};

export default SpecializationsPage;
