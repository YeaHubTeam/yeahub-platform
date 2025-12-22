import { useTranslation } from 'react-i18next';

import { i18Namespace, Analytics } from '@/shared/config';
import { Table } from '@/shared/ui/Table';
import { Text } from '@/shared/ui/Text';

import { MostDifficultQuestion } from '@/entities/question';

export type DifficultQuestionTableRow = Omit<MostDifficultQuestion, 'questionId'> & {
	id: number;
	rowId: number;
};

type DifficultQuestionsTableProps = {
	difficultQuestions: MostDifficultQuestion[];
};

export const DifficultQuestionsTable = ({ difficultQuestions }: DifficultQuestionsTableProps) => {
	const { t } = useTranslation(i18Namespace.analytics);

	const tableItems: DifficultQuestionTableRow[] = difficultQuestions.map((difficultQuestion, i) => {
		return {
			id: difficultQuestion.questionId,
			title: difficultQuestion.title,
			answersCount: difficultQuestion.answersCount,
			stat: difficultQuestion.stat,
			rowId: i + 1,
		};
	});

	const renderTableHeader = () => {
		const columns = {
			index: t(Analytics.MOST_DIFFICULT_QUESTIONS_TABLE_INDEX),
			questions: t(Analytics.MOST_DIFFICULT_QUESTIONS_TABLE_QUESTIONS),
			stat: t(Analytics.MOST_DIFFICULT_QUESTIONS_TABLE_STAT),
			answersCount: t(Analytics.MOST_DIFFICULT_QUESTIONS_TABLE_ANSWERS_COUNT),
		};

		return Object.entries(columns).map(([k, v]) => (
			<th key={k}>
				<Text variant="body3-accent" color="white-900">
					{v}
				</Text>
			</th>
		));
	};

	const renderTableBody = (difficultQuestion: DifficultQuestionTableRow) => {
		const columns = {
			index: difficultQuestion.rowId,
			questions: difficultQuestion.title,
			stat: `${Math.round(difficultQuestion.stat)}%`,
			answersCount: difficultQuestion.answersCount,
		};

		return Object.entries(columns).map(([k, v]) => <td key={k}>{v}</td>);
	};

	const renderTableColumnWidths = () => {
		const columnWidths = {
			index: '50px',
			questions: 'auto',
			stat: '120px',
			answersCount: '120px',
		};
		return Object.values(columnWidths)?.map((width, i) => <col key={i} style={{ width }} />);
	};

	return (
		<Table
			items={tableItems}
			renderTableHeader={renderTableHeader}
			renderTableBody={renderTableBody}
			renderTableColumnWidths={renderTableColumnWidths}
		/>
	);
};
