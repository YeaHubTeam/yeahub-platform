import { useState } from 'react';

import { useAppSelector } from '@/shared/hooks/useAppSelector';

import { getFullProfile } from '@/entities/profile';

import { useLazyGetOrderIdQuery } from '../api/subscribeButtonApi';

import styles from './SubscribeButton.module.css';
interface SubscribeButtonProps {
	className?: string;
}

export const SubscribeButton = ({ className }: SubscribeButtonProps) => {
	const [orderId, setOrderId] = useState('');
	const profile = useAppSelector(getFullProfile);
	const [fetchOrderId] = useLazyGetOrderIdQuery();

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			const response = await fetchOrderId({ id: '3' }).unwrap();
			setOrderId(response.orderId);
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			window.pay(event.target);
		} catch (error) {
			console.error('Ошибка при получении orderId', error);
		}
	};

	return (
		<form className="payform-tbank" name="payform-tbank" onSubmit={handleSubmit}>
			<input
				className="payform-tbank-row"
				type="hidden"
				name="terminalkey"
				value="1732126948702DEMO"
			/>
			<input className="payform-tbank-row" type="hidden" name="frame" value="false" />
			<input className="payform-tbank-row" type="hidden" name="language" value="ru" />
			<input
				className="payform-tbank-row"
				type="hidden"
				placeholder="Сумма заказа"
				name="amount"
				value={200}
				required
			/>
			<input className="payform-tbank-row" type="hidden" name="order" value={orderId} />
			<input
				className="payform-tbank-row"
				type="hidden"
				placeholder="Описание заказа"
				name="description"
				value={'Членство в сообществе'}
			/>
			<input
				className="payform-tbank-row"
				type="hidden"
				placeholder="ФИО плательщика"
				name="name"
				value={profile.lastName + profile.firstName}
			/>
			<input
				className="payform-tbank-row"
				type="hidden"
				placeholder="E-mail"
				name="email"
				value={profile.email}
			/>
			<input
				className="payform-tbank-row"
				type="hidden"
				placeholder="Контактный телефон"
				name="phone"
				value={profile.phone}
			/>
			<input className="payform-tbank-row" type="hidden" name="reccurentPayment" value="true" />
			<input className="payform-tbank-row" type="hidden" name="customerKey" value={profile.id} />
			<input
				className={`payform-tbank-row payform-tbank-btn ${styles.subscribe} ${className}`}
				type="submit"
				value="Подписаться"
			/>
		</form>
	);
};
