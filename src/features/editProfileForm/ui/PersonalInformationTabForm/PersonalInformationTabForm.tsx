import { useFormContext } from 'react-hook-form';
import { Input } from 'yeahub-ui-kit';

import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
import { ImageLoader } from '@/shared/ui/ImageLoader';
import { InputPhone } from '@/shared/ui/InputPhone';

import { SocialNetWorkInputs } from '@/entities/socialNetwork';
import { SpecializationSelect } from '@/entities/specialization';

import styles from './PersonalInformationTabForm.module.css';

export const PersonalInformationTabForm = () => {
	const { control } = useFormContext();

	return (
		<Flex direction="column" gap="120">
			<Flex gap="120">
				<div className={styles.description}>
					<h3>Фото профиля</h3>
					<p>Ваше фото будет видно всем членам сообщества Yeahub</p>
				</div>
				<ImageLoader />
			</Flex>
			<Flex gap="120">
				<div className={styles.description}>
					<h3>Персональная информация</h3>
					<p>Сюда мы тоже что-нибудь классное придумаем</p>
				</div>
				<Flex gap="20" className={styles['inputs-wrapper']}>
					<Flex maxWidth gap="20">
						<FormControl name="firstName" control={control} label="Имя" className={styles.form}>
							{(field) => <Input {...field} className={styles.input} />}
						</FormControl>
						<FormControl name="lastName" control={control} label="Фамилия" className={styles.form}>
							{(field) => <Input {...field} className={styles.input} />}
						</FormControl>
					</Flex>

					<FormControl
						name="specialization"
						control={control}
						label="IT Специальность"
						className={styles.form}
					>
						{({ onChange, value }) => <SpecializationSelect onChange={onChange} value={value} />}
					</FormControl>
					<Flex maxWidth gap="20">
						<FormControl
							name="phone"
							control={control}
							label="Номер для связи"
							className={styles.form}
						>
							{(field) => <InputPhone fields={field} className={'edit'} />}
						</FormControl>
						<FormControl
							name="email"
							control={control}
							label="Email для связи"
							className={styles.form}
						>
							{(field) => <Input {...field} className={styles.input} />}
						</FormControl>
					</Flex>

					<FormControl name="location" control={control} label="Локация" className={styles.form}>
						{(field) => (
							<Input
								{...field}
								className={styles.input}
								placeholder="Напр. Санкт-Петербург, Россия"
							/>
						)}
					</FormControl>
					<FormControl name="skillLevel" control={control} label="Уровень специалиста">
						{(field) => <Input {...field} className={styles.input} placeholder="Junior" />}
					</FormControl>
				</Flex>
			</Flex>
			<Flex gap="120">
				<div className={styles.description}>
					<h3>Личные ссылки</h3>
					<p>Поделитесь своими профилями в других соц. сетях</p>
				</div>
				<Flex gap="20" maxWidth className={styles['inputs-wrapper']}>
					<SocialNetWorkInputs />
				</Flex>
			</Flex>
		</Flex>
	);
};
