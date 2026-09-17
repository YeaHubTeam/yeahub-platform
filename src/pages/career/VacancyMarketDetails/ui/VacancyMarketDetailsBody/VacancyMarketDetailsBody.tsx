import { useShowAll } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { KeywordChip } from '@/shared/ui/KeywordChip';
import { Stub } from '@/shared/ui/Stub';
import { Text } from '@/shared/ui/Text';

import {
	VacancyMarketProgressCard,
	VacancyMarketProgressGauge,
	VacancyMarketTopItem,
} from '@/entities/vacancy';

import styles from './VacancyMarketDetailsBody.module.css';

interface VacancyMarketBodyProps {
	titleSkills: string;
	titleTasks: string;
	titleKeywords: string;
	topSkills: VacancyMarketTopItem[];
	topTasks: VacancyMarketTopItem[];
	show: string;
	hide: string;
	softTitle: string;
	priority: VacancyMarketTopItem[];
	topKeywords: VacancyMarketTopItem[];
}

export const VacancyMarketDetailsBody = ({
	show,
	titleSkills,
	titleTasks,
	topSkills,
	titleKeywords,
	topTasks,
	hide,
	softTitle,
	priority,
	topKeywords,
}: VacancyMarketBodyProps) => {
	const [showAll, onToggleShowAll] = useShowAll();
	const [showAllTasks, onToggleShowAllTasks] = useShowAll();
	const [showAllPriority, onToggleShowAllPriority] = useShowAll();
	const [showAllKeywords, onToggleShowAllKeywords] = useShowAll();

	const tasks = showAllTasks ? topTasks : topTasks.slice(0, 8);
	const priorityList = showAllPriority ? priority : priority.slice(0, 6);
	const skills = showAll ? topSkills : topSkills.slice(0, 10);
	const keywords = showAllKeywords ? topKeywords : topKeywords.slice(0, 18);

	return (
		<Flex justify="between" gap="24" className={styles.header} wrap="wrap" align="start">
			<Flex direction="column" gap="20" className={styles.skills}>
				<Text variant="body6">{titleSkills}</Text>

				{topSkills.length > 0 ? (
					<>
						<Flex direction="column" gap="8">
							{skills.map((skill) => {
								const percent = +skill.percent.toFixed();
								return (
									<VacancyMarketProgressCard
										key={skill.title}
										title={skill.title}
										displayedPercent={percent}
										count={skill.count}
									/>
								);
							})}
						</Flex>

						<Button
							className={styles.button}
							variant="link-purple"
							onClick={() => onToggleShowAll()}
						>
							{showAll ? hide : show}
						</Button>
					</>
				) : (
					<Stub type="empty" />
				)}
			</Flex>
			<Flex direction="column" gap="20" className={styles.skills}>
				<Text variant="body6">{titleTasks}</Text>

				{topTasks.length > 0 ? (
					<>
						<Flex direction="column" gap="8">
							{tasks.map((task) => {
								const percent = +task.percent.toFixed();
								return (
									<VacancyMarketProgressCard
										key={task.title}
										title={task.title}
										displayedPercent={percent}
										count={task.count}
									/>
								);
							})}
						</Flex>

						<Button
							className={styles.button}
							variant="link-purple"
							onClick={() => onToggleShowAllTasks()}
						>
							{showAllTasks ? hide : show}
						</Button>
					</>
				) : (
					<Stub type="empty" />
				)}
			</Flex>
			<Flex direction="column" gap="20" className={styles.skills}>
				<Text variant="body6">{titleKeywords}</Text>
				{topKeywords.length > 0 ? (
					<>
						<Flex direction="row" gap="12" wrap="wrap" align="center">
							{keywords.map((keyword, i) => {
								const percent = +keyword.percent.toFixed();

								return (
									<KeywordChip
										key={keyword.title}
										title={`${keyword.title} ${percent}%`}
										variant={i < 3 ? 'accent' : 'default'}
										textColor={i < 3 ? 'purple-700' : 'black-800'}
										textVariant={i < 3 ? 'body3-strong' : 'body3-accent'}
									/>
								);
							})}
						</Flex>

						<Button
							className={styles.button}
							variant="link-purple"
							onClick={() => onToggleShowAllKeywords()}
						>
							{showAllKeywords ? hide : show}
						</Button>
					</>
				) : (
					<Stub type="empty" />
				)}
			</Flex>
			<Flex direction="column" gap="20" className={styles.skills}>
				<Text variant="body6">{softTitle}</Text>
				{priority.length > 0 ? (
					<>
						<Flex direction="row" gap="8" wrap="wrap">
							{priorityList.map((prioritet) => {
								const percent = +prioritet.percent.toFixed();
								return (
									<VacancyMarketProgressGauge
										displayedPercent={percent}
										title={prioritet.title}
										key={prioritet.title}
									/>
								);
							})}
						</Flex>
						<Button
							className={styles.button}
							variant="link-purple"
							onClick={() => onToggleShowAllPriority()}
						>
							{showAllPriority ? hide : show}
						</Button>
					</>
				) : (
					<Stub type="empty" />
				)}
			</Flex>
		</Flex>
	);
};
