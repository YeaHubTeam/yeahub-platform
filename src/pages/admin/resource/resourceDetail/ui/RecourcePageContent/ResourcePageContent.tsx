import { Flex } from '@/shared/ui/Flex';
import { Card } from '@/shared/ui/Card';
import { ResourceHeader } from '@/widgets/resources/ResourceHeader';
import { ResourceBody } from '@/widgets/resources/ResourceBody';
import { ResourceAdditionalInfo } from '@/entities/resource';
import { type Resource } from '@/entities/resource';
import styles from './ResourcePageContent.module.css';
import { ROUTES } from '@/shared/config';

interface ResourcePageContentProps {
	resource: Resource;
	isDisabled: boolean;
	isMobile: boolean;
	isTablet: boolean;
}

export const ResourcePageContent = ({ resource, isMobile, isTablet }: ResourcePageContentProps) => {
	const {
		id,
		createdBy,
		keywords,
		skills,
		specializations,
		name,
		description,
		type,
		url,
		createdAt,
	} = resource;

	return (
		<Flex gap="20" align="start">
			<Card withOutsideShadow className={styles.main}>
				<Flex direction="column" gap="20">
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
