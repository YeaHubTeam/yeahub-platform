import { useSelector } from 'react-redux';

import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { SelectedAdminEntities } from '@/shared/types/types';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { TablePagination } from '@/shared/ui/TablePagination';

import { getUserId } from '@/entities/profile';
import { useGetSkillsListQuery } from '@/entities/skill';

import { DeleteSkillsButton } from '@/features/skill/deleteSkills';
import { SkillsFilters, useSkillsFilters } from '@/features/skill/filterSkills';

import { SearchSection } from '@/widgets/SearchSection';
import { SkillsTable } from '@/widgets/SkillsTable';

import { getSelectedSkills } from '../../model/selectors/skillsPageSelectors';
import { skillsPageActions } from '../../model/slices/skillsPageSlice';

import styles from './SkillsPage.module.css';

const SkillsPage = () => {
	const dispatch = useAppDispatch();
	const selectedSkills = useSelector(getSelectedSkills);
	const userId = useAppSelector(getUserId);
	const { filters, hasFilters, onChangePage, onChangeSpecialization, onChangeTitle, onChangeIsMy } =
		useSkillsFilters({
			page: 1,
		});

	const { data: skills } = useGetSkillsListQuery({
		page: filters.page,
		title: filters.title,
		specializations: filters.specialization,
		authorId: filters.isMy ? userId : undefined,
	});

	const onSelectSkills = (ids: SelectedAdminEntities) => {
		dispatch(skillsPageActions.setSelectedSkills(ids));
	};

	return (
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
			/>
			<Card className={styles.content}>
				{skills && (
					<>
						<SkillsTable
							skills={skills?.data}
							selectedSkills={selectedSkills}
							onSelectSkills={onSelectSkills}
						/>
						<TablePagination
							page={filters.page || 1}
							onChangePage={onChangePage}
							limit={skills.limit}
							total={skills.total}
						/>
					</>
				)}
			</Card>
		</Flex>
	);
};

export default SkillsPage;
