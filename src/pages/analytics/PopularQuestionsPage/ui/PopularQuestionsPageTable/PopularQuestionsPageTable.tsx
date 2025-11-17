import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Analytics } from '@/shared/config/i18n/i18nTranslations';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { Table } from '@/shared/ui/Table';
import { Text } from '@/shared/ui/Text';

import { PopularQuestionStat } from '@/entities/question';

import styles from './PopularQuestionsPageTable.module.css';

type PopularQuestionsPageTableProps = {
	popularQuestions: PopularQuestionStat[];
};

export const PopularQuestionsPageTable = ({ popularQuestions }: PopularQuestionsPageTableProps) => {
	const { t } = useTranslation(i18Namespace.analytics);

	const renderTableHeader = () => {
		const columns = {
			index: t(Analytics.POPULAR_QUESTIONS_TABLE_INDEX),
			question: t(Analytics.POPULAR_QUESTIONS_TABLE_QUESTIONS),
			answer: t(Analytics.POPULAR_QUESTIONS_TABLE_ANSWER),
		};

		return Object.entries(columns)?.map(([k, v]) => <td key={k}>{v}</td>);
	};

	const renderTableBody = (popularQuestion: PopularQuestionStat, index: number | undefined) => {
		const columns = {
			index: (index as number) + 1,
			question: {
				img: popularQuestion.imageSrc,
				title: popularQuestion.title,
			},
			answer: `${popularQuestion.frequencyStat}%`,
		};
		return Object.entries(columns)?.map(([k, v]) => {
			if (k === 'question') {
				const questionData = v as { img: string; title: string };
				return (
					<td key={k}>
						<Flex gap="4" align="center">
							<ImageWithWrapper src={questionData.img} className={styles.icon} />
							<Text variant={'body3-accent'}>{questionData.title}</Text>
						</Flex>
					</td>
				);
			}

			return (
				<td key={k}>
					<Text variant={'body3-accent'}>{String(v)}</Text>
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
			items={popularQuestions}
			renderTableColumnWidths={renderTableColumnWidths}
		/>
	);
};
