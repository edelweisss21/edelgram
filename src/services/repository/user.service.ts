import { db } from '@/firebaseConfig';
import { IUserProfile, IProfileResponse } from '@/types/types';
import {
	addDoc,
	collection,
	doc,
	getDocs,
	query,
	updateDoc,
	where,
} from 'firebase/firestore';

const COLLECTION_NAME = 'users';

export const createUserProfile = (user: IUserProfile) => {
	try {
		return addDoc(collection(db, COLLECTION_NAME), user);
	} catch (err) {
		console.error(err);
	}
};

export const getUserProfile = async (userId: string) => {
	try {
		const q = query(
			collection(db, COLLECTION_NAME),
			where('userId', '==', userId)
		);
		const querySnapshot = await getDocs(q);
		let tempData: IProfileResponse = {};
		if (querySnapshot.size > 0) {
			querySnapshot.forEach((doc) => {
				const data = doc.data() as IUserProfile;
				tempData = {
					id: doc.id,
					...data,
				};
			});
		}
		return tempData;
	} catch (error) {
		console.error(error);
	}
};

export const updateUserProfile = async (id: string, user: IUserProfile) => {
	const docRef = doc(db, COLLECTION_NAME, id);
	return updateDoc(docRef, {
		...user,
	});
};

export const getAllUsers = async (userId: string) => {
	try {
		const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
		let tempArr: IProfileResponse[] = [];
		if (querySnapshot.size > 0) {
			querySnapshot.forEach((doc) => {
				const userData = doc.data() as IUserProfile;
				const responseObj: IProfileResponse = {
					id: doc.id,
					...userData,
				};
				tempArr.push(responseObj);
			});
		}
		return tempArr.filter((item) => item.userId !== userId);
	} catch (error) {
		console.error(error);
	}
};
