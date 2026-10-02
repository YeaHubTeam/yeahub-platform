import { useTranslation } from 'react-i18next';

import { i18Namespace, TestQuestions } from '@/shared/config';
import { formatDate } from '@/shared/libs';
import { TableCellEntityList } from '@/shared/ui/TableCellEntityList';
import { TableV2, type TableColumn } from '@/shared/ui/TableV2';

import type { TestQuestion } from '@/entities/testQuestion';

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
	const { t } = useTranslation(i18Namespace.testQuestions);

	const tableData: TestQuestionTableRow[] = testQuestions.map((question) => ({
		id: question.id,
		title: question.title,
		description: question.description,
		specializations: question.questionSpecializations,
		skills: question.questionSkills,
		answersCount: Object.keys(question.variants).length,
		correctAnswersCount: question.successVariants.length,
		complexity: question.complexity,
		rate: question.rate,
		author: question.createdBy?.username ?? '',
		createdAt: question.createdAt ? formatDate(new Date(question.createdAt), 'dd.MM.yyyy') : '',
	}));

	const columns: TableColumn<TestQuestionTableRow>[] = [
		{
			id: 'title',
			header: t(TestQuestions.TITLE),
			width: '240px',
		},
		{
			id: 'description',
			header: t(TestQuestions.DESCRIPTION),
			width: '240px',
		},
		{
			id: 'specializations',
			header: t(TestQuestions.SPECIALIZATIONS),
			width: '260px',
			cell: ({ row }) => (
				<TableCellEntityList items={row.specializations} showCount={SPECIALIZATIONS_SHOW_COUNT} />
			),
		},
		{
			id: 'skills',
			header: t(TestQuestions.SKILLS),
			width: '260px',
			cell: ({ row }) => <TableCellEntityList items={row.skills} showCount={SKILLS_SHOW_COUNT} />,
		},
		{
			id: 'answersCount',
			header: t(TestQuestions.ANSWERS),
			width: '100px',
		},
		{
			id: 'correctAnswersCount',
			header: t(TestQuestions.CORRECT_ANSWERS),
			width: '170px',
		},
		{
			id: 'complexity',
			header: t(TestQuestions.COMPLEXITY),
			width: '120px',
		},
		{
			id: 'rate',
			header: t(TestQuestions.RATE),
			width: '100px',
		},
		{
			id: 'author',
			header: t(TestQuestions.AUTHOR),
			width: '200px',
		},
		{
			id: 'createdAt',
			header: t(TestQuestions.CREATED_AT),
			width: '150px',
		},
	];

	return <TableV2 data={tableData} columns={columns} actions={['copy']} />;
};
