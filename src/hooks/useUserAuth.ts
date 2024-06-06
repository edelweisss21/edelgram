import { userAuthContext } from '@/context/userAuthContext';
import { useContext } from 'react';

export const useUserAuth = () => {
	return useContext(userAuthContext);
};
