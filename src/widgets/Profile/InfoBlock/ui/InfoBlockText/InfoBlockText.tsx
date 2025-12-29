import { useTranslation } from 'react-i18next';

import { i18Namespace, Profile } from '@/shared/config';
import { TextHtml } from '@/shared/ui/TextHtml';

import styles from './InfoBlockText.module.css';

interface InfoBlockTextProps {
	description: string | undefined;
}

export const InfoBlockText = ({ description }: InfoBlockTextProps) => {
	const { t } = useTranslation(i18Namespace.profile);

	return (
		<TextHtml
			html={description ? description : t(Profile.ABOUT_ME_EMPTY)}
			className={styles['info-textarea']}
		/>
	);
};
