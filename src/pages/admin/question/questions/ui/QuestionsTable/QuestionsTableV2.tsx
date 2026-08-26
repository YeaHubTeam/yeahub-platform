import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Questions, i18Namespace, ROUTES } from '@/shared/config';
import { route, SelectedAdminEntities } from '@/shared/libs';
import { TableCellEntityList } from '@/shared/ui/TableCellEntityList';
import { TableCellLink } from '@/shared/ui/TableCellLink';
import { TableV2, type TableColumn, type TableRowId } from '@/shared/ui/TableV2';

import { getIsAuthor, getUserId } from '@/entities/profile';
import { Question } from '@/entities/question';

const SKILL_SHOW_COUNT = 4;
const SPECIALIZATION_SHOW_COUNT = 2;
const TOPIC_SHOW_COUNT = 4;

interface QuestionTableRow {
	id: number;
	disabled?: boolean;
	title: string;
	specializations: Question['questionSpecializations'];
	skills: Question['questionSkills'];
	topics: NonNullable<Question['questionTopics']>;
	rate: number;
	complexity: number;
	author: string;
}

interface QuestionsTableV2Props {
	questions: Question[] | [];
	selectedQuestions: SelectedAdminEntities | [];
	onSelectQuestions: (ids: SelectedAdminEntities) => void;
}

export const QuestionsTableV2 = ({
	questions,
	selectedQuestions,
	onSelectQuestions,
}: QuestionsTableV2Props) => {
	const { t } = useTranslation(i18Namespace.questions);
	const isAuthor = useSelector(getIsAuthor);
	const userId = useSelector(getUserId);

	const tableData: QuestionTableRow[] =
		questions?.map((question) => ({
			id: question.id,
			title: question.title,
			specializations: question.questionSpecializations,
			skills: question.questionSkills,
			topics: question.questionTopics ?? [],
			rate: question.rate,
			complexity: question.complexity,
			author: question.createdBy?.username ?? '',
			disabled: isAuthor && question.createdBy?.id !== userId,
		})) ?? [];

	const columns: TableColumn<QuestionTableRow>[] = [
		{
			id: 'title',
			header: t(Questions.TITLE_SHORT),
			cell: ({ row, value }) => (
				<TableCellLink
					to={route(ROUTES.admin.questions.details.route, row.id)}
					text={String(value)}
				/>
			),
		},
		{
			id: 'specializations',
			header: t(Questions.SPECIALIZATION_TITLE),
			cell: ({ row }) => (
				<TableCellEntityList
					url={ROUTES.admin.specializations.details.page}
					items={row.specializations}
					showCount={SPECIALIZATION_SHOW_COUNT}
				/>
			),
		},
		{
			id: 'skills',
			header: t(Questions.SKILLS_TITLE),
			cell: ({ row }) => (
				<TableCellEntityList
					url={ROUTES.admin.skills.detail.page}
					items={row.skills}
					showCount={SKILL_SHOW_COUNT}
				/>
			),
		},
		{
			id: 'topics',
			header: t(Questions.TOPIC_TITLE),
			cell: ({ row }) => (
				<TableCellEntityList
					url={ROUTES.admin.topics.details.page}
					items={row.topics}
					showCount={TOPIC_SHOW_COUNT}
				/>
			),
		},
		{
			id: 'rate',
			header: t(Questions.RATE_TITLE_SHORT),
		},
		{
			id: 'complexity',
			header: t(Questions.COMPLEXITY_TITLE_SHORT),
		},
		{
			id: 'author',
			header: t(Questions.AUTHOR),
		},
	];

	const selectedRowIds = selectedQuestions?.map((question) => question.id);

	const selectedById = useMemo(() => {
		const byId = new Map<number, { id: number; title?: string }>();

		selectedQuestions.forEach((question) => byId.set(question.id, question));
		questions.forEach((question) => {
			byId.set(question.id, { id: question.id, title: question.title });
		});

		return byId;
	}, [questions, selectedQuestions]);

	const onSelectedRowIdsChange = useCallback(
		(ids: TableRowId[]) => {
			onSelectQuestions(ids.map((id) => selectedById.get(id as number) ?? { id: id as number }));
		},
		[onSelectQuestions, selectedById],
	);

	return (
		<TableV2
			data={tableData}
			columns={columns}
			selectedRowIds={selectedRowIds}
			onSelectedRowIdsChange={onSelectedRowIdsChange}
		/>
	);
};
