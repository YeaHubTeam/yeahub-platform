import { Flex } from '@/shared/ui/Flex';

import { Resource, resourcesMock } from '@/entities/resource';
import { ResourceCard } from '@/entities/resource';

interface ResourcesListProps {
	resources?: Resource[];
}

export const ResourcesList = ({ resources = resourcesMock }: ResourcesListProps) => {
	return (
		<Flex direction="column" gap="20">
			{resources.map((resource) => (
				<ResourceCard key={resource.id} resource={resource} />
			))}
		</Flex>
	);
};
