import { Button } from 'yeahub-ui-kit';

import cls from './AddAndSave.module.css';

interface AddAndSaveProps {
	textFirst: string;
	textSecond?: string;
}

export const AddAndSave = ({ textFirst, textSecond = 'Сохранить' }: AddAndSaveProps) => {
	return (
		<div className={cls['add-container']}>
			<Button className={cls['btn-add']} theme="tertiary" textClassName={cls['btn-add']}>
				{textFirst}
			</Button>
			<Button theme="primary" type="submit">
				{textSecond}
			</Button>
		</div>
	);
};
