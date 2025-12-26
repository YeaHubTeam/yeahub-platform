import { useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { IconSkeleton } from '@/shared/ui/Icon';
import { TablePaginationSkeleton } from '@/shared/ui/TablePagination';
import { TextSkeleton } from '@/shared/ui/Text';

import { ResourcesFiltersSkeleton } from '@/features/resources/filterResources';

import { ResourcesListSkeleton } from '@/widgets/Marketplace';

import styles from './ResourcesPage.module.css';

export const ResourcesPageSkeleton = () => {
	const { isMobile, isTablet } = useScreenSize();

	return (
		<Flex gap="20" align="start">
			<Card className={styles.main}>
				<Flex className={styles.header}>
					<TextSkeleton variant="body6" width={250} />
					<Flex gap="12" align="center">
						{(isMobile || isTablet) && <IconSkeleton size={36} />}
						<IconSkeleton size={28} />
					</Flex>
				</Flex>
				<ResourcesListSkeleton />
				<TablePaginationSkeleton />
			</Card>
			<Card className={styles.filters}>
				<ResourcesFiltersSkeleton />
			</Card>
		</Flex>
	);
};
