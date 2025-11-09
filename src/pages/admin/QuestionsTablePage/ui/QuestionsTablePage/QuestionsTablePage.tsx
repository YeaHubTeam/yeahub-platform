import { useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { SelectedAdminEntities } from '@/shared/types/types';
import { Card } from '@/shared/ui/Card';
import { EmptyFilterStub } from '@/shared/ui/EmptyFilterStub';
import { Flex } from '@/shared/ui/Flex';

import { getIsAuthor, getUserId } from '@/entities/profile';
import { useGetQuestionsListQuery } from '@/entities/question';

import { DeleteQuestionsButton } from '@/features/question/deleteQuestions';
import { QuestionsFilters, useQuestionsFilters } from '@/features/question/filterQuestions';

import { QuestionsTable } from '@/widgets/QuestionsTable';
import { SearchSection } from '@/widgets/SearchSection';

import { getSelectedQuestions } from '../../model/selectors/questionsTablePageSelectors';
import { questionsTablePageActions } from '../../model/slices/questionsTablePageSlice';
import { QuestionPagePagination } from '../QuestionTablePagePagination/QuestionTablePagePagination';

import styles from './QuestionsTablePage.module.css';

const QuestionsPage = () => {
	const dispatch = useAppDispatch();
	const userId = useAppSelector(getUserId);
	const selectedQuestions = useAppSelector(getSelectedQuestions);
	const isAuthor = useAppSelector(getIsAuthor);

	const {
		filters,
		hasFilters,
		onResetFilters,
		onChangeTitle,
		onChangePage,
		onChangeComplexity,
		onChangeSkills,
		onChangeSpecialization,
		onChangeRate,
		onChangeIsMy,
		onChangeOrder,
		onChangeOrderBy,
	} = useQuestionsFilters({
		page: 1,
	});

	const { data: allQuestions, isFetching } = useGetQuestionsListQuery({
		skills: filters.skills,
		page: filters.page,
		specialization: filters.specialization,
		title: filters.title,
		complexity: filters.complexity,
		rate: filters.rate,
		orderBy: filters.orderBy,
		order: filters.order,
		authorId: filters.isMy ? userId : undefined,
	});

	const onSelectQuestions = (ids: SelectedAdminEntities) => {
		dispatch(questionsTablePageActions.setSelectedQuestions(ids));
	};

	const resetAll = () => {
		dispatch(questionsTablePageActions.resetFilters());
		onResetFilters();
	};

	const rows = allQuestions?.data ?? [];
	const isEmpty = !isFetching && rows.length === 0;

	const questions = useMemo(() => {
		if (!allQuestions || !allQuestions.data) return undefined;

		return {
			...allQuestions,
			data: allQuestions.data.map((item) => ({
				...item,
				disabled: isAuthor && item.createdBy?.id !== userId,
			})),
		};
	}, [allQuestions, userId, isAuthor]);

	return (
		<Flex componentType="main" direction="column" gap="24">
			<SearchSection
				to="create"
				showRemoveButton={selectedQuestions.length > 0}
				onSearch={onChangeTitle}
				searchValue={filters.title}
				hasFilters={hasFilters}
				renderRemoveButton={() => <DeleteQuestionsButton questionsToRemove={selectedQuestions} />}
				renderFilter={() => (
					<QuestionsFilters
						filters={filters}
						onChangeComplexity={onChangeComplexity}
						onChangeSkills={onChangeSkills}
						onChangeSpecialization={onChangeSpecialization}
						onChangeRate={onChangeRate}
						onChangeOrder={onChangeOrder}
						onChangeIsMy={onChangeIsMy}
						onChangeOrderBy={onChangeOrderBy}
					/>
				)}
			/>
			<Card className={styles.content}>
				<QuestionsTable
					questions={questions?.data}
					selectedQuestions={selectedQuestions}
					onSelectQuestions={onSelectQuestions}
				/>

				{isEmpty && <EmptyFilterStub text={filters.title} resetFilters={resetAll} />}

				{!isEmpty && (
					<QuestionPagePagination
						questionsResponse={questions}
						currentPage={filters.page || 1}
						onPageChange={onChangePage}
					/>
				)}
			</Card>
		</Flex>
	);
};

export default QuestionsPage;
