import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { CollectionFormSkeleton } from '@/entities/collection';

import { CollectionEditFormHeaderSkeleton } from '../CollectionEditFormHeader/CollectionEditFormHeader.skeleton';

export const CollectionEditFormSkeleton = () => {
	return (
		<Flex direction="column" gap="24">
			<CollectionEditFormHeaderSkeleton />
			<CardSkeleton>
				<CollectionFormSkeleton />
			</CardSkeleton>
		</Flex>
	);
};
