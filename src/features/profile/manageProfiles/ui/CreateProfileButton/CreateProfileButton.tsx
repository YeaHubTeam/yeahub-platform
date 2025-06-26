import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';

import { getUserId } from '@/entities/profile';

import { useCreateProfileMutation } from '../../api/manageProfileApi';

interface CreateProfileButtonProps {
	disabled: boolean;
	className?: string;
}

export const CreateProfileButton = ({ disabled, className }: CreateProfileButtonProps) => {
	const { t } = useTranslation();

	const userId = useAppSelector(getUserId);

	const [createProfile] = useCreateProfileMutation();

	const handleCreateButtonClick = () => {
		if (userId) {
			createProfile({
				userId,
				profileType: 1,
				specializationId: 0,
				markingWeight: 1,
			});
		}
	};

	return (
		<Button
			onClick={handleCreateButtonClick}
			suffix={<Icon icon="plus" size={24} />}
			disabled={disabled}
			className={classnames(className)}
		>
			{t(Translation.CREATE)}
		</Button>
	);
};
