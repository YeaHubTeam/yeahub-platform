// import { Flex } from '@/shared/ui/Flex';
// import { Skeleton } from '@/shared/ui/Skeleton';

// import { getFromLS, LS_ACCESS_TOKEN_KEY } from '@/shared/libs';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Questions } from '@/shared/config';
import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { WarningPopoverSkeleton } from '@/shared/ui/WarningPopover';

// import { Collection } from '@/entities/collection';
import { PreviewQuestionsItemSkeleton } from '@/entities/question';

import styles from './CollectionBody.module.css';

const GUEST_QUESTIONS_COUNT = 5;

export const CollectionBodySkeleton = () => {
	const { t } = useTranslation([i18Namespace.questions, i18Namespace.collection]);
	const items = Array.from({ length: GUEST_QUESTIONS_COUNT });

	return (
		<CardSkeleton
			className={styles.wrapper}
			withOutsideShadow
			title={t(Questions.PREVIEW_TITLE)}
			headerAction={<WarningPopoverSkeleton />}
		>
			<Flex componentType="ul" direction="column" gap="12">
				{items.map((_, index) => (
					<PreviewQuestionsItemSkeleton key={index} />
				))}
			</Flex>
		</CardSkeleton>
	);
};
