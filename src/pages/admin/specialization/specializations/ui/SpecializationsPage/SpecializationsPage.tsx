import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, ROUTES, Specializations } from '@/shared/config';
import { useAppDispatch, useAppSelector, SelectedAdminEntities } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { getUserId } from '@/entities/profile';
import { useGetSpecializationsListQuery } from '@/entities/specialization';

import { DeleteSpecializationsButton } from '@/features/specialization/deleteSpecializations';
import {
	SpecializationsFilters,
	useSpecializationsFilters,
} from '@/features/specialization/filterSpecializations';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';
import { SearchSection } from '@/widgets/SearchSection';

import { getSelectedSpecializations } from '../../model/selectors/specializationsPageSelectors';
import { specializationsPageActions } from '../../model/slices/specializationsPageSlice';
import { SpecializationsTable } from '../SpecializationsTable/SpecializationsTable';

import styles from './SpecializationsPage.module.css';
import { SpecializationsPageSkeleton } from './SpecializationsPage.skeleton';

const SpecializationsPage = () => {
	const dispatch = useAppDispatch();

	const navigate = useNavigate();
	const { t } = useTranslation([i18Namespace.specialization]);
	const userId = useAppSelector(getUserId);

	const {
		filters,
		hasFilters,
		onChangePage,
		onChangeAuthor,
		onChangeTitle,
		onChangeIsMy,
		onResetFilters,
	} = useSpecializationsFilters({
		page: 1,
	});

	const selectedSpecializations = useSelector(getSelectedSpecializations);

	const {
		data: specializations,
		isLoading,
		isError,
		refetch,
	} = useGetSpecializationsListQuery({
		authorId: filters.isMy ? userId : filters.author,
		title: filters.title,
		page: filters.page,
	});

	const onSelectSpecializations = (ids: SelectedAdminEntities) => {
		dispatch(specializationsPageActions.setSelectedSpecializations(ids));
	};

	const hasData = specializations?.data && specializations.data.length > 0;

	const renderContent = () => (
		<>
			<SpecializationsTable
				specializations={specializations?.data || []}
				selectedSpecializations={selectedSpecializations}
				onSelectSpecializations={onSelectSpecializations}
			/>
		</>
	);

	const stubs: PageWrapperStubs = {
		error: {
			onClick: refetch,
		},
		'filter-empty': {
			onClick: onResetFilters,
		},
		empty: {
			subtitle: t(Specializations.EMPTY_LIST_DESCRIPTION),
			title: t(Specializations.EMPTY_LIST_TITLE),
			buttonText: t(Specializations.EMPTY_LIST_BUTTON),
			onClick: () => navigate(ROUTES.admin.specializations.create.page),
		},
	};

	return (
		<PageWrapper
			isLoading={isLoading}
			skeleton={<SpecializationsPageSkeleton />}
			hasError={isError}
			hasFilters={hasFilters}
			hasData={hasData}
			roles={['admin', 'author']}
			paginationOptions={
				specializations
					? {
							page: filters.page || 1,
							limit: specializations.limit,
							total: specializations.total,
							onChangePage,
						}
					: undefined
			}
			stubs={stubs}
			content={renderContent()}
		>
			{({ content, pagination }) => (
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
						{content}
						{pagination}
					</Card>
				</Flex>
			)}
		</PageWrapper>
	);
};

export default SpecializationsPage;
