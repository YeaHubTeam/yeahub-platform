import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, Tasks } from '@/shared/config';
import { BaseFilterItem, BaseFilterSection } from '@/shared/ui/BaseFilterSection';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { Company } from '@/entities/company';
import { ProgrammingLanguage } from '@/entities/programmingLanguage';
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
	companies: Company[];
	className?: string;
	route: string;
}

export const TaskAdditionalInfo = ({
	languages,
	difficulty,
	category,
	companies,
	className = '',
	route,
}: TaskAdditionalInfoProps) => {
	const navigate = useNavigate();

	const { t } = useTranslation(i18Namespace.task);
	const onMoveToTasksWithLanguages = (languageId: number) => {
		navigate(`${route}?page=1&langIds=` + encodeURIComponent(languageId));
	};

	const onMoveToTasksWithCompanies = (companyId: string) => {
		navigate(`${route}?page=1&companyId=` + encodeURIComponent(companyId));
	};

	const serializedLanguages: BaseFilterItem<number>[] = languages.map((language) => ({
		title: language.name,
		id: language.id,
		imageSrc: language.imageSrc,
	}));

	return (
		<Flex direction="column" gap="20">
			<Card className={classnames(styles['additional'], className)} withOutsideShadow>
				<Flex gap="24" direction="column">
					<BaseFilterSection
						data={serializedLanguages}
						title={t(Tasks.LANGUAGES_TITLE)}
						onClick={onMoveToTasksWithLanguages}
						isAllActive
					/>
					<BaseFilterSection
						data={companies}
						title={t(Tasks.COMPANIES_TITLE)}
						onClick={onMoveToTasksWithCompanies}
						isAllActive
					/>

					<Flex direction="column" gap="8">
						<Text variant="body2" color="black-700">
							{t(Tasks.DIFFICULTY_TITLE)}
						</Text>
						<TaskDifficultyChip difficulty={difficulty} />
					</Flex>
					<BaseFilterSection
						title={t(Tasks.CATEGORY_TITLE)}
						data={[
							{
								id: 'category',
								title: t(taskCategories[category]),
							},
						]}
					/>
				</Flex>
			</Card>
		</Flex>
	);
};
