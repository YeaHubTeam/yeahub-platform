import { BackButtonSkeleton } from '@/shared/ui/BackButton';
import { ButtonSkeleton } from '@/shared/ui/Button';
import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import { ResourceFormSkeleton } from '@/entities/resource';

import styles from './ResourceCreateFormWithHeader.module.css';

export const ResourceCreateFormWithHeaderSkeleton = () => {
	return (
		<Flex componentType="main" direction="column" gap="24" className={styles.wrapper}>
			<div className={styles.back}>
				<BackButtonSkeleton />
			</div>

			<Flex gap="20" align="center" className={styles.buttons}>
				<ButtonSkeleton width={150} className={styles['submit-button']} />
			</Flex>

			<CardSkeleton className={styles.content}>
				<Flex direction="column" gap="32">
					<TextSkeleton variant="body6" width={260} />
					<ResourceFormSkeleton />
				</Flex>
			</CardSkeleton>
		</Flex>
	);
};
