import { Link } from 'react-router-dom';

import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';

import { GuruSocials } from '../../model/types/guru';

import styles from './GuruSocialsList.module.css';

interface GuruSocialsListProps {
	socials: GuruSocials;
}

export const GuruSocialsList = ({ socials }: GuruSocialsListProps) => {
	return (
		<Flex gap="12">
			<Link to={route(ROUTES.users.page, socials.profileId)}>
				<Icon
					icon="userCheckWithBackground"
					color="purple-700"
					className={styles['user-check-icon']}
				/>
			</Link>
			<a href={socials.telegram} target="_blank" rel="noreferrer">
				<Icon icon="telegramWithBackground" color="purple-700" />
			</a>
			{socials.youtube && (
				<a href={socials.youtube} target="_blank" rel="noreferrer">
					<Icon icon="youtubeWithBackground" color="purple-700" />
				</a>
			)}
		</Flex>
	);
};
