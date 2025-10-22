import { useSelector } from 'react-redux';

import { useAppDispatch, useQueryFilter } from '@/shared/hooks';
import { SelectedAdminEntities } from '@/shared/types/types';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { useGetSkillsListQuery } from '@/entities/skill';

import { DeleteSkillsButton } from '@/features/skill/deleteSkills';
import { SkillFilter } from '@/features/skill/skillFilter';

import { SearchSection } from '@/widgets/SearchSection';
import { SkillsTable } from '@/widgets/SkillsTable';

import {
	getSelectedSkills,
	getSkillsPageNum,
	getSkillsSearch,
} from '../../model/selectors/skillsPageSelectors';
import { skillsPageActions } from '../../model/slices/skillsPageSlice';
import { SkillsPagePagination } from '../SkillsPagePagination/SkillsPagePagination';

import styles from './SkillsPage.module.css';

/**
 * Page showing info about all the created skills
 * @constructor
 */
const SkillsPage = () => {
	const dispatch = useAppDispatch();
	const page = useSelector(getSkillsPageNum);
	const search = useSelector(getSkillsSearch);
	const selectedSkills = useSelector(getSelectedSkills);
	const {
		filter: { specialization },
	} = useQueryFilter();

	const specializations = Array.isArray(specialization) ? specialization : [specialization!];

	const { data: skills } = useGetSkillsListQuery({
		page,
		title: search,
		specializations,
	});

	const onSelectSkills = (ids: SelectedAdminEntities) => {
		dispatch(skillsPageActions.setSelectedSkills(ids));
	};
	const onChangeSearch = (value: string) => {
		dispatch(skillsPageActions.setSearch(value));
	};

	return (
		<Flex componentType="main" direction="column" gap="24">
			<SearchSection
				to="create"
				showRemoveButton={selectedSkills.length > 0}
				onSearch={onChangeSearch}
				renderRemoveButton={() => <DeleteSkillsButton skillsToRemove={selectedSkills} />}
				renderFilter={() => <SkillFilter />}
			/>
			<Card className={styles.content}>
				<SkillsTable
					skills={skills?.data}
					selectedSkills={selectedSkills}
					onSelectSkills={onSelectSkills}
				/>
				<SkillsPagePagination skillsResponse={skills} />
			</Card>
		</Flex>
	);
};

export default SkillsPage;
