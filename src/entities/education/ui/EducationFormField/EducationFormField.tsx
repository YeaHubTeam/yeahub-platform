import { useFormContext } from 'react-hook-form';
import { Button, Input } from 'yeahub-ui-kit';

import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
import { ImageLoader } from '@/shared/ui/ImageLoader';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { useProfileQuery } from '@/entities/auth';

import styles from './EducationFormField.module.css';

export const EducationFormField = () => {
	const { control } = useFormContext();
	const { data: profile, isSuccess: isSuccessGetProfile } = useProfileQuery();

	return (
		<div className={styles['right-wrapper']}>
			<ImageLoader initialSrc={isSuccessGetProfile ? profile.avatarUrl : null} />
			<Flex gap="20" maxWidth className={styles['inputs-wrapper']}>
				<FormControl name="educationalInstitution" label="Учебное заведение" control={control}>
					{(field) => <Input {...field} className={styles.input} />}
				</FormControl>
				<FormControl name="level" label="Уровень" control={control}>
					{(field) => <Input {...field} className={styles.input} />}
				</FormControl>
				<FormControl name="specialty" label="Специальность" control={control}>
					{(field) => <Input {...field} className={styles.input} />}
				</FormControl>
				<FormControl name="educationStartDate" label="Начало обучения" control={control}>
					{(field) => <Input {...field} className={styles.input} />}
				</FormControl>
				<FormControl name="educationEndDate" label="Конец обучения" control={control}>
					{(field) => (
						<div>
							<Input {...field} className={styles.input} />
							<span>Если учитесь в настоящее время — укажите год предполагаемого окончания</span>
						</div>
					)}
				</FormControl>
				<Flex justify="end" align="center" maxWidth className={styles['container-btn']}>
					<Button size="large" theme="tertiary" textClassName={styles['btn-text']}>
						Удалить место учебы
					</Button>
				</Flex>
			</Flex>
		</div>
	);
};
