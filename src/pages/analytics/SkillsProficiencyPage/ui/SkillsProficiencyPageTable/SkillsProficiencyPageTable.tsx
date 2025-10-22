import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Analytics } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { Table } from '@/shared/ui/Table';
import { Text } from '@/shared/ui/Text';

import { LearnedQuestion } from '@/entities/question';

import styles from './SkillsProficiencyPageTable.module.css';

type SkillsProficiencyPageTableProps = {
	items: LearnedQuestion[];
};

export const SkillsProficiencyPageTable = ({ items }: SkillsProficiencyPageTableProps) => {
	const { t } = useTranslation(i18Namespace.analytics);
	const { isMobile } = useScreenSize();

	const renderTableHeader = () => {
		const columns = {
			index: t(Analytics.SKILL_PROFICIENCY_COLUMNS_INDEX),
			questions: t(Analytics.SKILL_PROFICIENCY_COLUMNS_QUESTIONS),
			learnedPercentage: t(Analytics.SKILL_PROFICIENCY_COLUMNS_LEARNED_PERCENTAGE),
		};

		return Object.entries(columns)?.map(([k, v]) => <td key={k}>{v}</td>);
	};

	const renderTableBody = (learnedQuestion: LearnedQuestion) => {
		const columns = {
			index: learnedQuestion.rowNumber,
			questions: {
				title: `${learnedQuestion.specialization.title} - ${learnedQuestion.skill.title}`,
				total: `${learnedQuestion.total} ${t(Analytics.SKILL_PROFICIENCY_COLUMN_QUESTIONS_TOTAL)}`,
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
							<Text
								variant={'body1-accent'}
								color={'green-900'}
								className={styles['questions-total']}
							>
								{questionData.total}
							</Text>
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

	if (isMobile) {
		return (
			<ul className={styles['learned-questions']}>
				{items.map((item) => (
					<li key={item.id}>
						<Flex gap="12" direction="column" className={styles['learned-question']}>
							<Text variant={'body1-accent'} className={styles['questions-total']}>
								{item.total} {t(Analytics.SKILL_PROFICIENCY_COLUMN_QUESTIONS_TOTAL)}
							</Text>
							<Text
								variant={'body3-accent'}
							>{`${item.specialization.title} - ${item.skill.title}`}</Text>
							<Flex justify="between">
								<span>{t(Analytics.SKILL_PROFICIENCY_COLUMNS_LEARNED_PERCENTAGE)}</span>
								<span>{`${item.learnedPercentage}%`}</span>
							</Flex>
						</Flex>
					</li>
				))}
			</ul>
		);
	}

	return (
		<Table
			renderTableHeader={renderTableHeader}
			renderTableBody={renderTableBody}
			items={items}
			renderTableColumnWidths={renderTableColumnWidths}
		/>
	);
};
