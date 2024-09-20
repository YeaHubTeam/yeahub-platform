import { useFormContext } from 'react-hook-form';
import { Input } from 'yeahub-ui-kit';

import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
import { ImageLoader } from '@/shared/ui/ImageLoader';

import styles from './ProjectFormField.module.css';

export const ProjectFormField = () => {
	const { control } = useFormContext();

	return (
		<div>
			<ImageLoader />
			<Flex gap="20" maxWidth className={styles['inputs-wrapper']}>
				<FormControl name="projectName" label="Название проекта" control={control}>
					{(field) => <Input {...field} className={styles.input} />}
				</FormControl>
				<FormControl name="projectLink" label="Ссылка на проект" control={control}>
					{(field) => <Input {...field} className={styles.input} />}
				</FormControl>
				<FormControl name="projectDescription" label="Описание проекта" control={control}>
					{(field) => (
						<textarea
							{...field}
							className={styles.textarea}
							placeholder="Расскажи чуть подробнее о проекте"
						/>
					)}
				</FormControl>
			</Flex>
		</div>
	);
};
