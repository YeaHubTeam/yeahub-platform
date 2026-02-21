import { ROUTES } from '@/shared/config';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { type Resource } from '@/entities/resource';
import { ResourceAdditionalInfo } from '@/entities/resource';

import { DeleteResourceButton } from '@/features/resources/deleteResource';
import { ResourceEditButton } from '@/features/resources/editResource';

import { ResourceBody } from '@/widgets/resources/ResourceBody';
import { ResourceHeader } from '@/widgets/resources/ResourceHeader';

import styles from './ResourcePageContent.module.css';

interface ResourcePageContentProps {
	resource: Resource;
	isDisabled: boolean;
	isMobile: boolean;
	isTablet: boolean;
}

export const ResourcePageContent = ({
	resource,
	isMobile,
	isTablet,
	isDisabled,
}: ResourcePageContentProps) => {
	const { createdBy, keywords, skills, specializations, name, description, type, url, createdAt } =
		resource;

	return (
		<Flex gap="20" align="start">
			<Card withOutsideShadow className={styles.main}>
				<Flex direction="column" gap="20">
					<BackHeader>
						<DeleteResourceButton resourceId={resource.id} isDetailPage disabled={isDisabled} />
						<ResourceEditButton resourceId={resource.id} isDisabled={isDisabled} />
					</BackHeader>
					<ResourceHeader
						name={name}
						description={description}
						keywords={keywords}
						skills={skills}
						specializations={specializations}
						createdBy={createdBy}
					/>
					<ResourceBody name={name} type={type.code} url={url} createdAt={createdAt} />
				</Flex>
			</Card>

			{!isMobile && !isTablet && (
				<ResourceAdditionalInfo
					createdBy={createdBy}
					keywords={keywords || []}
					resourceSkills={skills}
					specializations={specializations}
					route={ROUTES.admin.resources.page}
				/>
			)}
		</Flex>
	);
};
