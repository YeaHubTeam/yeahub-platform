import { Button } from '@/shared/ui/Button';

interface SubscribeProps {
	className?: string;
}

export const Subscribe = ({ className }: SubscribeProps) => {
	return <Button className={className}>Подписаться</Button>;
};
