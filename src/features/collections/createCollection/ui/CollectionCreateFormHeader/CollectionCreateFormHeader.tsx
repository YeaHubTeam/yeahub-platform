import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { CollectionCreateFormHeaderProps, FormData } from '../../model/types/collectionFormHeader';

const CollectionCreateFormHeader: React.FC<CollectionCreateFormHeaderProps> = () => {
	const { t } = useTranslation(['collections', 'translation']);
	const { handleSubmit, reset } = useFormContext<FormData>();
	const onSave = async (data: FormData) => {
		console.log('Data to save:', data);
		reset({
			title: '',
			description: '',
			collectionImage: '',
		});
	};

	return (
		<Flex align="center" gap="8" justify={'between'}>
			<BackButton />
			<Button onClick={handleSubmit(onSave)}>{t(Translation.SAVE, { ns: 'translation' })}</Button>
		</Flex>
	);
};

export default CollectionCreateFormHeader;
