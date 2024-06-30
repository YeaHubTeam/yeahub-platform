import { Button } from 'yeahub-ui-kit';

import cls from './AddAndSave.module.css';

interface AddAndSaveProps {
	textFirst: string;
	textSecond?: string;
}

export const AddAndSave = (props: AddAndSaveProps) => {
	const { textFirst, textSecond = 'Сохранить' } = props;
	return (
		<div className={cls['add-container']}>
			<Button className={cls['btn-add']} theme="tertiary" textClassName={cls['btn-add']}>
				{textFirst}
			</Button>
			<Button theme="primary">{textSecond}</Button>
		</div>
	);
};
