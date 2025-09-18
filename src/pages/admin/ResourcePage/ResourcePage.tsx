import { useParams } from 'react-router-dom';

import { ROUTES } from '@/shared/config/router/routes';
import { useScreenSize } from '@/shared/hooks';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { useGetResourceByIdQuery } from '@/entities/resource';
import { ResourceCard } from '@/entities/resource';

import { ResourceAdditionalInfo } from '@/widgets/resources/ResourceAdditionalInfo';
import { ResourceHeader } from '@/widgets/resources/ResourceHeader/ResourceHeader';

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
					<ResourceHeader resource={resource} />
					<ResourceCard resource={resource} />
				</Card>

				{!isMobile && !isTablet && (
					<Flex direction="column" gap="20" className={styles.additional}>
						<ResourceAdditionalInfo
							createdBy={createdBy}
							keywords={keywords || []}
							resourceSkills={skills}
							specializations={specializations}
							route={ROUTES.admin.resources.page}
						/>
					</Flex>
				)}
			</Flex>
		</>
	);
};
