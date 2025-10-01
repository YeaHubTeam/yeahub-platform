import { User } from '@/entities/auth';

export type TelegramUnlinkResponse = Omit<User, 'subscriptions'> & { phone: string };
