import { IDocumentResponse, TLikes } from '@/types/types';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../ui/card';
import { HeartIcon, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useUserAuth } from '@/hooks/useUserAuth';
import { updateLikesOnPost } from '@/services/repository/post.service';

interface IPostCardProps {
	item: IDocumentResponse;
}

const PostCard = ({ item }: IPostCardProps) => {
	const { user } = useUserAuth();
	const [likesInfo, setLikeInfo] = useState<TLikes>({
		likes: item.likes,
		isLike: user?.uid ? item.userLikes.includes(user?.uid) : false,
	});

	const updateLike = async (isVal: boolean) => {
		setLikeInfo({
			likes: isVal ? likesInfo.likes + 1 : likesInfo.likes - 1,
			isLike: !likesInfo.isLike,
		});
		if (isVal && user?.uid) {
			item.userLikes.push(user?.uid);
		} else {
			const index = item.userLikes.indexOf(user!.uid);
			if (index !== -1) item.userLikes.splice(index);
		}

		if (item.id)
			await updateLikesOnPost(
				item.id,
				item.userLikes,
				isVal ? likesInfo.likes + 1 : likesInfo.likes - 1
			);
	};

	return (
		<>
			<Card className='mb-6'>
				<CardHeader className='flex flex-col p-3'>
					<CardTitle className='text-sm text-center flex justify-start items-center'>
						<span className='mr-2'>
							<img
								src={item.photoURL}
								className='w-10 h-10 rounded-full border-2 border-slate-800 object-cover'
								alt='image'
							/>
						</span>
						<span>{item.username}</span>
					</CardTitle>
				</CardHeader>
				<CardContent className='p-0'>
					<img
						src={item.photos ? item.photos[0].cdnUrl ?? undefined : ''}
						alt='photo'
					/>
				</CardContent>
				<CardFooter className='flex flex-col p-3'>
					<div className='flex justify-start w-full mb-3'>
						<HeartIcon
							className={cn(
								'mr-3',
								'cursor-pointer',
								likesInfo.isLike ? 'fill-red-400' : 'fill-none'
							)}
							onClick={() => updateLike(!likesInfo.isLike)}
						/>
						<MessageCircle className='mr-3 cursor-pointer' />
					</div>
					<div className='w-full text-sm'>{likesInfo.likes} likes</div>
					<div className='w-full text-sm'>
						<span>{item.username}</span>: {item.caption}
					</div>
				</CardFooter>
			</Card>
		</>
	);
};

export default PostCard;
