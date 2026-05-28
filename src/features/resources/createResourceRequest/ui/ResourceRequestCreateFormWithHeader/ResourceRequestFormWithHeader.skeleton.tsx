import { ButtonSkeleton } from '@/shared/ui/Button';
import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import { ResourceFormSkeleton } from '@/entities/resource';

import styles from './ResourceRequestFormWithHeader.module.css';

export const ResourceRequestFormWithHeaderSkeleton = () => {
	return (
		<Flex componentType="main" className={styles.wrapper}>
			<Flex align="center" className={styles.buttons}>
				<ButtonSkeleton size="large" width={210} className={styles['submit-button']} />
			</Flex>

			<CardSkeleton className={styles.content}>
				<Flex direction="column" gap="28">
					<TextSkeleton variant="body5-strong" width={220} />
					<ResourceFormSkeleton />
				</Flex>
			</CardSkeleton>
		</Flex>
	);
};
