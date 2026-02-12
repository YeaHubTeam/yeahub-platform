import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, Tasks } from '@/shared/config';
import { Card } from '@/shared/ui/Card';
import { Chip } from '@/shared/ui/Chip';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { ProgrammingLanguage, ProgrammingLanguageChipList } from '@/entities/programmingLanguage';
import {
	TaskCategoryCode,
	TaskDifficulty,
	TaskDifficultyChip,
	taskCategories,
} from '@/entities/task';

import styles from './TaskAdditionalInfo.module.css';

export interface TaskAdditionalInfoProps {
	languages: ProgrammingLanguage[];
	difficulty: TaskDifficulty;
	category: TaskCategoryCode;
	className?: string;
	route: string;
}

export const TaskAdditionalInfo = ({
	languages,
	difficulty,
	category,
	className = '',
	route,
}: TaskAdditionalInfoProps) => {
	const navigate = useNavigate();

	const { t } = useTranslation(i18Namespace.task);
	const onMoveToTasksWithLanguages = (languageId: number) => {
		navigate(`${route}?page=1&langIds=` + encodeURIComponent(languageId));
	};

	return (
		<Flex direction="column" gap="20">
			<Card className={classnames(styles['additional'], className)} withOutsideShadow>
				<Flex gap="24" direction="column">
					<Flex direction="column" gap="8">
						<Text variant="body2" color="black-700">
							{t(Tasks.LANGUAGES_TITLE)}
						</Text>
						<ProgrammingLanguageChipList
							languages={languages}
							onClick={onMoveToTasksWithLanguages}
						/>
					</Flex>

					<Flex direction="column" gap="8">
						<Text variant="body2" color="black-700">
							{t(Tasks.DIFFICULTY_TITLE)}
						</Text>
						<TaskDifficultyChip difficulty={difficulty} />
					</Flex>
					<Flex direction="column" gap="8">
						<Text variant="body2" color="black-700">
							{t(Tasks.CATEGORY_TITLE)}
						</Text>
						<Chip label={t(taskCategories[category])} />
					</Flex>
				</Flex>
			</Card>
		</Flex>
	);
};
