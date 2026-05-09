import classNames from 'classnames';

import SlidersHorizontalIcon from '@/shared/assets/icons/slidersHorizontal.svg';
import { ROUTES } from '@/shared/config';
import { useScreenSize, useModal } from '@/shared/libs';
import { Drawer } from '@/shared/ui/Drawer';
import { IconButton } from '@/shared/ui/IconButton';

import { Company } from '@/entities/company';
import { ProgrammingLanguage } from '@/entities/programmingLanguage';
import { TaskCategoryCode, TaskDifficulty } from '@/entities/task';

import { TaskAdditionalInfo } from '../TaskAdditionalInfo/TaskAdditionalInfo';

import styles from './TaskAdditionalInfoDrawer.module.css';

interface TaskAdditionalInfoDrawerProps {
	languages: ProgrammingLanguage[];
	difficulty: TaskDifficulty;
	category: TaskCategoryCode;
	companies: Company[];
}

export const TaskAdditionalInfoDrawer = ({
	languages,
	difficulty,
	category,
	companies,
}: TaskAdditionalInfoDrawerProps) => {
	const { isMobileS } = useScreenSize();
	const { isOpen, onToggle, onClose } = useModal();

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
				rootName={isMobileS ? 'body' : 'mainLayout'}
				className={classNames(styles.drawer, {
					[styles['drawer-mobile']]: isMobileS,
				})}
				hasCloseButton
			>
				<TaskAdditionalInfo
					difficulty={difficulty}
					languages={languages}
					category={category}
					companies={companies}
					route={ROUTES.admin.resources.page}
				/>
			</Drawer>
		</>
	);
};
