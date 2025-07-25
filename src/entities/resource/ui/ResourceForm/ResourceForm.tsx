import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Marketplace } from '@/shared/config/i18n/i18nTranslations';
import { removeBase64Data } from '@/shared/helpers/removeBase64Data';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
import { ImageLoaderWithoutCropper } from '@/shared/ui/ImageLoaderWithoutCropper';
import { KeywordInput } from '@/shared/ui/KeywordInput/KeywordInput';
import { Text } from '@/shared/ui/Text';
import { TextArea } from '@/shared/ui/TextArea';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { SkillSelect } from '@/entities/skill';
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { SpecializationSelect } from '@/entities/specialization';

import FormSelect from '../FormSelect/FormSelect';
import { ResourcesSelect } from '../ResourceSelect/ResourceSelect';

import styles from './ResourceForm.module.css';

export const ResourceForm = () => {
	const { t } = useTranslation(i18Namespace.marketplace);
	const { control, watch, setValue } = useFormContext();

	const selectedSpecializations = watch('specializations');

	const [previewImg, setPreviewImg] = useState<string | null>(null);

	const changeImage = (imageBase64: string) => {
		const image = removeBase64Data(imageBase64);

		setPreviewImg(imageBase64);
		setValue('skillImage', image);
	};

	const removeImage = () => {
		setPreviewImg(null);
		setValue('imageSrc', null);
	};

	return (
		<Flex direction="column" gap="60" className={styles.wrapper}>
			<Flex direction="column" gap="8" className={styles['form-field']}>
				<Text variant="body4" color="black-800">
					{t(Marketplace.NAME_SHORT)}
				</Text>
				<div className={styles.form}>
					<FormControl name="name" control={control} label={t(Marketplace.NAME_LABEL)}>
						{(field, hasError) => (
							<TextArea
								{...field}
								state={hasError ? 'error' : 'default'}
								className={styles.name}
								placeholder={t(Marketplace.NAME_LABEL)}
							/>
						)}
					</FormControl>
				</div>
			</Flex>
			<Flex direction="column" gap="8" className={styles['form-field']}>
				<Text variant="body4" color="black-800">
					{t(Marketplace.DESCRIPTION_SHORT)}
				</Text>
				<div className={styles.form}>
					<FormControl
						name="description"
						control={control}
						label={t(Marketplace.DESCRIPTION_LABEL)}
					>
						{(field, hasError) => (
							<TextArea
								{...field}
								state={hasError ? 'error' : 'default'}
								className={styles.name}
								placeholder={t(Marketplace.DESCRIPTION_LABEL)}
							/>
						)}
					</FormControl>
				</div>
			</Flex>
			<FormSelect short={t(Marketplace.ICON_SHORT)} label={t(Marketplace.ICON_LABEL)}>
				<ImageLoaderWithoutCropper
					removeImage={removeImage}
					changeImage={changeImage}
					initialSrc={previewImg}
				/>
			</FormSelect>
			<FormSelect
				short={t(Marketplace.SPECIALIZATIONS_SHORT)}
				label={t(Marketplace.SPECIALIZATIONS_LABEL)}
			>
				<FormControl name="specializations" control={control}>
					{({ onChange, value }) => (
						<div>
							<SpecializationSelect onChange={onChange} value={value} hasMultiple />
						</div>
					)}
				</FormControl>
			</FormSelect>
			<FormSelect short={t(Marketplace.SKILLS_SHORT)} label={t(Marketplace.SKILLS_LABEL)}>
				<FormControl name="skills" control={control}>
					{({ onChange, value }) => {
						return (
							<div>
								<SkillSelect
									onChange={onChange}
									value={value}
									selectedSPecializations={selectedSpecializations}
								/>
							</div>
						);
					}}
				</FormControl>
			</FormSelect>
			<FormSelect short={t(Marketplace.TYPES_SHORT)} label={t(Marketplace.TYPES_LABEL)}>
				<FormControl name="provider" control={control}>
					{({ onChange, value }) => (
						<div>
							<ResourcesSelect onChange={onChange} value={value} />
						</div>
					)}
				</FormControl>
			</FormSelect>
			<FormSelect short={t(Marketplace.KEYWORDS_SHORT)} label={t(Marketplace.KEYWORDS_LABEL)}>
				<FormControl name="keywords" control={control}>
					{({ onChange, value }) => {
						return (
							<div className={styles.keywords}>
								<KeywordInput value={value} onChange={onChange} />
							</div>
						);
					}}
				</FormControl>
			</FormSelect>
		</Flex>
	);
};
