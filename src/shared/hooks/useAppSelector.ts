import { useSelector } from 'react-redux';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { RootState } from '@/app/providers/store/config/config';
export const useAppSelector = useSelector.withTypes<RootState>();
