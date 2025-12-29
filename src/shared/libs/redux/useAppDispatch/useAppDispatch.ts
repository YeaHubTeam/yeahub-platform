import { useDispatch } from 'react-redux';

import { createReduxStore } from '@/shared/config';

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch;
