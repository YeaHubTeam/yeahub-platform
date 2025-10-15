import { useScreenSize } from '@/shared/hooks';
import { Author } from '@/shared/ui/AuthorInfo';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { Skill } from '@/entities/skill';
import { Specialization } from '@/entities/specialization';

import { ResourceAdditionalInfoDrawer } from '../../ResourceAdditionalInfoDrawer';

import styles from './ResourceHeader.module.css';

interface ResourceHeaderProps {
	name: string;
	description: string;
	createdBy?: Author;
	keywords: string[];
	skills: Skill[];
	specializations: Specialization[];
}

export const ResourceHeader = ({
	name,
	description,
	keywords,
	skills,
	specializations,
	createdBy,
}: ResourceHeaderProps) => {
	const { isMobile, isTablet } = useScreenSize();

	return (
		<Flex direction="column" gap="8" className={styles.header}>
			<Flex gap="10" wrap="nowrap" justify="between">
				<Text variant="body6" isMainTitle>
					{name}
				</Text>
				{(isMobile || isTablet) && (
					<ResourceAdditionalInfoDrawer
						createdBy={createdBy}
						keywords={keywords}
						skills={skills}
						specializations={specializations}
					/>
				)}
			</Flex>
			<Text variant="body3">{description}</Text>
		</Flex>
	);
};
