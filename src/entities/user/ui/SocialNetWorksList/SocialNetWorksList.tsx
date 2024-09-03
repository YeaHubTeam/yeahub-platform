import { Fragment } from 'react';

import { SOCIAL_NETWORKS } from '../../model/data/userInfo';
import { SocialNetWorksItem } from '../SocialNetWorksItem/SocialNetWorksItem';

export const SocialNetWorksList = () => {
	return (
		<>
			{SOCIAL_NETWORKS.map((socialNetwork) => (
				<Fragment key={socialNetwork.code}>
					<SocialNetWorksItem code={socialNetwork.code} title={socialNetwork.title} />
				</Fragment>
			))}
		</>
	);
};
