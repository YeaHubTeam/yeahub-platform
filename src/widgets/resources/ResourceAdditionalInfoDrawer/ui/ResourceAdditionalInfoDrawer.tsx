import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import SlidersHorizontalIcon from '@/shared/assets/icons/slidersHorizontal.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Resources } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useScreenSize, useCurrentProject, useModal } from '@/shared/hooks';
import { Author } from '@/shared/ui/AuthorInfo';
import { Drawer } from '@/shared/ui/Drawer';
import { IconButton } from '@/shared/ui/IconButton';

import { Skill } from '@/entities/skill';
import { Specialization } from '@/entities/specialization';

import { ResourceAdditionalInfo } from '@/widgets/resources/ResourceAdditionalInfo';

import styles from './ResourceAdditionalInfoDrawer.module.css';

interface ResourceAdditionalInfoDrawerProps {
	createdBy?: Author;
	keywords: string[];
	skills: Skill[];
	specializations: Specialization[];
}

export const ResourceAdditionalInfoDrawer = ({
	createdBy,
	keywords,
	skills,
	specializations,
}: ResourceAdditionalInfoDrawerProps) => {
	const { t } = useTranslation(i18Namespace.resources);
	const { isMobileS } = useScreenSize();
	const { isOpen, onToggle, onClose } = useModal();
	const project = useCurrentProject();

	return (
		<>
			<IconButton
				className={styles['icon-button']}
				aria-label={t(Resources.ADDITIONAL_INFO_ARIA_LABEL)}
				form="square"
				icon={<SlidersHorizontalIcon />}
				size="medium"
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
				<ResourceAdditionalInfo
					createdBy={createdBy}
					keywords={keywords || []}
					resourceSkills={skills}
					specializations={specializations}
					route={ROUTES.admin.resources.page}
				/>
			</Drawer>
		</>
	);
};
