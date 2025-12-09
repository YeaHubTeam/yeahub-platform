import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { ROUTES } from '@/shared/config';
import { useAppSelector, useScreenSize } from '@/shared/libs';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { getIsAuthor, getUserId } from '@/entities/profile';
import {
	isResourceDisabled,
	useGetResourceByIdQuery,
	ResourceAdditionalInfo,
} from '@/entities/resource';

import { DeleteResourceButton } from '@/features/resources/deleteResource';
import { ResourceEditButton } from '@/features/resources/editResource';

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

	const isDisabled = isResourceDisabled({ isAuthor, userId, createdById: createdBy.id });

	return (
		<>
			<BackHeader>
				<DeleteResourceButton resourceId={id} isDetailPage disabled={isDisabled} />
				<ResourceEditButton resourceId={id} isDisabled={isDisabled} />
			</BackHeader>
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
		</>
	);
};
