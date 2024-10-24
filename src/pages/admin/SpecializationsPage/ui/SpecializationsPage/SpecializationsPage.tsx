import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { useGetSpecializationsListQuery } from '@/entities/specialization';

import { SearchSection } from '@/widgets/SearchSection';
import { SpecializationsTable } from '@/widgets/SpecializationsTable';

import { specializationsPageActions } from '@/pages/admin/SpecializationsPage/model/slices/specializationsPageSlice';

import {
	getSelectedSpecializations,
	getSpecializationsPageNum,
	getSpecializationsSearch,
} from '../../model/selectors/specializationsPageSelectors';
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

	const { data: specializations } = useGetSpecializationsListQuery({ page, title: search });

	const onSelectSpecializations = (ids: number[]) => {
		console.log(ids);
		dispatch(specializationsPageActions.setSelectedSpecializations(ids));
	};
	const onChangeSearch = (value: string) => {
		dispatch(specializationsPageActions.setSearch(value));
	};

	//TODO implement removing selected questions
	const onRemoveSpecializations = () => {};

	return (
		<Flex componentType="main" direction="column" gap="24">
			<SearchSection
				to="create"
				showRemoveButton={selectedSpecializations.length > 0}
				onRemove={onRemoveSpecializations}
				onSearch={onChangeSearch}
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
