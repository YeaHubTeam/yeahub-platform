import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions, Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { SelectedAdminEntities } from '@/shared/types/types';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';
import { Popover, PopoverMenuItem } from '@/shared/ui/Popover';
import { Table } from '@/shared/ui/Table';
import { TableCellEntityList } from '@/shared/ui/TableCellEntityList/TableCellEntityList';
import { Text } from '@/shared/ui/Text';

import { Question } from '@/entities/question';

import { DeleteQuestionButton } from '@/features/question/deleteQuestion';

const SKILL_SHOW_COUNT = 4;
const SPECIALIZATION_SHOW_COUNT = 2;

interface QuestionsTableProps {
	questions?: Question[];
	selectedQuestions?: SelectedAdminEntities;
	onSelectQuestions?: (ids: SelectedAdminEntities) => void;
}

export const QuestionsTable = ({
	questions,
	selectedQuestions,
	onSelectQuestions,
}: QuestionsTableProps) => {
	const navigate = useNavigate();

	const { t } = useTranslation([i18Namespace.questions, i18Namespace.translation]);

	const renderTableColumnWidths = () => {
		const columnWidths = {
			title: 'auto',
			specialization: '20%',
			skills: '15%',
			rate: '5%',
			complexity: '5%',
			author: '10%',
		};

		return Object.values(columnWidths)?.map((width, idx) => <col key={idx} style={{ width }} />);
	};

	const renderTableHeader = () => {
		const columns = {
			title: t(Questions.TITLE_SHORT),
			specialization: t(Questions.SPECIALIZATION_TITLE),
			skills: t(Questions.SKILLS_TITLE),
			rate: t(Questions.RATE_TITLE_SHORT),
			complexity: t(Questions.COMPLEXITY_TITLE_SHORT),
			author: t(Questions.AUTHOR),
		};

		return Object.entries(columns)?.map(([k, v]) => <td key={k}>{v}</td>);
	};

	const renderTableBody = (question: Question) => {
		const columns = {
			title: question.title,
			specialization: (
				<TableCellEntityList
					url={ROUTES.admin.specializations.details.page}
					items={question.questionSpecializations}
					showCount={SPECIALIZATION_SHOW_COUNT}
				/>
			),
			skills: (
				<TableCellEntityList
					url={ROUTES.admin.skills.detail.page}
					items={question.questionSkills}
					showCount={SKILL_SHOW_COUNT}
				/>
			),
			rate: question.rate,
			complexity: question.complexity,
			author: question.createdBy.username,
		};

		return Object.entries(columns)?.map(([k, v]) => {
			return (
				<td key={k}>
					{k === 'title' ? (
						<Link to={route(ROUTES.admin.questions.details.route, question.id)}>
							<Text variant={'body3-accent'}>{v}</Text>
						</Link>
					) : (
						v
					)}
				</td>
			);
		});
	};

	const renderActions = (question: Question) => {
		const menuItems: PopoverMenuItem[] = [
			{
				icon: <Icon icon="eye" size={24} />,
				title: t(Translation.SHOW, { ns: i18Namespace.translation }),
				onClick: () => {
					navigate(route(ROUTES.admin.questions.details.route, question.id));
				},
			},
			{
				icon: <Icon icon="pen" size={24} />,
				title: t(Translation.EDIT, { ns: i18Namespace.translation }),
				onClick: () => {
					navigate(route(ROUTES.admin.questions.edit.route, question.id));
				},
				tooltip: {
					color: 'red',
					text: t(Translation.TOOLTIP_COLLECTION_DISABLED_INFO, { ns: i18Namespace.translation }),
				},
				disabled: question.disabled,
			},
			{
				renderComponent: () => (
					<DeleteQuestionButton questionId={question.id} disabled={question.disabled} />
				),
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

	if (!questions) {
		return null;
	}

	return (
		<Table
			renderTableHeader={renderTableHeader}
			renderTableBody={renderTableBody}
			renderActions={renderActions}
			items={questions}
			selectedItems={selectedQuestions}
			onSelectItems={onSelectQuestions}
			renderTableColumnWidths={renderTableColumnWidths}
			hasCopyButton
		/>
	);
};
