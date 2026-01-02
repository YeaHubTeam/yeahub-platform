import { useTranslation } from 'react-i18next';

import { i18Namespace, Media } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { gurus, GurusList } from '@/entities/guru';

export const GurusBlock = () => {
	const { t } = useTranslation(i18Namespace.media);
	const { isMobile } = useScreenSize();

	return (
		<Flex direction="column" gap="12">
			<Text variant={isMobile ? 'body5-accent' : 'head3'}>{t(Media.MEDIA_EXPERTS_TITLE)}</Text>
			<Text variant="body3">{t(Media.MEDIA_EXPERTS_DESCRIPTION)}</Text>
			<GurusList variant="list-with-borders" gurus={gurus} />
		</Flex>
	);
};
