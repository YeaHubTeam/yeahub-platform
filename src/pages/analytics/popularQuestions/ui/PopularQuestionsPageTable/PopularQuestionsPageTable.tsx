import { useTranslation } from 'react-i18next';

import { i18Namespace, Analytics } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { TableV2, type TableColumn } from '@/shared/ui/TableV2';
import { Text } from '@/shared/ui/Text';

import { PopularQuestionStat } from '@/entities/question';

import styles from './PopularQuestionsPageTable.module.css';

type PopularQuestionsPageTableProps = {
	popularQuestions: PopularQuestionStat[];
};

export const PopularQuestionsPageTable = ({ popularQuestions }: PopularQuestionsPageTableProps) => {
	const { t } = useTranslation(i18Namespace.analytics);
	const columns: TableColumn<PopularQuestionStat>[] = [
		{
			id: 'id',
			header: t(Analytics.POPULAR_QUESTIONS_TABLE_INDEX),
			width: '50px',
			cell: ({ rowIndex }) => <Text variant="body3-accent">{rowIndex + 1}</Text>,
		},
		{
			id: 'title',
			header: t(Analytics.POPULAR_QUESTIONS_TABLE_QUESTIONS),
			width: 'auto',
			cell: ({ row }) => (
				<Flex gap="4" align="center">
					<ImageWithWrapper src={row.imageSrc} className={styles.icon} />
					<Text variant="body3-accent">{row.title}</Text>
				</Flex>
			),
		},
		{
			id: 'frequencyStat',
			header: t(Analytics.POPULAR_QUESTIONS_TABLE_ANSWER),
			width: '120px',
			cell: ({ row }) => <Text variant="body3-accent">{row.frequencyStat}%</Text>,
		},
	];

	return <TableV2 data={popularQuestions} columns={columns} />;
};
