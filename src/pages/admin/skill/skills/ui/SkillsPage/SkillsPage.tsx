import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector, SelectedAdminEntities } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { getUserId } from '@/entities/profile';
import { useGetSkillsListQuery } from '@/entities/skill';

import { DeleteSkillsButton } from '@/features/skill/deleteSkills';
import { SkillsFilters, useSkillsFilters } from '@/features/skill/filterSkills';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';
import { SearchSection } from '@/widgets/SearchSection';

import { getSelectedSkills } from '../../model/selectors/skillsPageSelectors';
import { skillsPageActions } from '../../model/slices/skillsPageSlice';
import { SkillsTable } from '../SkillsTable/SkillsTable';

import styles from './SkillsPage.module.css';

const SkillsPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const selectedSkills = useSelector(getSelectedSkills);
	const userId = useAppSelector(getUserId);

	const { filters, hasFilters, onChangePage, onChangeSpecialization, onChangeTitle, onChangeIsMy } =
		useSkillsFilters({
			page: 1,
		});

	const {
		data: skillsData,
		isLoading,
		isError,
		refetch,
	} = useGetSkillsListQuery({
		page: filters.page,
		title: filters.title,
		specializations: filters.specialization,
		authorId: filters.isMy ? userId : undefined,
	});

	const onSelectSkills = (ids: SelectedAdminEntities) => {
		dispatch(skillsPageActions.setSelectedSkills(ids));
	};

	const onResetFilters = () => {
		onChangeTitle('');
		onChangePage(1);
		if (onChangeSpecialization) onChangeSpecialization(undefined);
		if (onChangeIsMy) onChangeIsMy(false);
	};

	const skills = skillsData?.data ?? [];
	const hasSkills = skills.length > 0;

	const content = hasSkills ? (
		<SkillsTable skills={skills} selectedSkills={selectedSkills} onSelectSkills={onSelectSkills} />
	) : null;

	const stubs: PageWrapperStubs = {
		empty: {
			title: 'Похоже здесь пока нет навыков',
			subtitle: 'Создайте первую — и начните добавлять материалы в базу знаний',
			buttonText: 'Добавить навык',
			onClick: () => navigate('/admin/skills/create'),
		},
		'filter-empty': {
			onClick: onResetFilters,
		},
		error: {
			onClick: refetch,
		},
	};

	return (
		<PageWrapper
			isLoading={isLoading}
			hasError={isError}
			hasData={hasSkills}
			roles={['admin', 'author']}
			stubs={stubs}
			content={content}
			hasFilters={hasFilters}
			paginationOptions={{
				page: filters.page || 1,
				onChangePage,
				limit: skillsData?.limit ?? 10,
				total: skillsData?.total ?? 0,
			}}
		>
			{({ content, pagination }) => (
				<Flex componentType="main" direction="column" gap="24">
					<SearchSection
						to="create"
						showRemoveButton={selectedSkills.length > 0}
						searchValue={filters.title}
						onSearch={onChangeTitle}
						hasFilters={hasFilters}
						renderRemoveButton={() => <DeleteSkillsButton skillsToRemove={selectedSkills} />}
						renderFilter={() => (
							<SkillsFilters
								filters={filters}
								onChangeSpecialization={onChangeSpecialization}
								onChangeIsMy={onChangeIsMy}
							/>
						)}
						onResetFilters={onResetFilters}
					/>
					<Card className={styles.content}>
						{content}

						{hasSkills && !isError && pagination}
					</Card>
				</Flex>
			)}
		</PageWrapper>
	);
};

export default SkillsPage;
