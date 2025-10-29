import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Analytics } from '@/shared/config/i18n/i18nTranslations';
import { Table } from '@/shared/ui/Table';
import { Text } from '@/shared/ui/Text';

import { DifficultQuestionTableRow, TopStat } from '@/entities/question';

import styles from './DifficultQuestionsTable.module.css';

type DifficultQuestionsTableProps = {
	difficultQuestions: TopStat[];
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

	const getAlignmentClasses = (i: number) => {
		return classNames({
			[styles['align-center']]: i === 0,
			[styles['align-start']]: i === 1,
			[styles['align-end']]: i > 1,
		});
	};

	const renderTableHeader = () => {
		const columns = {
			index: t(Analytics.MOST_DIFFICULT_QUESTIONS_COLUMNS_INDEX),
			questions: t(Analytics.MOST_DIFFICULT_QUESTIONS_COLUMNS_QUESTIONS),
			stat: t(Analytics.MOST_DIFFICULT_QUESTIONS_COLUMNS_STAT),
			answersCount: t(Analytics.MOST_DIFFICULT_QUESTIONS_COLUMNS_ANSWERS_COUNT),
		};

		return Object.entries(columns).map(([k, v], i) => (
			<th key={k} className={classNames(styles.th, getAlignmentClasses(i))}>
				<Text variant={'body3-accent'} color={'white-900'}>
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

		return Object.entries(columns).map(([k, v], i) => (
			<td className={getAlignmentClasses(i)} key={k}>
				{v}
			</td>
		));
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
