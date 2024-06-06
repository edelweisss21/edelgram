import { auth } from '@/firebaseConfig';
import {
	User,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
} from 'firebase/auth';
import { ReactNode, createContext, useEffect, useState } from 'react';

interface IUserAuthContextData {
	user: User | null;
	logIn: typeof logIn;
	signUp: typeof signUp;
	logOut: typeof logOut;
	googleSignIn: typeof googleSignIn;
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

export const userAuthContext = createContext<IUserAuthContextData>({
	user: null,
	logIn,
	signUp,
	logOut,
	googleSignIn,
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
	};

	return (
		<userAuthContext.Provider value={value}>
			{children}
		</userAuthContext.Provider>
	);
};
