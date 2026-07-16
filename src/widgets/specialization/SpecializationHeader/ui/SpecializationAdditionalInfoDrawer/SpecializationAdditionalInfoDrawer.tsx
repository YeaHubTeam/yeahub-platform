import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import PopoverIcon from '@/shared/assets/icons/diplomaVerified.svg';
import { i18Namespace, Questions } from '@/shared/config';
import { useScreenSize, useModal } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Drawer } from '@/shared/ui/Drawer';
import { IconButton } from '@/shared/ui/IconButton';

import { Specialization, SpecializationAdditionalInfo } from '@/entities/specialization';

import styles from './SpecializationAdditionalInfoDrawer.module.css';

interface SpecializationAdditionalInfoDrawerProps {
	specialization: Specialization;
}

export const SpecializationAdditionalInfoDrawer = ({
	specialization,
}: SpecializationAdditionalInfoDrawerProps) => {
	const { isMobileS } = useScreenSize();
	const { isOpen, onToggle, onClose } = useModal();

	const { t } = useTranslation(i18Namespace.questions);

	return (
		<div className={styles['popover-additional']}>
			<IconButton
				className={classNames({ active: isOpen })}
				aria-label={t(Questions.ADDITIONAL_INFO_ARIA_LABEL)}
				form="square"
				icon={<PopoverIcon />}
				size="small"
				variant="tertiary"
				onClick={onToggle}
			/>
			<Drawer
				isOpen={isOpen}
				onClose={onClose}
				rootName={isMobileS ? 'body' : 'mainLayout'}
				className={classNames(styles.drawer, {
					[styles['drawer-mobile']]: isMobileS,
				})}
				hasCloseButton
			>
				<Card className={styles.main}>
					<SpecializationAdditionalInfo
						className={styles['additional-info-wrapper']}
						specialization={specialization}
					/>
				</Card>
			</Drawer>
		</div>
	);
};
