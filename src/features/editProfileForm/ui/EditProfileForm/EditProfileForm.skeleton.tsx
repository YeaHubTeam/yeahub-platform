import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

import styles from './EditProfileForm.module.css';
export const EditProfileFormSkeleton = () => {
	return (
		<Card className={styles['card-wrap']}>
			<Flex direction="column" className={styles['flex-wrap']}>
				<Flex style={{ flexWrap: 'wrap', columnGap: 120, rowGap: 16 }}>
					<Skeleton width={246} height={76} />
					<Flex gap="16" style={{ flexWrap: 'wrap' }}>
						<Flex gap="8" direction="column" align="center">
							<Skeleton width={170} height={170} />
							<Skeleton width={91} height={19} />
						</Flex>
						<Skeleton height={170} width={'clamp(360px, 53vw, 475px)'} />
					</Flex>
				</Flex>
				<Flex style={{ flexWrap: 'wrap', columnGap: 120, rowGap: 16 }}>
					<Skeleton width={246} height={76} />
					<Flex direction="column">
						<Flex gap="12" style={{ flexWrap: 'wrap', maxWidth: 668 }}>
							{[...Array(2)].map((_, i) => (
								<Flex key={i} style={{ flexWrap: 'wrap', gap: 12 }}>
									{[...Array(3)].map((_, j) => (
										<Flex key={j} direction="column" gap="8">
											<Skeleton width={48} height={19} />
											<Skeleton width={328} height={48} borderRadius={68} />
										</Flex>
									))}
								</Flex>
							))}
							<Flex direction="column" gap="8" style={{ flexBasis: '330px' }}>
								<Skeleton width={48} height={19} />
								<Skeleton width={328} height={48} borderRadius={68} />
							</Flex>
						</Flex>
					</Flex>
				</Flex>
				<Flex style={{ flexWrap: 'wrap', columnGap: 120, rowGap: 16 }}>
					<Flex>
						<Skeleton width={246} height={76} />
					</Flex>
					<Flex direction="column" gap="24">
						<Flex direction="column" gap="8">
							<Skeleton width={77} height={19} />
							<Skeleton width={408} height={48} borderRadius={68} />
						</Flex>
						<Flex gap="12" style={{ flexWrap: 'wrap', maxWidth: 668 }}>
							{[...Array(9)].map((_, j) => (
								<Flex key={j} direction="column" gap="8">
									<Skeleton width={48} height={19} />
									<Skeleton width={328} height={48} borderRadius={68} />
								</Flex>
							))}
						</Flex>
					</Flex>
				</Flex>
				<Skeleton width={170} height={48} className={styles.button} borderRadius={40} />
			</Flex>
		</Card>
	);
};
