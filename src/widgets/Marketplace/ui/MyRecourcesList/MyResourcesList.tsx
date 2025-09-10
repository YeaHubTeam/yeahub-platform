import { Flex } from '@/shared/ui/Flex';

import { ResourceRequest, MyResourceCard } from '@/entities/resource';

interface ResourcesListProps {
	resources?: ResourceRequest[];
}

export const MyResourcesList = ({ resources }: ResourcesListProps) => {
	return (
		<Flex direction="column" gap="20">
			{resources.map((resource) => (
				<MyResourceCard key={resource.id} resource={resource} />
			))}
		</Flex>
	);
};
