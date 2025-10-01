import { useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { Resource } from '@/entities/resource';

import { ResourceAdditionalInfoDrawer } from '../../ResourceAdditionalInfoDrawer';

import styles from './ResourceHeader.module.css';

interface ResourceHeaderProps {
	resource: Resource;
}

export const ResourceHeader = ({ resource }: ResourceHeaderProps) => {
	const { isMobile, isTablet } = useScreenSize();

	return (
		<Flex direction="column" gap="8" className={styles.header}>
			<Flex gap="10" wrap="nowrap" justify="between">
				<Text variant="body6" isMainTitle>
					{resource.name}
				</Text>
				{(isMobile || isTablet) && <ResourceAdditionalInfoDrawer resource={resource} />}
			</Flex>
			<Text variant="body3">{resource.description}</Text>
		</Flex>
	);
};
