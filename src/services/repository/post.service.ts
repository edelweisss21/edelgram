import { db } from '@/firebaseConfig';
import { IDocumentResponse, IPost } from '@/types/types';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	orderBy,
	query,
	where,
} from 'firebase/firestore';

const COLLECTION_NAME = 'posts';

export const createPost = (post: IPost) => {
	return addDoc(collection(db, COLLECTION_NAME), post);
};

export const getPosts = async () => {
	try {
		const q = query(collection(db, COLLECTION_NAME), orderBy('date', 'desc'));
		const querySnapshot = await getDocs(q);
		const tempArr: IDocumentResponse[] = [];
		querySnapshot.forEach((doc) => {
			const data = doc.data() as IPost;
			const responseObj: IDocumentResponse = {
				id: doc.id,
				...data,
			};
			tempArr.push(responseObj);
		});
		return tempArr;
	} catch (error) {
		console.error(error);
	}
};

export const getPostByUserId = (id: string) => {
	const q = query(collection(db, COLLECTION_NAME), where('userId', '==', id));
	return getDocs(q);
};

export const getPost = (id: string) => {
	const docRef = doc(db, COLLECTION_NAME, id);
	return getDoc(docRef);
};

export const deletePost = (id: string) => {
	return deleteDoc(doc(db, COLLECTION_NAME, id));
};
