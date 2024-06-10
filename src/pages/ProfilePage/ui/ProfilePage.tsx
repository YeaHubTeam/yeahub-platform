import { Block } from '@/shared/ui/Block';
import { ErrorElement } from '@/shared/ui/ErrorElement';
import { Loader } from '@/shared/ui/Loader';

import { useGetProfileQuery } from '@/entities/auth';

import styles from './ProfilePage.module.css';

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

const ProfilePage = () => {
	const { data, isSuccess, isLoading, isError, error } = useGetProfileQuery();

	return (
		<>
			{isError && <ErrorElement fetchError={error} />}
			{isLoading && <Loader />}
			{isSuccess && (
				<div className={styles.content}>
					<div className={styles.left}>
						<Block expandable>
							{data?.firstName} {data?.lastName}
						</Block>
						<Block expandable>{blockContent}</Block>
						<Block expandable>{blockContent}</Block>
						<Block expandable>{blockContent}</Block>
					</div>
					<div className={styles.right}>
						<Block expandable>{blockContent}</Block>
						<Block expandable>{blockContent}</Block>
					</div>
				</div>
			)}
		</>
	);
};

export default ProfilePage;
