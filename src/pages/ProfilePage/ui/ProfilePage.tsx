import { FC } from 'react';

import { Block } from '@/widgets/Block';

import styles from './ProfilePage.module.css';

const ProfilePage: FC = () => {
	const blockContent = `I’m a product designer + filmmaker currently working remotely at Twitter from beautiful
	Manchester, United Kingdom. I’m passionate about designing digital products that have a
	positive impact on the world. For 10 years, I’ve specialised in interface, experience &
	interaction design as well as working in user research and product strategy for product I’m
	a product designer + filmmaker currently working remotely at Twitter from beautiful
	Manchester, United Kingdom. I’m passionate about designing digital products that have a
	positive impact on the world. For 10 years, I’ve specialised in interface, experience &
	interaction design as well as working in user research and product strategy for product I’m
	a product designer + filmmaker currently working remotely at Twitter from beautiful
	interaction design as well as working in user research and product strategy for product I’m
	a product designer + filmmaker currently working remotely at Twitter from beautiful
	interaction design as well as working in user research and product strategy for product I’m
	a product designer + filmmaker currently working remotely at Twitter from beautiful
	interaction design as well as working in user research and product strategy for product I’m
	a product designer + filmmaker currently working remotely at Twitter from beautiful
	interaction design as well as working in user research and product strategy for product I’m
	a product designer + filmmaker currently working remotely at Twitter from beautiful
	interaction design as well as working in user research and product strategy for product I’m
	a product designer + filmmaker currently working remotely at Twitter from beautiful`;

	return (
		<>
			<h2 className={styles.title}>Profile</h2>
			<div className={styles.content}>
				<div className={styles.left}>
					<Block expandable>{blockContent}</Block>
					<Block expandable>{blockContent}</Block>
					<Block expandable>{blockContent}</Block>
					<Block expandable>{blockContent}</Block>
				</div>
				<div className={styles.right}>
					<Block expandable>{blockContent}</Block>
					<Block expandable>{blockContent}</Block>
				</div>
			</div>
		</>
	);
};

export default ProfilePage;
