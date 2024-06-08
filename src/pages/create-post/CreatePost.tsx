import FileUploader from '@/components/file-uploader/FileUploader';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useUserAuth } from '@/hooks/useUserAuth';
import { IPost, TFileEntry } from '@/types/types';
import { ChangeEvent, MouseEvent, useState } from 'react';

const CreatePost = () => {
	const { user } = useUserAuth();
	const [fileEntry, setFileEntry] = useState<TFileEntry>({
		files: [],
	});

	const [post, setPost] = useState<IPost>({
		caption: '',
		photos: [],
		likes: 0,
		userLikes: [],
		userId: '',
		date: new Date(),
	});

	const handleSubmit = async (e: MouseEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('Uploaded File Entry: ', fileEntry.files);
		console.log('The create post is: ', post);
	};

	return (
		<Layout>
			<div className='flex justify-center'>
				<div className='border max-w-3xl w-full'>
					<h3 className='bg-slate-800 text-white text-center text-lg p-2'>
						Create post
					</h3>
					<div className='p-8'>
						<form onSubmit={handleSubmit}>
							<div className='flex flex-col'>
								<Label className='mb-4' htmlFor='caption'>
									Photo caption
								</Label>
								<Textarea
									className='mb-8'
									id='caption'
									placeholder='Write something....'
									value={post.caption}
									onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
										setPost({ ...post, caption: e.target.value })
									}
								/>
								<div className='flex flex-col'>
									<Label className='mb-4' htmlFor='photo'>
										Photos
									</Label>
									<FileUploader fileEntry={fileEntry} onChange={setFileEntry} />
								</div>
								<Button className='mt-8 w-32' type='submit'>
									Post
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default CreatePost;
