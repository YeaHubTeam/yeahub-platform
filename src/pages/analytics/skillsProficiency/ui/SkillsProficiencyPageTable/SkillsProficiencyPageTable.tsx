import { useTranslation } from 'react-i18next';

import { i18Namespace, Analytics } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { StatusChip } from '@/shared/ui/StatusChip';
import { TableV2 } from '@/shared/ui/TableV2';
import { TableColumn } from '@/shared/ui/TableV2';
import { Text } from '@/shared/ui/Text';

import { LearnedQuestion } from '@/entities/question';

type SkillsProficiencyPageTableProps = {
	learnedQuestions: LearnedQuestion[];
};

interface SkillsProficiencyTableRow {
	id: number;
	rowNumber: number;
	questions: {
		title: string;
		total: string;
	};
	learnedPercentage: number;
}

export const SkillsProficiencyPageTable = ({
	learnedQuestions,
}: SkillsProficiencyPageTableProps) => {
	const { t } = useTranslation(i18Namespace.analytics);

	const tableData: SkillsProficiencyTableRow[] = learnedQuestions.map((question) => ({
		id: question.id,
		rowNumber: question.rowNumber,
		questions: {
			title: `${question.specialization.title} - ${question.skill.title}`,
			total: t(Analytics.SKILL_PROFICIENCY_BADGE, { count: question.total }),
		},
		learnedPercentage: question.learnedPercentage,
	}));

	const columns: TableColumn<SkillsProficiencyTableRow>[] = [
		{
			id: 'rowNumber',
			header: t(Analytics.SKILL_PROFICIENCY_TABLE_INDEX),
			width: '50px',
		},
		{
			id: 'questions',
			header: t(Analytics.SKILL_PROFICIENCY_TABLE_QUESTIONS),
			cell: ({ row }) => (
				<Flex direction="column" gap="4">
					<Text variant="body3-accent">{row.questions.title}</Text>
					<Flex>
						<StatusChip
							status={{
								text: row.questions.total,
								variant: 'green',
							}}
						/>
					</Flex>
				</Flex>
			),
			width: 'auto',
		},
		{
			id: 'learnedPercentage',
			header: t(Analytics.SKILL_PROFICIENCY_TABLE_LEARNED_PERCENTAGE),
			cell: ({ row }) => `${row.learnedPercentage}%`,
			width: '120px',
		},
	];

	return <TableV2 data={tableData} columns={columns} />;
};
