import { useTranslation } from 'react-i18next';
import { generatePath, Link } from 'react-router-dom';

import { i18Namespace, ROUTES, Tasks } from '@/shared/config';
import { Project, useCurrentProject } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Text } from '@/shared/ui/Text';
import { Tooltip } from '@/shared/ui/Tooltip';

import { CompanyCompactList } from '@/entities/company/@x/task';
import { ProgrammingLanguageList } from '@/entities/programmingLanguage/@x/task';

import { Task } from '../../model/types/task';
import { TaskCategoryChip } from '../TaskCategoryChip/TaskCategoryChip';
import { TaskDifficultyChip } from '../TaskDifficultyChip/TaskDifficultyChip';
import { TaskStatusChip } from '../TaskStatusChip/TaskStatusChip';

import styles from './TaskCard.module.css';

type TaskCardProps = {
	task: Task;
	className?: string;
};

export const TaskCard = ({ task, className }: TaskCardProps) => {
	const { id, name, difficulty, mainCategory, status, supportedLanguages, canSolve, companies } =
		task;
	const { t } = useTranslation(i18Namespace.task);
	const project = useCurrentProject();

	const taskPath: Record<Project, string> = {
		admin: generatePath(ROUTES.admin.tasks.details.page, { taskId: id }),
		platform: canSolve ? generatePath(ROUTES.tasks.detail.page, { taskId: id }) : '',
	};

	return (
		<Tooltip
			shouldShowTooltip={!canSolve && project === 'platform'}
			title={t(Tasks.NOT_AVAILABLE)}
			placement="right"
		>
			<Link
				to={taskPath[project]}
				className={className}
				onClick={(e) => !canSolve && project === 'platform' && e.preventDefault()}
			>
				<Card
					withOutsideShadow
					className={styles.content}
					withHover={canSolve || project === 'admin'}
				>
					<Flex direction="column" gap="20">
						<Flex justify="between" align="start" gap="16">
							{canSolve || project === 'admin' ? (
								<Text variant="body4" maxRows={2}>
									{name}
								</Text>
							) : (
								<Skeleton
									variant="blur"
									text={<Text variant="body4">{t(Tasks.TITLE_HIDE)}</Text>}
								/>
							)}
						</Flex>

						<Flex align="center" gap="10" wrap="wrap">
							{project === 'platform' && <TaskStatusChip status={status} size="medium" />}
							<TaskDifficultyChip difficulty={difficulty} />
							<ProgrammingLanguageList languages={supportedLanguages} />
							<TaskCategoryChip category={mainCategory} />
							<CompanyCompactList companies={companies} />
						</Flex>
					</Flex>
				</Card>
			</Link>
		</Tooltip>
	);
};
