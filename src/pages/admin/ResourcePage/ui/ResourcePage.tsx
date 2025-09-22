import { useParams } from 'react-router-dom';

import { ROUTES } from '@/shared/config/router/routes';
import { useScreenSize } from '@/shared/hooks';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { useGetResourceByIdQuery } from '@/entities/resource';

import { ResourceAdditionalInfo } from '@/widgets/resources/ResourceAdditionalInfo';
import { ResourceBody } from '@/widgets/resources/ResourceBody';
import { ResourceHeader } from '@/widgets/resources/ResourceHeader';

import styles from './ResourcePage.module.css';
import { ResourcePageSkeleton } from './ResourcePage.skeleton';

export const ResourcePage = () => {
	const { isMobile, isTablet } = useScreenSize();
	const { resourceId } = useParams<{ resourceId: string }>();
	const { data: resource, isFetching, isLoading } = useGetResourceByIdQuery({ resourceId });

	if (isLoading || isFetching) {
		return <ResourcePageSkeleton />;
	}

	if (!resource) {
		return null;
	}

	const { createdBy, keywords, skills, specializations } = resource;

	return (
		<>
			<BackHeader />
			<Flex gap="20">
				<Card withOutsideShadow className={styles.main}>
					<Flex maxWidth direction="column" gap="20">
						<ResourceHeader resource={resource} />
						<ResourceBody resource={resource} />
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
		</>
	);
};
