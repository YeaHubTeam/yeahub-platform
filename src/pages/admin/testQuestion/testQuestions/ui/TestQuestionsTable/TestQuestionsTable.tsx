import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Questions, i18Namespace, ROUTES } from '@/shared/config';
import { formatDate, route, SelectedAdminEntities } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { TableCellEntityList } from '@/shared/ui/TableCellEntityList';
import { TableCellLink } from '@/shared/ui/TableCellLink';
import { TableV2, type TableColumn, type TableRowId } from '@/shared/ui/TableV2';
import { Text } from '@/shared/ui/Text';

import { TestQuestion } from '@/entities/testQuestion';

const SKILL_SHOW_COUNT = 4;
const SPECIALIZATION_SHOW_COUNT = 2;

interface TestQuestionTableRow {
	id: number;
	title: string;
	variants: number;
	successVariants: number;
	specializations: TestQuestion['questionSpecializations'];
	skills: TestQuestion['questionSkills'];
	rate: number;
	complexity: number;
	authorId: string;
	author: string;
	createdAt: string;
}

interface TestQuestionsTableProps {
	testQuestions: TestQuestion[];
	selectedTestQuestions: SelectedAdminEntities;
	onSelectTestQuestions: (ids: SelectedAdminEntities) => void;
}

export const TestQuestionsTable = ({
	testQuestions,
	selectedTestQuestions,
	onSelectTestQuestions,
}: TestQuestionsTableProps) => {
	const { t } = useTranslation(i18Namespace.questions);

	const tableData: TestQuestionTableRow[] = testQuestions.map((testQuestion) => ({
		id: testQuestion.id,
		title: testQuestion.title,
		variants: testQuestion.variants,
		successVariants: testQuestion.successVariants,
		specializations: testQuestion.questionSpecializations,
		skills: testQuestion.questionSkills,
		rate: testQuestion.rate,
		complexity: testQuestion.complexity,
		authorId: testQuestion.createdBy?.id ?? '',
		author: testQuestion.createdBy?.username ?? '',
		createdAt: testQuestion.createdAt
			? formatDate(new Date(testQuestion.createdAt), 'dd.MM.yyyy')
			: '',
	}));

	const columns: Array<TableColumn<TestQuestionTableRow>> = [
		{
			id: 'title',
			header: t(Questions.TITLE_SHORT),
			width: '400px',
			cell: ({ row }) => (
				<Flex direction="column" gap="4">
					<Text variant="body3-accent">{row.title}</Text>
					<Text variant="body3" color="black-500">
						{`${row.variants} вариантов • ${row.successVariants} правильных ответов`}
					</Text>
				</Flex>
			),
		},
		{
			id: 'specializations',
			header: t(Questions.SPECIALIZATION_TITLE),
			width: '200px',
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
			width: '200px',
			cell: ({ row }) => (
				<TableCellEntityList
					url={ROUTES.admin.skills.details.page}
					items={row.skills}
					showCount={SKILL_SHOW_COUNT}
				/>
			),
		},
		{
			id: 'rate',
			header: t(Questions.RATE_TITLE_SHORT),
			width: '120px',
		},
		{
			id: 'complexity',
			header: t(Questions.COMPLEXITY_TITLE_SHORT),
			width: '120px',
		},
		{
			id: 'author',
			header: t(Questions.AUTHOR),
			width: '160px',
			cell: ({ row }) =>
				row.authorId ? (
					<TableCellLink
						to={route(ROUTES.admin.users.detail.page, row.authorId)}
						text={row.author}
					/>
				) : (
					row.author
				),
		},
		{
			id: 'createdAt',
			header: 'Дата создания',
			width: '140px',
		},
	];

	const selectedRowIds = selectedTestQuestions.map((testQuestion) => testQuestion.id);

	const selectedById = useMemo(() => {
		const byId = new Map<number, { id: number; title?: string }>();

		selectedTestQuestions.forEach((testQuestion) => byId.set(testQuestion.id, testQuestion));
		testQuestions.forEach((testQuestion) => {
			byId.set(testQuestion.id, { id: testQuestion.id, title: testQuestion.title });
		});

		return byId;
	}, [testQuestions, selectedTestQuestions]);

	const onSelectedRowIdsChange = useCallback(
		(ids: TableRowId[]) => {
			onSelectTestQuestions(
				ids.map((id) => selectedById.get(id as number) ?? { id: id as number }),
			);
		},
		[onSelectTestQuestions, selectedById],
	);

	return (
		<TableV2
			data={tableData}
			columns={columns}
			selectedRowIds={selectedRowIds}
			onSelectedRowIdsChange={onSelectedRowIdsChange}
			actions={['copy']}
		/>
	);
};
