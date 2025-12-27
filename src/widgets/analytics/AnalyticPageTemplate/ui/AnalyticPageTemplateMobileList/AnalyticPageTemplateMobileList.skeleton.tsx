import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './AnalyticPageTemplateMobileList.module.css';

export const AnalyticPageTemplateMobileListSkeleton = () => {
	return (
		<Flex componentType="ul" direction="column" gap="16">
			{[...Array(10)].map((_, index) => (
				<li key={index}>
					<div className={styles.card} style={{ backgroundColor: 'var(--color-black-30)' }}>
						<Flex gap="12" direction="column">
							<TextSkeleton variant="body3-accent" width="80%" />

							<Flex justify="between">
								<TextSkeleton variant="body3-accent" width="40%" />
								<TextSkeleton variant="body3-accent" width="20%" />
							</Flex>

							<Flex justify="between">
								<TextSkeleton variant="body3-accent" width="40%" />
								<TextSkeleton variant="body3-accent" width="20%" />
							</Flex>
						</Flex>
					</div>
				</li>
			))}
		</Flex>
	);
};
