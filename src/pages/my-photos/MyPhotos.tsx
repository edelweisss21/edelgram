import Layout from '@/components/layout/Layout';
import { useUserAuth } from '@/hooks/useUserAuth';
import { getPostByUserId } from '@/services/repository/post.service';
import { IDocumentResponse, IPost } from '@/types/types';
import { useEffect, useState } from 'react';
import Post from '@/components/post/Post';

const MyPhotos = () => {
	const { user } = useUserAuth();
	const [data, setData] = useState<IDocumentResponse[]>([]);

	const getAllPosts = async (id: string) => {
		try {
			const querySnapshot = await getPostByUserId(id);
			const tempArr: IDocumentResponse[] = [];
			querySnapshot.forEach((doc) => {
				const data = doc.data() as IPost;
				const responseObj: IDocumentResponse = {
					id: doc.id,
					...data,
				};
				tempArr.push(responseObj);
			});
			setData(tempArr);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (user !== null) getAllPosts(user.uid);
	}, [user]);

	return (
		<Layout>
			<div className='flex justify-center'>
				<div className='border max-w-3xl w-full'>
					<h3 className='bg-slate-800 text-white text-center text-lg p-2'>
						My Photos
					</h3>
					<div className='p-8'>
						<div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
							{data ? <Post data={data} /> : <div>...Loading</div>}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default MyPhotos;
