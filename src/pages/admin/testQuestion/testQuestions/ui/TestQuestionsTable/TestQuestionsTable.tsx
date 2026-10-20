import { useTranslation } from 'react-i18next';

import { i18Namespace, TestQuestions } from '@/shared/config';
import { formatDate } from '@/shared/libs';
import { TableCellEntityList } from '@/shared/ui/TableCellEntityList';
import { TableV2, type TableColumn } from '@/shared/ui/TableV2';

import type { TestQuestion } from '@/entities/testQuestion';

import { useDeleteTestQuestionMutation } from '@/features/testQuestion/deleteTestQuestion';

interface TestQuestionTableRow {
	id: number;
	title: string;
	description: string;
	specializations: TestQuestion['questionSpecializations'];
	skills: TestQuestion['questionSkills'];
	answersCount: number;
	correctAnswersCount: number;
	complexity: number;
	rate: number;
	author: string;
	createdAt: string;
}

interface TestQuestionsTableProps {
	testQuestions: TestQuestion[];
}

const SPECIALIZATIONS_SHOW_COUNT = 2;
const SKILLS_SHOW_COUNT = 2;

export const TestQuestionsTable = ({ testQuestions }: TestQuestionsTableProps) => {
	const { t } = useTranslation(i18Namespace.testQuestion);
	const [deleteTestQuestion] = useDeleteTestQuestionMutation();

	const tableData: TestQuestionTableRow[] = testQuestions.map((testQuestion) => ({
		id: testQuestion.id,
		title: testQuestion.title,
		description: testQuestion.description,
		specializations: testQuestion.questionSpecializations,
		skills: testQuestion.questionSkills,
		answersCount: Object.keys(testQuestion.variants).length,
		correctAnswersCount: testQuestion.successVariants.length,
		complexity: testQuestion.complexity,
		rate: testQuestion.rate,
		author: testQuestion.createdBy?.username ?? '',
		createdAt: testQuestion.createdAt
			? formatDate(new Date(testQuestion.createdAt), 'dd.MM.yyyy')
			: '',
	}));

	const columns: TableColumn<TestQuestionTableRow>[] = [
		{
			id: 'title',
			header: t(TestQuestions.TABLE_TITLE),
			width: '240px',
		},
		{
			id: 'description',
			header: t(TestQuestions.TABLE_DESCRIPTION),
			width: '240px',
		},
		{
			id: 'specializations',
			header: t(TestQuestions.TABLE_SPECIALIZATIONS),
			width: '260px',
			cell: ({ row }) => (
				<TableCellEntityList items={row.specializations} showCount={SPECIALIZATIONS_SHOW_COUNT} />
			),
		},
		{
			id: 'skills',
			header: t(TestQuestions.TABLE_SKILLS),
			width: '260px',
			cell: ({ row }) => <TableCellEntityList items={row.skills} showCount={SKILLS_SHOW_COUNT} />,
		},
		{
			id: 'answersCount',
			header: t(TestQuestions.TABLE_ANSWERS_ALL),
			width: '100px',
		},
		{
			id: 'correctAnswersCount',
			header: t(TestQuestions.TABLE_ANSWERS_CORRECT),
			width: '170px',
		},
		{
			id: 'complexity',
			header: t(TestQuestions.TABLE_COMPLEXITY),
			width: '120px',
		},
		{
			id: 'rate',
			header: t(TestQuestions.TABLE_RATE),
			width: '100px',
		},
		{
			id: 'author',
			header: t(TestQuestions.TABLE_AUTHOR),
			width: '200px',
		},
		{
			id: 'createdAt',
			header: t(TestQuestions.TABLE_CREATED_AT),
			width: '150px',
		},
	];

	return (
		<TableV2
			data={tableData}
			columns={columns}
			actions={['delete', 'copy']}
			onDelete={(id) => deleteTestQuestion(Number(id))}
		/>
	);
};
