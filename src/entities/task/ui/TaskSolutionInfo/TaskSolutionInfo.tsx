import { useTranslation } from 'react-i18next';

import { i18Namespace, Tasks } from '@/shared/config';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';
import { TextHtml } from '@/shared/ui/TextHtml';

import { TaskSolution } from '../../model/types/task';

import styles from './TaskSolutionInfo.module.css';

interface TaskSolutionInfoProps {
	solution: TaskSolution;
	setSelectedSolution: (solution: TaskSolution | null) => void;
}

export const TaskSolutionInfo = ({ solution, setSelectedSolution }: TaskSolutionInfoProps) => {
	const { t } = useTranslation(i18Namespace.task);

	return (
		<Flex direction="column" align="start" gap="20">
			<Button
				className={styles.button}
				preffix={<Icon icon="altArrowLeft" size={20} />}
				variant="link-gray"
				size="large"
				onClick={() => setSelectedSolution(null)}
			>
				{t(Tasks.SOLUTIONS_BACK_BUTTON)}
			</Button>
			<Text variant="body5-accent" color={solution.status === 'solved' ? 'green-800' : 'red-700'}>
				{t(
					solution.status === 'solved' ? Tasks.TABLE_STATUS_SOLVED : Tasks.TABLE_STATUS_NOT_SOLVED,
				)}
			</Text>
			<TextHtml className={styles.code} html={`<pre><code>${solution.solutionCode}</code></pre>`} />
		</Flex>
	);
};
