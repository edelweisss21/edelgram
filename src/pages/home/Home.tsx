import Layout from '@/components/layout/Layout';
import PostCard from '@/components/post-card/PostCard';
import Stories from '@/components/stories/Stories';
import { Input } from '@/components/ui/input';
import { useUserAuth } from '@/hooks/useUserAuth';
import { getPosts } from '@/services/repository/post.service';
import { IDocumentResponse } from '@/types/types';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

const Home = () => {
	const { user } = useUserAuth();
	const [data, setData] = useState<IDocumentResponse[]>([]);
	const getAllPosts = async () => {
		const response: IDocumentResponse[] = (await getPosts()) || [];
		setData(response);
	};

	useEffect(() => {
		if (user !== null) getAllPosts();
	}, [user]);

	return (
		<Layout>
			<div className='flex flex-col'>
				<div className='relative mb-6 w-full text-gray-600'>
					<Input
						className='border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-sm text-base focus:outline-none'
						placeholder='Search...'
						type='search'
						name='search'
					/>
					<button className='absolute right-2.5 top-2.5' type='submit'>
						<Search className='w-5 h-5 text-gray-400' />
					</button>
				</div>
				<div className='mb-6'>
					<h2 className='mb-5'>Stories</h2>
					<Stories />
				</div>
				<div className='mb-5'>
					<h2 className='mb-5'>Feed</h2>
					<div className='w-full flex justify-center'>
						<div className='flex flex-col max-w-sm rounded-sm overflow-hidden'>
							{data ? (
								data.map((item) => <PostCard key={item.id} item={item} />)
							) : (
								<p>Loading...</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Home;
