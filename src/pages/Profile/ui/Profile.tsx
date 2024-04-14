import { FC } from 'react';

import Photo from '@/shared/assets/icons/Photo.png';

import { Block } from '@/widgets/Block';

import styles from './Profile.module.css';

export const Profile: FC = () => {
	return (
		<>
			<h2 className={styles.title}>Profile</h2>
			<Block
				title="Анастасия Заворотнюк"
				type="profile"
				avatar={<img src={Photo} alt="avatar" />}
				actionSlot={<div>Редактировать</div>}
			>
				<div>
					<span>UX/UI Дизайнер в Яндекс</span>
				</div>
			</Block>
			<Block title="Обо мне" expandable actionSlot={<div>Редактировать</div>}>
				I’m a product designer + filmmaker currently working remotely at Twitter from beautiful
				Manchester, United Kingdom. I’m passionate about designing digital products that have a
				positive impact on the world. For 10 years, I’ve specialised in interface, experience &
				interaction design as well as working in user research and product strategy for product I’m
				a product designer + filmmaker currently working remotely at Twitter from beautiful
				Manchester, United Kingdom. I’m passionate about designing digital products that have a
				positive impact on the world. For 10 years, I’ve specialised in interface, experience &
				interaction design as well as working in user research and product strategy for product I’m
				a product designer + filmmaker currently working remotely at Twitter from beautiful
				Manchester, United Kingdom. I’m passionate about designing digital products that have a
				positive impact on the world. For 10 years, I’ve specialised in interface, experience &
				interaction design as well as working in user research and product strategy for product I’m
				a product designer + filmmaker currently working remotely at Twitter from beautiful
				Manchester, United Kingdom. I’m passionate about designing digital products that have a
				positive impact on the world. For 10 years, I’ve specialised in interface, experience &
				interaction design as well as working in user research and product strategy for product a
				product designer + filmmaker currently working remotely at Twitter from beautiful
				Manchester, United Kingdom. I’m passionate about designing digital products that have a
			</Block>
		</>
	);
};
