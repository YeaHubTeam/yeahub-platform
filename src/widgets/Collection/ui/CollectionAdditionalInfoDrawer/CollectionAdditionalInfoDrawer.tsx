import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import PopoverIcon from '@/shared/assets/icons/DiplomaVerified.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Collections } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize, useCurrentProject, useModal } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Drawer } from '@/shared/ui/Drawer';
import { IconButton } from '@/shared/ui/IconButton';

import { Collection } from '@/entities/collection';
import { getChannelsForSpecialization } from '@/entities/media';

import { AdditionalInfo } from '../AdditionalInfo/AdditionalInfo';

import styles from './CollectionAdditionalInfoDrawer.module.css';

interface CollectionAdditionalInfoDrawerProps {
	collection: Collection;
}

export const CollectionAdditionalInfoDrawer = ({
	collection,
}: CollectionAdditionalInfoDrawerProps) => {
	const { isMobileS } = useScreenSize();
	const { isOpen, onToggle, onClose } = useModal();
	const project = useCurrentProject();
	const { createdBy, questionsCount, isFree, company, specializations, keywords } = collection;

	const media = getChannelsForSpecialization(collection.specializations);

	const { t } = useTranslation(i18Namespace.collection);
	return (
		<div className={styles['popover-additional']}>
			<IconButton
				className={classNames({ active: isOpen })}
				aria-label={t(Collections.ADDITIONAL_INFO_ARIA_LABEL)}
				form="square"
				icon={<PopoverIcon />}
				size="small"
				variant="tertiary"
				onClick={onToggle}
			/>
			<Drawer
				isOpen={isOpen}
				onClose={onClose}
				rootName={isMobileS || project === 'landing' ? 'body' : 'mainLayout'}
				className={classNames(styles.drawer, {
					[styles['drawer-mobile']]: isMobileS,
				})}
				hasCloseButton
			>
				<Card className={styles.main}>
					<AdditionalInfo
						className={styles['additional-info-wrapper']}
						createdBy={createdBy}
						questionsCount={questionsCount}
						isFree={isFree}
						company={company}
						specializations={specializations}
						keywords={keywords}
						media={media}
					/>
				</Card>
			</Drawer>
		</div>
	);
};
