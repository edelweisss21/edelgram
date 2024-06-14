import { auth } from '@/firebaseConfig';
import { IProfileInfo } from '@/types/types';
import {
	User,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	updateProfile,
} from 'firebase/auth';
import { ReactNode, createContext, useEffect, useState } from 'react';

interface IUserAuthContextData {
	user: User | null;
	logIn: typeof logIn;
	signUp: typeof signUp;
	logOut: typeof logOut;
	googleSignIn: typeof googleSignIn;
	updateProfileInfo: typeof updateProfileInfo;
}

interface IUserAuthProvider {
	children: ReactNode;
}

const logIn = (email: string, password: string) => {
	return signInWithEmailAndPassword(auth, email, password);
};

const signUp = (email: string, password: string) => {
	return createUserWithEmailAndPassword(auth, email, password);
};

const logOut = () => {
	signOut(auth);
};

const googleSignIn = () => {
	const googleAuthProvider = new GoogleAuthProvider();
	return signInWithPopup(auth, googleAuthProvider);
};

const updateProfileInfo = async (profileInfo: IProfileInfo) => {
	return updateProfile(profileInfo.user!, {
		displayName: profileInfo.displayName,
		photoURL: profileInfo.photoURL,
	});
};

export const userAuthContext = createContext<IUserAuthContextData>({
	user: null,
	logIn,
	signUp,
	logOut,
	googleSignIn,
	updateProfileInfo,
});

export const UserAuthProvider = ({ children }: IUserAuthProvider) => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				console.log('The logged in user state is:', user);
				setUser(user);
			}

			return () => {
				unsubscribe();
			};
		});
	}, []);

	const value: IUserAuthContextData = {
		user,
		logIn,
		signUp,
		logOut,
		googleSignIn,
		updateProfileInfo,
	};

	return (
		<userAuthContext.Provider value={value}>
			{children}
		</userAuthContext.Provider>
	);
};
