import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { CollectionCreateFormValues } from '../../model/types/collectionCreateTypes';
export interface CollectionCreateFormHeaderProps {
	children?: React.ReactNode;
}

const CollectionCreateFormHeader: React.FC<CollectionCreateFormHeaderProps> = () => {
	const { t } = useTranslation([i18Namespace.collection, i18Namespace.translation]);
	const { handleSubmit, reset } = useFormContext<CollectionCreateFormValues>();
	const onSave = async (data: CollectionCreateFormValues) => {
		console.log('Data to save:', data);
		reset({});
	};

	return (
		<Flex align="center" gap="8" justify={'between'}>
			<BackButton />
			<Button onClick={handleSubmit(onSave)}>
				{t(Translation.SAVE, { ns: i18Namespace.translation })}
			</Button>
		</Flex>
	);
};

export default CollectionCreateFormHeader;
