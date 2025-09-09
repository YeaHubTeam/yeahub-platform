import { Flex } from '@/shared/ui/Flex';

import { MyResource, myResourcesMock, MyResourceCard } from '@/entities/resource';

interface ResourcesListProps {
	resources?: MyResource[];
}

export const MyResourcesList = ({ resources = myResourcesMock }: ResourcesListProps) => {
	return (
		<Flex direction="column" gap="20">
			{resources.map((resource) => (
				<MyResourceCard key={resource.id} resource={resource} />
			))}
		</Flex>
	);
};
