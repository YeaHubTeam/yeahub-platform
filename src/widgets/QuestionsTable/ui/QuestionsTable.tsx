import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions, Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { SelectedAdminEntities } from '@/shared/types/types';
import { Flex } from '@/shared/ui/Flex';
import { IconButton } from '@/shared/ui/IconButton';
import { Popover, PopoverMenuItem } from '@/shared/ui/Popover';
import { Table } from '@/shared/ui/Table';

import { Question } from '@/entities/question';

import { DeleteQuestionButton } from '@/features/question/deleteQuestion';

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

	const renderTableHeader = () => {
		const columns = {
			title: t(Questions.TITLE_SHORT),
			specialization: t(Questions.SPECIALIZATION_TITLE),
			skills: t(Questions.SKILLS_TITLE),
		};

		return Object.entries(columns)?.map(([k, v]) => <td key={k}>{v}</td>);
	};

	const renderTableBody = (question: Question) => {
		const columns = {
			title: question.title,
			specialization: question.questionSpecializations?.length
				? question.questionSpecializations?.map((skill) => skill.title).join(', ')
				: '-',
			skills: question.questionSkills?.length
				? question.questionSkills?.map((skill) => skill.title).join(', ')
				: '-',
		};

		return Object.entries(columns)?.map(([k, v]) => <td key={k}>{v}</td>);
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
				icon: <Icon icon="pencil" size={24} />,
				title: t(Translation.EDIT, { ns: i18Namespace.translation }),
				onClick: () => {
					navigate(route(ROUTES.admin.questions.edit.route, question.id));
				},
			},
			{
				renderComponent: () => <DeleteQuestionButton questionId={question.id} />,
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
							size="M"
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
		/>
	);
};
