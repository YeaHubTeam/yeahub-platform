import { useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { Resource } from '@/entities/resource';

import { ResourceAdditionalInfoDrawer } from '../ResourceAdditionalInfoDrawer';

interface ResourceHeaderProps {
	resource: Resource;
}

export const ResourceHeader = ({ resource }: ResourceHeaderProps) => {
	const { isMobile, isTablet } = useScreenSize();

	return (
		<Flex gap="20" direction={isMobile ? 'column' : 'row'} justify="between">
			<Flex direction="column" gap="10">
				<Text variant="body3-strong">{resource.name}</Text>
				<Text variant="body2-strong">{resource.description}</Text>
			</Flex>
			{(isMobile || isTablet) && <ResourceAdditionalInfoDrawer resource={resource} />}
		</Flex>
	);
};
