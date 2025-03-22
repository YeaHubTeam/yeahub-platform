import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
import { ImageLoader } from '@/shared/ui/ImageLoader';
import { Input } from '@/shared/ui/Input';
import { InputPhone } from '@/shared/ui/InputPhone';

import { useProfileQuery } from '@/entities/auth';
import { getIsEmptySpecialization } from '@/entities/profile';
import { SocialNetWorkInputs } from '@/entities/socialNetwork';
import { SpecializationSelect } from '@/entities/specialization';

import { useUpdateAvatarMutation } from '@/features/profile/editProfileForm/api/editProfileApi';

import styles from './PersonalInformationTabForm.module.css';

export const PersonalInformationTabForm = () => {
	const { control, setValue } = useFormContext();
	const { t } = useTranslation(i18Namespace.profile);
	const { data: profile, isSuccess: isSuccessGetProfile } = useProfileQuery();
	const [updateAvatar, { isLoading: isAvatarLoading }] = useUpdateAvatarMutation();
	const isSpecializationEmpty = useAppSelector(getIsEmptySpecialization);

	const onImageChange = (image: string | null) => {
		setValue('image', image);
		if (profile) {
			updateAvatar({ id: profile.id, image, oldImage: profile.avatarUrl });
		}
	};

	return (
		<Flex direction="column" gap="120" className={styles.wrapper}>
			<Flex gap="16" className={styles.column}>
				<div className={styles.description}>
					<h3>{t(Profile.PHOTO_TITLE)}</h3>
					<p>{t(Profile.PHOTO_DESCRIPTION)}</p>
				</div>

				<ImageLoader
					cropper={{
						aspectRatio: 1,
						title: t(Profile.PHOTO_MODAL_TITLE),
						description: t(Profile.PHOTO_MODAL_DESCRIPTION),
					}}
					minResolution={{ width: 128, height: 128 }}
					maxResolution={{ width: 2048, height: 2048 }}
					maxMBSize={5}
					setValue={onImageChange}
					initialSrc={isSuccessGetProfile ? profile.avatarUrl : null}
					isLoading={isAvatarLoading}
				/>
			</Flex>
			<Flex gap="16" className={styles.column}>
				<div className={styles.description}>
					<h3>{t(Profile.PERSONAL_TITLE)}</h3>
					<p>{t(Profile.PERSONAL_DESCRIPTION)}</p>
				</div>
				<Flex gap="20" className={styles['inputs-wrapper']}>
					<Flex className={styles['form-control-wrapper']} maxWidth gap="20">
						<FormControl
							name="firstName"
							control={control}
							label={t(Profile.FORM_FIRSTNAME)}
							className={styles.form}
						>
							{(field) => <Input {...field} className={styles.input} size="S" />}
						</FormControl>
						<FormControl
							name="lastName"
							control={control}
							label={t(Profile.FORM_LASTNAME)}
							className={styles.form}
						>
							{(field) => <Input {...field} className={styles.input} size="S" />}
						</FormControl>
					</Flex>
					<FormControl
						name="specialization"
						control={control}
						label={t(Profile.FORM_SPECIALIZATION)}
						className={styles.form}
					>
						{({ onChange, value }) => (
							<SpecializationSelect
								onChange={onChange}
								value={[value]}
								disabled={!isSpecializationEmpty}
							/>
						)}
					</FormControl>
					<Flex className={styles['form-control-wrapper']} maxWidth gap="20">
						<FormControl
							name="phone"
							control={control}
							label={t(Profile.FORM_PHONE)}
							className={styles.form}
						>
							{(field) => <InputPhone fields={field} className={'edit'} />}
						</FormControl>
						<FormControl
							name="email"
							control={control}
							label={t(Profile.FORM_EMAIL)}
							className={styles.form}
						>
							{(field) => <Input {...field} className={styles.input} disabled />}
						</FormControl>
					</Flex>
					<FormControl
						name="location"
						control={control}
						label={t(Profile.FORM_LOCATION)}
						className={styles.form}
					>
						{(field) => <Input {...field} className={styles.input} />}
					</FormControl>
				</Flex>
			</Flex>
			<Flex gap="16" className={styles.column}>
				<div className={styles.description}>
					<h3>{t(Profile.LINKS_TITLE)}</h3>
					<p>{t(Profile.LINKS_DESCRIPTION)}</p>
				</div>
				<Flex gap="20" maxWidth className={styles['inputs-wrapper']}>
					<SocialNetWorkInputs />
				</Flex>
			</Flex>
		</Flex>
	);
};
