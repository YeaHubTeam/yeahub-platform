import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, Collections, ROUTES } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';

import { CollectionNavigationButtons } from '@/features/collections/navigateCollection';
import { TrainCollectionButton } from '@/features/collections/trainCollection';

import styles from './CollectionActions.module.css';

interface CollectionActionsProps {
	collectionId: string;
	profileId: string;
	isFree?: boolean;
	hasPremiumAccess: boolean;
	isEmptyData: boolean;
	onMovePrev: () => void;
	onMoveNext: () => void;
	isDisabled: boolean;
}

export const CollectionActions = ({
	collectionId,
	profileId,
	isFree,
	hasPremiumAccess,
	isEmptyData,
	onMovePrev,
	onMoveNext,
	isDisabled,
}: CollectionActionsProps) => {
	const navigate = useNavigate();
	const { t } = useTranslation(i18Namespace.collection);
	const { isMobile } = useScreenSize();

	const buttonVariant = isMobile ? 'link-gray' : 'tertiary';
	const canTrain = (isFree || hasPremiumAccess) && !isEmptyData;

	return (
		<Card withOutsideShadow className={styles.card}>
			<Flex direction="column" gap="12" justify="center" align="center">
				<Flex direction="row" gap="12" wrap="wrap" justify="center">
					{canTrain && (
						<TrainCollectionButton
							collectionId={collectionId}
							profileId={profileId}
							variant={buttonVariant}
						/>
					)}
					<Button
						className={styles.Button}
						variant={buttonVariant}
						preffix={<Icon icon="watch" size={24} />}
						onClick={(): void => {
							navigate(ROUTES.avos.page);
						}}
					>
						{t(Collections.BANNER_INTERVIEW_WATCH_BUTTON)}
					</Button>
				</Flex>
				<CollectionNavigationButtons
					onMovePrev={onMovePrev}
					onMoveNext={onMoveNext}
					isDisabled={isDisabled}
				/>
			</Flex>
		</Card>
	);
};
