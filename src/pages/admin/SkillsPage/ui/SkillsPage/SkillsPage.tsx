import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { useGetSkillsListQuery } from '@/entities/skill';

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

	const { data: skills } = useGetSkillsListQuery({ page, title: search });

	const onSelectSkills = (ids: number[]) => {
		dispatch(skillsPageActions.setSelectedSkills(ids));
	};
	const onChangeSearch = (value: string) => {
		dispatch(skillsPageActions.setSearch(value));
	};

	//TODO implement removing selected questions
	const onRemoveSkills = () => {};

	return (
		<Flex componentType="main" direction="column" gap="24">
			<Card className={styles.content}>
				<SearchSection
					to="create"
					showRemoveButton={selectedSkills.length > 0}
					onRemove={onRemoveSkills}
					onSearch={onChangeSearch}
				/>

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
