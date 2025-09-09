import { Flex } from '@/shared/ui/Flex';

import { MyResource, myResourcesMock, MyResourceCard } from '@/entities/resource';

interface ResourcesListProps {
	resources?: MyResource[];
}

export const MyResourcesList = ({ resources }: ResourcesListProps) => {
	const res = resources?.length ? resources : myResourcesMock;
	return (
		<Flex direction="column" gap="20">
			{res.map((resource) => (
				<MyResourceCard key={resource.id} resource={resource} />
			))}
		</Flex>
	);
};
