import { LeftBlock } from '../LeftBlock/LeftBlock';
import { RightBlock } from '../RightBlock/RightBlock';

import styles from './BannerBlock.module.css';

export const BannerBlock = () => {
	return (
		<section className={styles['banner-block']}>
			<LeftBlock />
			<RightBlock />
		</section>
	);
};
