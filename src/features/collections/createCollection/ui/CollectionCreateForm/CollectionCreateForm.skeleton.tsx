import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { CollectionFormSkeleton } from '@/entities/collection';

import { CollectionCreateFormHeaderSkeleton } from '../../ui/CollectionCreateFormHeader/CollectionCreateFormHeader.skeleton';

export const CollectionCreateFormSkeleton = () => {
	return (
		<Flex componentType="main" direction="column" gap="24">
			<CollectionCreateFormHeaderSkeleton />
			<CardSkeleton>
				<CollectionFormSkeleton />
			</CardSkeleton>
		</Flex>
	);
};
