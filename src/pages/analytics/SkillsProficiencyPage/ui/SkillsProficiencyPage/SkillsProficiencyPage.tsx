import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { i18Namespace } from '@/shared/config/i18n';
import { Analytics } from '@/shared/config/i18n/i18nTranslations';
import { State } from '@/shared/config/store/State';
import { useAppDispatch, useScreenSize } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';
import { Tooltip } from '@/shared/ui/Tooltip';

import { useGetLearnedQuestionsQuery } from '@/entities/question';
import { SkillSelect } from '@/entities/skill';
import { SpecializationSelect } from '@/entities/specialization';

import { skillsProficiencyActions } from '../../model/slices/skillsProficiencyPageSlice';
import { SkillsProficiencyList } from '../SkillsProficiencyList/SkillsProficiencyList';
import { SkillsProficiencyPagePagination } from '../SkillsProficiencyPagePagination/SkillsProficiencyPagePagination';
import { SkillsProficiencyPageTable } from '../SkillsProficiencyPageTable/SkillsProficiencyPageTable';

import styles from './SkillsProficiencyPage.module.css';

export const SkillsProficiencyPage = () => {
	const { t } = useTranslation(i18Namespace.analytics);
	const { isMobile } = useScreenSize();
	const dispatch = useAppDispatch();
	const filter = useSelector((state: State) => state.skillsProficiencyPage);

	const onPageChange = (page: number) => {
		dispatch(skillsProficiencyActions.setPage(page));
	};
	const onSelectSpecialization = (id: number | number[]) => {
		const value = Array.isArray(id) ? id[0] : id;
		dispatch(skillsProficiencyActions.setSelectedSpecialization(value));
	};
	const onSelectSkill = (id: number | number[]) => {
		const value = Array.isArray(id) ? id[0] : id;
		dispatch(skillsProficiencyActions.setSelectedSkill(value));
	};

	const { data: response } = useGetLearnedQuestionsQuery({
		...filter,
	});
	const learnedQuestions = response?.data ?? [];

	return (
		<Card className={styles.content}>
			<Flex className={styles.header} justify="between">
				<Text variant={isMobile ? 'body5-accent' : 'body6'} isMainTitle>
					{t(Analytics.SKILL_PROFICIENCY_TITLE)}
				</Text>
				<Tooltip
					className={styles.tooltip}
					title={t(Analytics.SKILL_PROFICIENCY_TOOLTIP)}
					offsetTooltip={7}
					placement="bottom"
					color="violet"
				>
					<Icon icon="info" size={20} color="black-600" />
				</Tooltip>
			</Flex>
			<Flex
				gap="14"
				className={styles['dropdown-container']}
				direction={isMobile ? 'column' : 'row'}
				align={isMobile ? 'center' : 'start'}
			>
				<SpecializationSelect
					onChange={onSelectSpecialization}
					value={filter.specializationId || 0}
				/>
				<SkillSelect
					onChange={onSelectSkill}
					value={filter.skillId || 0}
					selectedSpecializations={
						Array.isArray(filter.specializationId)
							? filter.specializationId
							: [filter.specializationId || 0]
					}
					hasMultiple={false}
				/>
			</Flex>
			{isMobile ? (
				<SkillsProficiencyList learnedQuestions={learnedQuestions} />
			) : (
				<SkillsProficiencyPageTable learnedQuestions={learnedQuestions} />
			)}
			<SkillsProficiencyPagePagination
				learnedQuestionsResponse={response}
				currentPage={filter.page || 1}
				onChangePage={onPageChange}
			/>
		</Card>
	);
};
