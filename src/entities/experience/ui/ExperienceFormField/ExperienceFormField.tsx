import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button, Checkbox, Input } from 'yeahub-ui-kit';

import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';

import styles from './ExperienceFormField.module.css';

export const ExperienceFormField = () => {
	const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(false);

	const { control, setValue } = useFormContext();

	useEffect(() => {
		if (isCurrentlyWorking) {
			setValue('experienceEndDate', null);
		}
	}, [isCurrentlyWorking, setValue]);

	const handleCheckbox = () => {
		setIsCurrentlyWorking((prev) => !prev);
	};

	return (
		<Flex gap="20" maxWidth className={styles['inputs-wrapper']}>
			<FormControl name="companyName" label="Место работы" control={control}>
				{(field) => (
					<Input {...field} className={styles.input} placeholder="Название компании или фриланс" />
				)}
			</FormControl>
			<FormControl name="position" label="Позиция" control={control}>
				{(field) => <Input {...field} className={styles.input} />}
			</FormControl>
			<FormControl name="employmentType" label="Занятость" control={control}>
				{(field) => <Input {...field} className={styles.input} />}
			</FormControl>
			<FormControl name="location" label="Локация" control={control}>
				{(field) => <Input {...field} className={styles.input} />}
			</FormControl>
			<FormControl name="experienceStartDate" label="Начало работы" control={control}>
				{(field) => <Input type="date" {...field} className={styles.input} />}
			</FormControl>
			<FormControl name="experienceEndDate" label="Окончание работы" control={control}>
				{(field, error) => (
					<div>
						<Input type="date" {...field} className={styles.input} disabled={isCurrentlyWorking} />
						<div className={styles.error}>{isCurrentlyWorking ? '' : error}</div>
					</div>
				)}
			</FormControl>
			<Flex justify="between" align="center" maxWidth className={styles['container-btn']}>
				<Checkbox
					className={styles.checkbox}
					onToggle={handleCheckbox}
					checked={isCurrentlyWorking}
					label="По настоящее время"
				/>
				<Button size="large" theme="tertiary" textClassName={styles['btn-text']}>
					Удалить место работы
				</Button>
			</Flex>
		</Flex>
	);
};
