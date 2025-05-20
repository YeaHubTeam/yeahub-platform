import classNames from 'classnames';

import PopoverIcon from '@/shared/assets/icons/DiplomaVerified.svg';
import { useScreenSize, useCurrentProject, useModal } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Drawer } from '@/shared/ui/Drawer';
import { IconButton } from '@/shared/ui/IconButton';

import { Collection } from '@/entities/collection';

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
	return (
		<div className={styles['popover-additional']}>
			<IconButton
				className={classNames({ active: isOpen })}
				aria-label="go to additional info"
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
					/>
				</Card>
			</Drawer>
		</div>
	);
};
