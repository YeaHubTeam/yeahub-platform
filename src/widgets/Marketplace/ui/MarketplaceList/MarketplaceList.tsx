import { Flex } from '@/shared/ui/Flex';

import { Resource, resourcesMock } from '@/entities/marketplace';
import { ResourceCard } from '@/entities/marketplace';

interface MarketplaceListProps {
	resources?: Resource[];
}

export const MarketplaceList = ({ resources = resourcesMock }: MarketplaceListProps) => {
	return (
		<Flex direction="column" gap="20">
			{resources.map((resource) => (
				<ResourceCard key={resource.id} resource={resource} />
			))}
		</Flex>
	);
};
