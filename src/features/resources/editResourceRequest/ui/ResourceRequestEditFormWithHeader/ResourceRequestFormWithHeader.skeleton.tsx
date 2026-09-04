import { ButtonSkeleton } from '@/shared/ui/Button';
import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { StatusChipSkeleton } from '@/shared/ui/StatusChip';
import { TextSkeleton } from '@/shared/ui/Text';

import { ResourceFormSkeleton } from '@/entities/resource';

import styles from './ResourceRequestFormWithHeader.module.css';

export const ResourceRequestFormWithHeaderSkeleton = () => {
	return (
		<Flex componentType="main" className={styles.wrapper}>
			<Flex align="center" className={styles.buttons}>
				<ButtonSkeleton size="large" className={styles['submit-button']} width={233} />
			</Flex>
			<CardSkeleton className={styles.content}>
				<Flex direction="column" gap="28">
					<Flex justify="between">
						<TextSkeleton variant="body5-strong" width={200} />
						<StatusChipSkeleton />
					</Flex>
					<ResourceFormSkeleton />
				</Flex>
			</CardSkeleton>
		</Flex>
	);
};
