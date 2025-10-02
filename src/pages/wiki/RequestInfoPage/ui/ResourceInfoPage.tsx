import { useParams } from 'react-router-dom';

// import { ROUTES } from '@/shared/config/router/routes';
// import { useScreenSize } from '@/shared/hooks';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
// import { StatusChip } from '@/shared/ui/StatusChip';

import { useGetResourseRequestByIdQuery } from '@/entities/resource';

// import { ResourceAdditionalInfo } from '@/widgets/resources/ResourceAdditionalInfo';
// import { ResourceBody } from '@/widgets/resources/ResourceBody';
// import { ResourceHeader } from '@/widgets/resources/ResourceHeader';

import styles from './ResourceInfoPage.module.css';

export const ResourceInfoPage = () => {
	// const { isMobile, isTablet } = useScreenSize();
	const { requestId } = useParams<{ requestId: string }>();
	const { data: request } = useGetResourseRequestByIdQuery({ requestId });

	if (!request) {
		return null;
	}

	const { status } = request;

	return (
		<>
			<BackHeader />
			<Flex gap="20" align="start">
				<Card withOutsideShadow className={styles.main}>
					<Flex direction="column" gap="20">
						{status}
						{/* <ResourceHeader resource={resource} />
						<ResourceBody resource={resource} /> */}
					</Flex>
				</Card>
				{/* <StatusChip/> */}
				{/* {!isMobile && !isTablet && (
					<ResourceAdditionalInfo
						keywords={requestPayload.keywords || []}
						resourceSkills={skills}
						specializations={specializations}
						route={ROUTES.admin.resources.page}
					/>
				)} */}
			</Flex>
		</>
	);
};
