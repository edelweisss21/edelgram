import { useUserAuth } from '@/hooks/useUserAuth';
import { IDocumentResponse } from '@/types/types';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../ui/card';
import image2 from '../../assets/images/image2.jpg';
import { HeartIcon, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IPostCardProps {
	data: IDocumentResponse[];
}

const PostCard = ({ data }: IPostCardProps) => {
	const { user } = useUserAuth();
	console.log('PostCard data:', data);
	return (
		<>
			{data.map((item) => (
				<Card key={item.id} className='mb-6'>
					<CardHeader className='flex flex-col p-3'>
						<CardTitle className='text-sm text-center flex justify-start items-center'>
							<span className='mr-2'>
								<img
									src={image2}
									className='w-10 h-10 rounded-full border-2 border-slate-800 object-cover'
									alt='image'
								/>
							</span>
							<span>user</span>
						</CardTitle>
					</CardHeader>
					<CardContent className='p-0'>
						<img
							src={item.photos ? item.photos[0].cdnUrl ?? undefined : ''}
							alt=''
						/>
					</CardContent>
					<CardFooter className='flex flex-col p-3'>
						<div className='flex justify-start w-full mb-3'>
							<HeartIcon className={cn('mr-3', 'cursor-pointer')} />
							<MessageCircle className='mr-3 cursor-pointer' />
						</div>
						<div className='w-full text-sm'>{0} likes</div>
						<div className='w-full text-sm'>
							{' '}
							<span>user</span>: {item.caption}
						</div>
					</CardFooter>
				</Card>
			))}
		</>
	);
};

export default PostCard;
