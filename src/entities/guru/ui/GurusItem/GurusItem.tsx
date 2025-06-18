import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Guru as GuruTranslation } from '@/shared/config/i18n/i18nTranslations';
import { Avatar } from '@/shared/ui/Avatar';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { Guru } from '../../model/types/guru';
import { GuruSocialsList } from '../GuruSocialsList/GuruSocialsList';

import styles from './GurusItem.module.css';

interface GurusItemProps {
	guru: Guru;
	withDescription?: boolean;
	avatarSize: number;
}

export const GurusItem = ({ guru, avatarSize, withDescription = false }: GurusItemProps) => {
	const { t } = useTranslation(i18Namespace.guru);
	const { image, name, title, socials } = guru;

	return (
		<Flex componentType="li" direction="column" gap="12">
			<Flex gap="8" align={withDescription ? 'center' : 'start'}>
				<Avatar size={avatarSize} withBorder image={image} className={styles.avatar} />
				<Flex gap="4" direction="column">
					<Text variant="body3-accent" color="black-800">
						{title}
					</Text>
					<Text variant="body3-accent" color="black-500">
						{name}
					</Text>
					{!withDescription && <GuruSocialsList socials={socials} />}
				</Flex>
			</Flex>
			{withDescription && (
				<>
					<Text variant="body3-accent" color="black-800">
						{t(GuruTranslation.BANNER_DESCRIPTION)}
					</Text>
					<GuruSocialsList socials={socials} />
				</>
			)}
		</Flex>
	);
};
