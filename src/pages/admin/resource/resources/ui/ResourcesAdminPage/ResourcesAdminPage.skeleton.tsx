import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { TableSkeleton } from '@/shared/ui/Table';

export const ResourcesAdminPageSkeleton = () => {
	return (
		<Flex componentType="main" direction="column" gap="24">
			<Card>
				<TableSkeleton hasCopyButton />
			</Card>
		</Flex>
	);
};
