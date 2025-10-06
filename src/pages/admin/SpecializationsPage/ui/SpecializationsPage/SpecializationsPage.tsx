import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/hooks';
import { SelectedAdminEntities } from '@/shared/types/types';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { useGetSpecializationsListQuery } from '@/entities/specialization';

import { DeleteSpecializationsButton } from '@/features/specialization/deleteSpecializations';
import {
	SpecializationFilterSet,
	useSpecializationFilter,
} from '@/features/specialization/specializationFilterSet';

import { SearchSection } from '@/widgets/SearchSection';
import { SpecializationsTable } from '@/widgets/SpecializationsTable';

import {
	getSelectedSpecializations,
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
	const selectedSpecializations = useSelector(getSelectedSpecializations);
	const { filter } = useSpecializationFilter();

	const [effectiveAuthorId, setEffectiveAuthorId] = useState<string | undefined>(filter.authorId);

	useEffect(() => {
		if (filter.page && filter.page !== page) {
			dispatch(specializationsPageActions.setPage(filter.page));
		}
	}, [filter.page, page, dispatch]);

	useEffect(() => {
		if (filter.authorId !== undefined) {
			setEffectiveAuthorId(filter.authorId);
		}
	}, [filter.authorId]);

	useEffect(() => {
		if (search !== '') {
			setEffectiveAuthorId(search);
		}
	}, [search]);

	const { data: specializations } = useGetSpecializationsListQuery({
		...filter,
		authorId: effectiveAuthorId,
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
				showRemoveButton={selectedSpecializations.length > 0}
				onSearch={onChangeSearch}
				renderFilter={() => <SpecializationFilterSet />}
				renderRemoveButton={() => (
					<DeleteSpecializationsButton specializationsToRemove={selectedSpecializations} />
				)}
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
