import { MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from './useUserAuth';

interface ILoginsForm<T> {
	callback: (info: T) => Promise<void>;
	initialValue: T;
}

export const useLoginsForm = <T>({
	callback,
	initialValue,
}: ILoginsForm<T>) => {
	const { googleSignIn, signUp, logIn } = useUserAuth();
	const [formData, setFormData] = useState<T>(initialValue);
	const navigate = useNavigate();
	const handleSubmit = async (e: MouseEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			console.log('The user info is : ', formData);
			await callback(formData);
			navigate('/edelgram/');
		} catch (error) {
			console.log('Error: ', error);
		}
	};

	const handleGoogleSignIn = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		try {
			await googleSignIn();
			navigate('/edelgram/');
		} catch (error) {
			console.log('Error: ', error);
		}
	};

	return {
		handleSubmit,
		handleGoogleSignIn,
		signUp,
		logIn,
		setFormData,
		formData,
	};
};
