import { BackHeaderSkeleton } from '@/shared/ui/BackHeader';
import { ButtonSkeleton } from '@/shared/ui/Button';
import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { InputSkeleton } from '@/shared/ui/Input';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './SpecializationEditForm.module.css';

export const SpecializationEditFormSkeleton = () => {
	return (
		<Flex componentType="main" direction="column" gap="24">
			<BackHeaderSkeleton>
				<ButtonSkeleton width={120} />
			</BackHeaderSkeleton>

			<CardSkeleton withOutsideShadow className={styles.content}>
				<Flex direction="column" gap="32">
					<TextSkeleton variant="head3" width={320} />

					<Flex align="start" gap="24">
						<Flex direction="column" gap="8" style={{ flex: '0 1 280px' }}>
							<TextSkeleton variant="body3-accent" width="100%" />
							<TextSkeleton variant="body6" width="80%" />
						</Flex>
						<div style={{ width: 320 }}>
							<InputSkeleton />
						</div>
					</Flex>

					<Flex direction="column" gap="16">
						<Flex direction="column" gap="8">
							<TextSkeleton variant="body3-accent" width={220} />
							<TextSkeleton variant="body6" width={280} />
						</Flex>
						<Skeleton width="100%" height={160} borderRadius="16px" />
					</Flex>
				</Flex>
			</CardSkeleton>
		</Flex>
	);
};
