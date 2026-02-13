import classNames from 'classnames';

import SlidersHorizontalIcon from '@/shared/assets/icons/slidersHorizontal.svg';
import { ROUTES } from '@/shared/config';
import { useCurrentProject, useScreenSize, useModal } from '@/shared/libs';
import { Drawer } from '@/shared/ui/Drawer';
import { IconButton } from '@/shared/ui/IconButton';

import { ProgrammingLanguage } from '@/entities/programmingLanguage';
import { TaskCategoryCode, TaskDifficulty } from '@/entities/task';

import { TaskAdditionalInfo } from '../TaskAdditionalInfo/TaskAdditionalInfo';

import styles from './TaskAdditionalInfoDrawer.module.css';

interface TaskAdditionalInfoDrawerProps {
	languages: ProgrammingLanguage[];
	difficulty: TaskDifficulty;
	category: TaskCategoryCode;
}

export const TaskAdditionalInfoDrawer = ({
	languages,
	difficulty,
	category,
}: TaskAdditionalInfoDrawerProps) => {
	const { isMobileS } = useScreenSize();
	const { isOpen, onToggle, onClose } = useModal();
	const project = useCurrentProject();

	return (
		<>
			<IconButton
				className={styles['icon-button']}
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
				<TaskAdditionalInfo
					difficulty={difficulty}
					languages={languages}
					category={category}
					route={ROUTES.admin.resources.page}
				/>
			</Drawer>
		</>
	);
};
