import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Analytics } from '@/shared/config/i18n/i18nTranslations';
import { Flex } from '@/shared/ui/Flex';
import { StatusChip } from '@/shared/ui/StatusChip';
import { Table } from '@/shared/ui/Table';
import { Text } from '@/shared/ui/Text';

import { LearnedQuestion } from '@/entities/question';

type SkillsProficiencyPageTableProps = {
	learnedQuestions: LearnedQuestion[];
};

export const SkillsProficiencyPageTable = ({
	learnedQuestions,
}: SkillsProficiencyPageTableProps) => {
	const { t } = useTranslation(i18Namespace.analytics);

	const renderTableHeader = () => {
		const columns = {
			index: t(Analytics.SKILL_PROFICIENCY_TABLE_INDEX),
			questions: t(Analytics.SKILL_PROFICIENCY_TABLE_QUESTIONS),
			learnedPercentage: t(Analytics.SKILL_PROFICIENCY_TABLE_LEARNED_PERCENTAGE),
		};

		return Object.entries(columns)?.map(([k, v]) => <td key={k}>{v}</td>);
	};

	const renderTableBody = (learnedQuestion: LearnedQuestion) => {
		const columns = {
			index: learnedQuestion.rowNumber,
			questions: {
				title: `${learnedQuestion.specialization.title} - ${learnedQuestion.skill.title}`,
				total: t(Analytics.SKILL_PROFICIENCY_BADGE, { count: learnedQuestion.total }),
			},
			learnedPercentage: `${learnedQuestion.learnedPercentage}%`,
		};
		return Object.entries(columns)?.map(([k, v]) => {
			if (k === 'questions') {
				const questionData = v as { title: string; total: string };
				return (
					<td key={k}>
						<Flex direction="column" gap="4">
							<Text variant={'body3-accent'}>{questionData.title}</Text>
							<Flex>
								<StatusChip status={{ text: questionData.total, variant: 'green' }} />
							</Flex>
						</Flex>
					</td>
				);
			}
			return (
				<td key={k}>
					<Text variant={'body3-accent'}>{v as string}</Text>
				</td>
			);
		});
	};

	const renderTableColumnWidths = () => {
		const columnWidths = {
			index: '50px',
			questions: 'auto',
			learnedPercentage: '120px',
		};

		return Object.values(columnWidths)?.map((width, idx) => <col key={idx} style={{ width }} />);
	};

	return (
		<Table
			renderTableHeader={renderTableHeader}
			renderTableBody={renderTableBody}
			items={learnedQuestions}
			renderTableColumnWidths={renderTableColumnWidths}
		/>
	);
};
