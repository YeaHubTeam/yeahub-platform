import { ButtonSkeleton } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { IconButtonSkeleton } from '@/shared/ui/IconButton';
import { Skeleton } from '@/shared/ui/Skeleton';

import { ProgrammingLanguageSelectSkeleton } from '@/entities/programmingLanguage';

import styles from './TaskEditor.module.css';

export const TaskEditorSkeleton = () => {
	return (
		<Flex direction="column" gap="16" className={styles.wrapper}>
			<Card size="small" withOutsideShadow className={styles.header}>
				<Flex align="center" justify="between" gap="24" wrap="wrap">
					<Flex gap="12" align="center">
						<ProgrammingLanguageSelectSkeleton />
						<IconButtonSkeleton />
					</Flex>
					<Flex gap="12" align="center">
						<ButtonSkeleton width={148} />
						<ButtonSkeleton width={148} />
					</Flex>
				</Flex>
			</Card>

			<Card size="small" withOutsideShadow className={styles.block} classNameContent={styles.block}>
				<div className={styles.editor}>
					<Skeleton width="100%" height={600} />
				</div>
			</Card>
		</Flex>
	);
};
