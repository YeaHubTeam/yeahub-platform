import { Chip } from '@/shared/ui/Chip';
import { Flex } from '@/shared/ui/Flex';

import { Resource } from '../../model/types/resource';

interface ResourceListProps {
	resources: Resource[];
	onClick?: (resourceId: number) => void;
}

export const ResourceList = ({ resources, onClick }: ResourceListProps) => {
	return (
		<Flex componentType="ul" gap="10" wrap="wrap">
			{resources.map((resource) => {
				return (
					<li key={resource.id}>
						<Chip
							onClick={() => onClick?.(Number(resource.id))} //TODO
							label={resource.name}
							theme="primary"
							active
						/>
					</li>
				);
			})}
		</Flex>
	);
};
