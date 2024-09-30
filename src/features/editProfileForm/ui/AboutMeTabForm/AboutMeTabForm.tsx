import { useFormContext } from 'react-hook-form';
import { Button, TextArea } from 'yeahub-ui-kit';

import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';

import styles from './AboutMeTabForm.module.css';

export const AboutMeTabForm = () => {
	const { control } = useFormContext();

	return (
		<>
			<Flex gap="120">
				<div className={styles.description}>
					<h3>О себе любимом(-ой)</h3>
					<p>
						Расскажи о себе всему сообществу. Мы ценим человека не за его профессиональные качества,
						поэтому пиши всё чем хочешь поделиться
					</p>
				</div>
				<div className={styles['textarea-container']}>
					<FormControl name="aboutMe" control={control}>
						{(field) => (
							<TextArea placeholder="Placeholder" {...field} className={styles.textarea} />
						)}
					</FormControl>
				</div>
			</Flex>
			<Flex direction="column" align="end" className={styles['btn-container']}>
				<Button type="submit">Сохранить</Button>
			</Flex>
		</>
	);
};