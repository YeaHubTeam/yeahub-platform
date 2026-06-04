import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { CollectionFormSkeleton } from '@/entities/collection';

import { CollectionCreateFormHeaderSkeleton } from '@/features/collections/createCollection';

export const CollectionCreateFormSkeleton = () => {
	return (
		<Flex componentType="main" direction="column" gap="24">
			<CollectionCreateFormHeaderSkeleton />
			<Card>
				<CollectionFormSkeleton />
			</Card>
		</Flex>
	);
};
