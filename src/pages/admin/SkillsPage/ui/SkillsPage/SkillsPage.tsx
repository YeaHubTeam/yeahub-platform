import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/hooks';
import { SelectedAdminEntities } from '@/shared/types/types';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { useGetSkillsListQuery } from '@/entities/skill';

import { DeleteSkillsButton } from '@/features/skill/deleteSkills';
import { SkillsFilters, useSkillsFilters } from '@/features/skill/filterSkills';

import { SearchSection } from '@/widgets/SearchSection';
import { SkillsTable } from '@/widgets/SkillsTable';

import { getSelectedSkills } from '../../model/selectors/skillsPageSelectors';
import { skillsPageActions } from '../../model/slices/skillsPageSlice';
import { SkillsPagePagination } from '../SkillsPagePagination/SkillsPagePagination';

import styles from './SkillsPage.module.css';

const SkillsPage = () => {
	const dispatch = useAppDispatch();
	const selectedSkills = useSelector(getSelectedSkills);

	const { filters, hasFilters, onChangePage, onChangeSpecialization, onChangeTitle } =
		useSkillsFilters({
			page: 1,
		});

	const { data: skills } = useGetSkillsListQuery({
		page: filters.page,
		title: filters.title,
		specializations: filters.specialization,
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
					<SkillsFilters filters={filters} onChangeSpecialization={onChangeSpecialization} />
				)}
			/>
			<Card className={styles.content}>
				<SkillsTable
					skills={skills?.data}
					selectedSkills={selectedSkills}
					onSelectSkills={onSelectSkills}
				/>
				<SkillsPagePagination
					skills={skills}
					onPageChange={onChangePage}
					currentPage={filters.page || 1}
				/>
			</Card>
		</Flex>
	);
};

export default SkillsPage;
