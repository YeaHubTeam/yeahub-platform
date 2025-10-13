import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { ROUTES } from '@/shared/config/router/routes';
import { useAppSelector, useScreenSize } from '@/shared/hooks';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { getIsAuthor, getUserId } from '@/entities/profile';
import { isResourceDisabled, useGetResourceByIdQuery } from '@/entities/resource';

import { DeleteResourceButton } from '@/features/resources/deleteResource';
import { ResourceEditButton } from '@/features/resources/editResource';

import { ResourceAdditionalInfo } from '@/widgets/resources/ResourceAdditionalInfo';
import { ResourceBody } from '@/widgets/resources/ResourceBody';
import { ResourceHeader } from '@/widgets/resources/ResourceHeader';

import styles from './ResourcePage.module.css';
import { ResourcePageSkeleton } from './ResourcePage.skeleton';

export const ResourcePage = () => {
	const { isMobile, isTablet } = useScreenSize();
	const { resourceId } = useParams<{ resourceId: string }>();
	const { data: resource, isFetching, isLoading } = useGetResourceByIdQuery({ resourceId });

	const isAuthor = useSelector(getIsAuthor);
	const userId = useAppSelector(getUserId);

	if (isLoading || isFetching) {
		return <ResourcePageSkeleton />;
	}

	if (!resource) {
		return null;
	}

	const { id, createdBy, createdById, keywords, skills, specializations } = resource;

	const isDisabled = isResourceDisabled({ isAuthor, userId, createdById });

	return (
		<>
			<BackHeader>
				<DeleteResourceButton resourceId={id} isDetailPage disabled={isDisabled} />
				<ResourceEditButton resourceId={id} isDisabled={isDisabled} />
			</BackHeader>
			<Flex gap="20" align="start">
				<Card withOutsideShadow className={styles.main}>
					<Flex direction="column" gap="20">
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
