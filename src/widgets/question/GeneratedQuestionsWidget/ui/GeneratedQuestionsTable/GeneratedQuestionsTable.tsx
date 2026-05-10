import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Questions, Translation, i18Namespace, ROUTES } from '@/shared/config';
import { route } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';
import { Popover, PopoverMenuItem } from '@/shared/ui/Popover';
import { Table } from '@/shared/ui/Table';
import { TableCellEntityList } from '@/shared/ui/TableCellEntityList';
import { Text } from '@/shared/ui/Text';

import { useGetSkillsListQuery } from '@/entities/skill';
import { useGetSpecializationsListQuery } from '@/entities/specialization';

import { GeneratedQuestionsSuccess } from '@/features/question/createMultipleQuestions';

const SKILL_SHOW_COUNT = 4;
const SPECIALIZATION_SHOW_COUNT = 2;

interface GeneratedQuestion {
	id: number;
	title: string;
	specializations: { id: number; title: string }[];
	skills: { id: number; title: string }[];
	rate: number;
	complexity: number;
}

interface GeneratedQuestionsTableProps {
	generatedQuestionsSuccess: GeneratedQuestionsSuccess[];
}

export const GeneratedQuestionsTable = ({
	generatedQuestionsSuccess,
}: GeneratedQuestionsTableProps) => {
	const { t } = useTranslation([i18Namespace.questions, i18Namespace.translation]);

	const { data: specializationsData } = useGetSpecializationsListQuery({ limit: 100 });
	const { data: skillsData } = useGetSkillsListQuery({ limit: 100 });

	const specializationsMap = useMemo(() => {
		const map = new Map<number, string>();
		specializationsData?.data?.forEach((s) => map.set(s.id, s.title));
		return map;
	}, [specializationsData]);

	const skillsMap = useMemo(() => {
		const map = new Map<number, string>();
		skillsData?.data?.forEach((s) => map.set(s.id, s.title));
		return map;
	}, [skillsData]);

	const tableItems = useMemo(() => {
		return generatedQuestionsSuccess.map((question) => ({
			id: question.questionId as number,
			title: question.generatedDto?.title ?? '',
			specializations: question.generatedDto?.specializations.map((id) => ({
				id,
				title: specializationsMap.get(id) ?? String(id),
			})),
			skills: question.generatedDto!.skills.map((id) => ({
				id,
				title: skillsMap.get(id) ?? String(id),
			})),
			rate: question.generatedDto!.rate,
			complexity: question.generatedDto!.complexity,
		}));
	}, [generatedQuestionsSuccess, specializationsMap, skillsMap]);

	const renderTableColumnWidths = () => {
		const columnWidths = {
			title: 'auto',
			specializations: '20%',
			skills: '15%',
			rate: '5%',
			complexity: '5%',
		};

		return Object.values(columnWidths).map((width, idx) => <col key={idx} style={{ width }} />);
	};

	const renderTableHeader = () => {
		const columns = {
			title: t(Questions.TITLE_SHORT),
			specializations: t(Questions.SPECIALIZATION_TITLE),
			skills: t(Questions.SKILLS_TITLE),
			rate: t(Questions.RATE_TITLE_SHORT),
			complexity: t(Questions.COMPLEXITY_TITLE_SHORT),
		};

		return Object.entries(columns).map(([k, v]) => <td key={k}>{v}</td>);
	};

	const renderTableBody = (question: GeneratedQuestion) => {
		return (
			<>
				<td>
					<a
						href={route(ROUTES.admin.questions.details.page, question.id)}
						target="_blank"
						rel="noopener noreferrer"
					>
						<Text variant="body3-accent">{question.title}</Text>
					</a>
				</td>
				<td>
					<TableCellEntityList
						url={ROUTES.admin.specializations.details.page}
						items={question.specializations}
						showCount={SPECIALIZATION_SHOW_COUNT}
					/>
				</td>
				<td>
					<TableCellEntityList
						url={ROUTES.admin.skills.detail.page}
						items={question.skills}
						showCount={SKILL_SHOW_COUNT}
					/>
				</td>
				<td>{question.rate}</td>
				<td>{question.complexity}</td>
			</>
		);
	};

	const renderActions = (question: GeneratedQuestion) => {
		const menuItems: PopoverMenuItem[] = [
			{
				icon: <Icon icon="eye" size={24} />,
				title: t(Translation.SHOW, { ns: i18Namespace.translation }),
				onClick: () => {
					window.open(route(ROUTES.admin.questions.details.page, question.id), '_blank');
				},
			},
			{
				icon: <Icon icon="pen" size={24} />,
				title: t(Translation.EDIT, { ns: i18Namespace.translation }),
				onClick: () => {
					window.open(route(ROUTES.admin.questions.edit.page, question.id), '_blank');
				},
			},
		];

		return (
			<Flex gap="4">
				<Popover menuItems={menuItems}>
					{({ onToggle }) => (
						<IconButton
							aria-label="go to details"
							form="square"
							icon={<Icon icon="dotsThreeVertical" size={20} />}
							size="medium"
							variant="tertiary"
							onClick={onToggle}
						/>
					)}
				</Popover>
			</Flex>
		);
	};

	if (tableItems.length === 0) {
		return null;
	}

	return (
		<Table
			renderTableHeader={renderTableHeader}
			renderTableBody={renderTableBody}
			renderActions={renderActions}
			items={tableItems}
			renderTableColumnWidths={renderTableColumnWidths}
		/>
	);
};
