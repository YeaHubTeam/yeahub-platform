import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import PopoverIcon from '@/shared/assets/icons/diplomaVerified.svg';
// import { i18Namespace, Questions, ROUTES } from '@/shared/config';
import { i18Namespace, Questions } from '@/shared/config';
import { useCurrentProject, useScreenSize, useModal } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Drawer } from '@/shared/ui/Drawer';
import { IconButton } from '@/shared/ui/IconButton';

import { Topic } from '@/entities/topic';

import styles from './TopicAdditionalInfoDrawer.module.css';

interface TopicAdditionalInfoDrawerProps {
	topic: Topic;
}

export const TopicAdditionalInfoDrawer = ({ topic }: TopicAdditionalInfoDrawerProps) => {
	const { isMobileS } = useScreenSize();
	const { isOpen, onToggle, onClose } = useModal();
	const project = useCurrentProject();
	// const { skill } = topic;
	const { createdAt } = topic;
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
				rootName={isMobileS || project === 'landing' ? 'body' : 'mainLayout'}
				className={classNames(styles.drawer, {
					[styles['drawer-mobile']]: isMobileS,
				})}
				hasCloseButton
			>
				<Card className={styles.main}>
					{createdAt}
					{/* {project === 'platform' && (
						<ProgressBlock
							className={styles['additional-info-wrapper']}
							checksCount={checksCount}
						/>
					)}
					<TopicAdditionalInfoDrawer
						className={styles['additional-info-wrapper']}
						rate={rate}
						keywords={keywords}
						complexity={complexity}
						questionSkills={questionSkills}
						createdBy={createdBy}
						route={ROUTES.wiki.questions.page}
					/> */}
				</Card>
			</Drawer>
		</div>
	);
};
