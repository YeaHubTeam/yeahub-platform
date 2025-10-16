import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/hooks';
import { SelectedAdminEntities } from '@/shared/types/types';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { useGetSpecializationsListQuery } from '@/entities/specialization';

import { SearchSection } from '@/widgets/SearchSection';
import {
	SpecializationFilterSet,
	useSpecializationFilter,
} from '@/widgets/specializationFilterSet';
import { SpecializationsTable } from '@/widgets/SpecializationsTable';

import {
	getSelectedSpecializations,
	getSpecializationsAuthor,
	getSpecializationsPageNum,
	getSpecializationsSearch,
} from '../../model/selectors/specializationsPageSelectors';
import { specializationsPageActions } from '../../model/slices/specializationsPageSlice';
import { SpecializationsPagePagination } from '../SpecializationsPagePagination/SpecializationsPagePagination';

import styles from './SpecializationsPage.module.css';

/**
 * Page showing info about all the created specializations
 * @constructor
 */
const SpecializationsPage = () => {
	const dispatch = useAppDispatch();
	const page = useSelector(getSpecializationsPageNum);
	const search = useSelector(getSpecializationsSearch);
	const author = useSelector(getSpecializationsAuthor);
	const selectedSpecializations = useSelector(getSelectedSpecializations);
	const { filter } = useSpecializationFilter();

	useEffect(() => {
		if (filter.page && filter.page !== page) {
			dispatch(specializationsPageActions.setPage(filter.page));
		}
		if (filter.authorId !== undefined && filter.authorId !== author) {
			dispatch(specializationsPageActions.setAuthor(filter.authorId));
		}
	}, [filter.page, filter.authorId, page, author, dispatch]);

	const { data: specializations } = useGetSpecializationsListQuery({
		...filter,
		authorId: author,
		title: search,
		page,
	});

	const onSelectSpecializations = (ids: SelectedAdminEntities) => {
		dispatch(specializationsPageActions.setSelectedSpecializations(ids));
	};

	const onChangeSearch = (value: string) => {
		dispatch(specializationsPageActions.setSearch(value));
	};

	return (
		<Flex componentType="main" direction="column" gap="24">
			<SearchSection
				to="create"
				onSearch={onChangeSearch}
				renderFilter={() => <SpecializationFilterSet />}
			/>
			<Card className={styles.content}>
				<SpecializationsTable
					specializations={specializations?.data}
					selectedSpecializations={selectedSpecializations}
					onSelectSpecializations={onSelectSpecializations}
				/>
				<SpecializationsPagePagination specializationsResponse={specializations} />
			</Card>
		</Flex>
	);
};

export default SpecializationsPage;
