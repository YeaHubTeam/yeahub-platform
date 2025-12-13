import { Flex } from '@/shared/ui/Flex';

import { Resource, resourcesMock, ResourceCard } from '@/entities/resource';

interface ResourcesListProps {
	resources?: Resource[];
}

export const ResourcesList = ({ resources = resourcesMock.data }: ResourcesListProps) => {
	return (
		<Flex direction="column" gap="20">
			{resources.map((resource) => (
				<ResourceCard key={resource.id} resource={resource} />
			))}
		</Flex>
	);
};
