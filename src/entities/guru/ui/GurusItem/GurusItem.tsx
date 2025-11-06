import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { Avatar } from '@/shared/ui/Avatar';
import { Flex } from '@/shared/ui/Flex';
import { StatusChip } from '@/shared/ui/StatusChip';
import { Text } from '@/shared/ui/Text';

import { Guru } from '../../model/types/guru';
import { GuruSocialsList } from '../GuruSocialsList/GuruSocialsList';

import styles from './GurusItem.module.css';

interface GurusItemProps {
	guru: Guru;
	avatarSize: number;
	description?: string;
	hasBorder?: boolean;
	showSocials?: boolean;
}

export const GurusItem = ({
	guru,
	avatarSize,
	description,
	hasBorder = false,
	showSocials = true,
}: GurusItemProps) => {
	const { image, name, title, socials, hasPractice } = guru;

	const { t } = useTranslation(i18Namespace.landing);

	return (
		<Flex
			componentType="li"
			direction="column"
			gap="12"
			className={hasBorder ? styles.border : undefined}
		>
			{hasPractice ? (
				<Flex gap="8" align={description ? 'center' : 'start'}>
					<Avatar size={avatarSize} withBorder image={image} className={styles.avatar} />
					<Flex gap="4" direction="column">
						<Text variant="body3-accent" color="black-800">
							{title}
						</Text>
						<Text variant="body3-accent" color="black-500">
							{name}
						</Text>
						{!description && showSocials && <GuruSocialsList socials={socials} />}
					</Flex>
				</Flex>
			) : (
				<Flex gap="10" direction={'column'}>
					<Flex gap="6" direction={'column'} align={'center'}>
						<Avatar size={avatarSize} withBorder image={image} className={styles.avatar} />
						<StatusChip status={{ text: t(Landing.GURU_BADGE), variant: 'green' }} />
					</Flex>
					<Flex gap="4" direction="column">
						<Text variant="body3-accent" color="black-800">
							{title}
						</Text>
						<Text variant="body3-accent" color="black-500">
							{name}
						</Text>
						{!description && showSocials && <GuruSocialsList socials={socials} />}
					</Flex>
				</Flex>
			)}

			{description && (
				<>
					<Text variant="body3-accent" color="black-800">
						{description}
					</Text>
					{showSocials && <GuruSocialsList socials={socials} />}
				</>
			)}
		</Flex>
	);
};
