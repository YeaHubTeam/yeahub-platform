/* eslint-disable prettier/prettier */
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector, useCurrentProject } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { OrderFilter } from '@/shared/ui/OrderFilter';
import { SearchInput } from '@/shared/ui/SearchInput';
import { Switch } from '@/shared/ui/Switch';

import { getSpecializationId } from '@/entities/profile';
import { ChooseQuestionComplexity } from '@/entities/question';
import { SkillsListField } from '@/entities/skill';
import { SpecializationsListField } from '@/entities/specialization';

import { QuestionsFilterParams } from '../../model/types/filters';
import { QuestionRateFilter } from '../QuestionRateFilter/QuestionRateFilter';
import { QuestionSortByFieldFilter } from '../QuestionSortByFieldFilter/QuestionSortByFieldFilter';
import { QuestionStatusFilter } from '../QuestionStatusFilter/QuestionStatusFilter';

interface QuestionsFiltersProps {
	filters: QuestionsFilterParams;
	onChangeTitle?: (title?: QuestionsFilterParams['title']) => void;
	onChangeSkills: (skills?: QuestionsFilterParams['skills']) => void;
	onChangeSpecialization?: (specialization?: QuestionsFilterParams['specialization']) => void;
	onChangeComplexity: (complexity?: QuestionsFilterParams['complexity']) => void;
	onChangeRate: (rate?: QuestionsFilterParams['rate']) => void;
	onChangeStatus?: (status?: QuestionsFilterParams['status']) => void;
	onChangeIsMy?: (isMy?: QuestionsFilterParams['isMy']) => void;
	onChangeOrder?: (order?: QuestionsFilterParams['order']) => void;
	onChangeOrderBy?: (orderBy?: QuestionsFilterParams['orderBy']) => void;
}
export const QuestionsFilters = ({
	filters,
	onChangeTitle,
	onChangeSkills,
	onChangeSpecialization,
	onChangeComplexity,
	onChangeRate,
	onChangeStatus,
	onChangeIsMy,
	onChangeOrder,
	onChangeOrderBy,
}: QuestionsFiltersProps) => {
	const { skills, rate, complexity, status, title, specialization, isMy, order, orderBy } = filters;
	const { t } = useTranslation(i18Namespace.questions);
	const specializationId = useAppSelector(getSpecializationId);
	const project = useCurrentProject();

	return (
		<Flex direction="column" gap="24">
			{(project === 'landing' || project === 'platform') && onChangeTitle && (
				<SearchInput
					placeholder={t(Questions.SEARCH_PLACEHOLDER)}
					onSearch={onChangeTitle}
					currentValue={title}
				/>
			)}
			{project === 'admin' && onChangeIsMy && (
				<Switch
					checked={isMy ?? false}
					onChange={(e) => onChangeIsMy(e.target.checked)}
					label={t(Questions.SORT_AUTHOR_TITLE)}
				/>
			)}
			{(project === 'admin' || project === 'landing') && onChangeSpecialization && (
				<SpecializationsListField
					selectedSpecialization={specialization}
					onChangeSpecialization={onChangeSpecialization}
				/>
			)}
			<SkillsListField
				selectedSkills={skills}
				onChangeSkills={onChangeSkills}
				selectedSpecialization={specialization || specializationId}
			/>
			<ChooseQuestionComplexity
				onChangeComplexity={onChangeComplexity}
				selectedComplexity={complexity}
			/>
			<QuestionRateFilter onChangeRate={onChangeRate} selectedRate={rate} />
			{project === 'platform' && onChangeStatus && (
				<QuestionStatusFilter onChangeStatus={onChangeStatus} selectedStatus={status} />
			)}
			{project === 'admin' && onChangeOrderBy && (
				<QuestionSortByFieldFilter onChangeOrderBy={onChangeOrderBy} selectedOrderBy={orderBy} />
			)}
			{project === 'admin' && onChangeOrder && (
				<OrderFilter changeOrder={onChangeOrder} selectedOrder={order} />
			)}
		</Flex>
	);
};
