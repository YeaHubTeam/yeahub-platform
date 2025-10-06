import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { User } from '@/shared/config/i18n/i18nTranslations';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

import { useGetUsersListQuery } from '../../api/userApi';
import { User as UserData } from '../../model/types/user';

interface ChooseAuthorProps {
	selectedAuthorId?: string | undefined;
	onChangeAuthor: (author: string | undefined) => void;
}

export const ChooseAuthor = ({ onChangeAuthor, selectedAuthorId }: ChooseAuthorProps) => {
	const { t } = useTranslation(i18Namespace.user);
	const { data } = useGetUsersListQuery({ page: 1, limit: 10 });

	if (!data) return null;

	const onClick = (id: string) => {
		const authorId = id;
		onChangeAuthor(authorId);
	};
	const preparedData = data.data.map((user: UserData) => ({
		id: user.id,
		title: user.username,
		active: user.id === selectedAuthorId,
	}));
	return <BaseFilterSection data={preparedData} title={t(User.FILTER_AUTHOR)} onClick={onClick} />;
};
