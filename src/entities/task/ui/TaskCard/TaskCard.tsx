import classnames from 'classnames';
import { Link } from 'react-router-dom';

import { ROUTES } from '@/shared/config';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { StatusChip } from '@/shared/ui/StatusChip';
import { Text } from '@/shared/ui/Text';

import { TaskListItem } from '../../model/types/task';

import styles from './TaskCard.module.css';

type TaskCardProps = {
	task: TaskListItem;
	className?: string;
};

export const TaskCard = ({ task, className }: TaskCardProps) => {
	const { id, name, difficulty, mainCategory, status } = task;

	const taskPath = `${ROUTES.tasks.page}/${id}`;

	return (
		<Link to={taskPath} className={className}>
			<Card withOutsideShadow className={styles.content}>
				<div className={classnames(styles.wrapper, styles.row)}>
					<Flex direction="column" gap="16" className={styles['wrapper-content']}>
						<div className={styles.header}>
							<ul className={styles.tags}>
								<li>
									<StatusChip status={{ text: mainCategory, variant: 'purple' }} />
								</li>
							</ul>
							<StatusChip
								status={{
									text: status,
									variant: status === 'SOLVED' ? 'green' : 'yellow',
								}}
							/>
						</div>
						<Flex direction="column" gap="20">
							<Text className={styles['card-title']} variant="body3-accent" maxRows={2}>
								{name}
							</Text>
							<div className={styles['info-container']}>
								<div className={styles['access-item']}>
									<Text variant="body2" color="purple-700">
										Difficulty: {difficulty}
									</Text>
								</div>
							</div>
						</Flex>
					</Flex>
				</div>
			</Card>
		</Link>
	);
};
