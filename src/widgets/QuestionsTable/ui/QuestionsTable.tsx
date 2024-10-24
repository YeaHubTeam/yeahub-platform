import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon, Button, Popover, IconButton } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions, Translation } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Flex } from '@/shared/ui/Flex';
import { Table } from '@/shared/ui/Table';

import { Question } from '@/entities/question';

import { DeleteQuestionButton } from '@/features/question/deleteQuestion';

interface QuestionsTableProps {
	questions?: Question[];
	selectedQuestions?: number[];
	onSelectQuestions?: (ids: number[]) => void;
}

export const QuestionsTable = ({
	questions,
	selectedQuestions,
	onSelectQuestions,
}: QuestionsTableProps) => {
	const [openPopovers, setOpenPopovers] = useState<number | null>(null);

	const { t } = useI18nHelpers([i18Namespace.questions, i18Namespace.translation]);

	const renderTableHeader = () => {
		const columns = {
			title: t(Questions.NAME),
			specialization: t(Questions.SPECIALIZATION),
			skills: t(Questions.SKILLS),
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
		const openActions = () => {
			setOpenPopovers(question.id);
		};

		const closeActions = () => {
			setOpenPopovers(null);
		};

		return (
			<Flex gap="4">
				<Popover
					placement="bottom-start"
					body={
						<div>
							<NavLink to={`/admin/questions/${question.id}`}>
								<Flex align="center" gap="4">
									<Button
										style={{ width: 'auto' }}
										aria-label="Large"
										preffix={<Icon icon="eye" size={20} color={'--palette-ui-purple-700'} />}
										theme="tertiary"
									>
										{t(Translation.SHOW, { ns: i18Namespace.translation })}
									</Button>
								</Flex>
							</NavLink>
							<NavLink to={`/admin/questions/${question.id}/edit`}>
								<Flex align="center" gap="4">
									<Button
										style={{ width: 'auto' }}
										aria-label="Large"
										preffix={<Icon icon="pencil" size={20} color={'--palette-ui-purple-700'} />}
										theme="tertiary"
									>
										{t(Translation.EDIT, { ns: i18Namespace.translation })}
									</Button>
								</Flex>
							</NavLink>
							<DeleteQuestionButton questionId={question.id} />
						</div>
					}
					isOpen={openPopovers === question.id}
					onClickOutside={closeActions}
				>
					<div>
						<IconButton
							theme="tertiary"
							onClick={openActions}
							aria-label="Large"
							icon={<Icon icon="dotsThreeVertical" size={20} />}
						/>
					</div>
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
