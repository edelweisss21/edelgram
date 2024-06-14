import FileUploader from '@/components/file-uploader/FileUploader';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { IProfileInfo, IUserProfile, TFileEntry } from '@/types/types';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import avatar from '../../assets/images/image7.jpg';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	createUserProfile,
	updateUserProfile,
} from '@/services/repository/user.service';
import { useUserAuth } from '@/hooks/useUserAuth';
import { updateUserInfoOnPosts } from '@/services/repository/post.service';

const EditProfile = () => {
	const { user, updateProfileInfo } = useUserAuth();
	const location = useLocation();
	const navigate = useNavigate();
	const { id, userId, userBio, displayName, photoURL } = location.state;
	console.log('location', location.state);

	const [data, setData] = useState<IUserProfile>({
		userId: userId || '',
		userBio: userBio || '',
		displayName: displayName || '',
		photoURL: photoURL || '',
	});

	const [fileEntry, setFileEntry] = useState<TFileEntry>({
		files: [],
	});

	console.log('data', data);
	console.log('id', id, userId, displayName);

	const updateProfile = async (e: MouseEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			if (id) {
				await updateUserProfile(id, data);
			} else {
				await createUserProfile(data);
			}

			const profileInfo: IProfileInfo = {
				user: user!,
				displayName: data.displayName,
				photoURL: data.photoURL,
			};

			updateProfileInfo(profileInfo);
			updateUserInfoOnPosts(profileInfo);
		} catch (error) {
			console.error(error);
		}
		navigate('/edelgram/profile/');
	};

	useEffect(() => {
		if (fileEntry.files.length > 0)
			setData((prevData) => ({
				...prevData,
				photoURL: fileEntry.files[0].cdnUrl || '',
			}));
	}, [fileEntry]);

	return (
		<div>
			<Layout>
				<div className='flex justify-center'>
					<div className='border max-w-3xl w-full'>
						<h3 className='bg-slate-800 text-white text-center text-lg p-2'>
							Edit profile
						</h3>
						<div className='p-8'>
							<form onSubmit={updateProfile}>
								<div className='flex flex-col'>
									<Label className='mb-4' htmlFor='photos'>
										Profile picture
									</Label>
									<div className='mb-4'>
										{fileEntry.files.length > 0 ? (
											<img
												src={fileEntry.files[0].cdnUrl!}
												alt='avatar'
												className='w-28 h-28 rounded-full border-2 border-slate-800 object-cover'
											/>
										) : (
											<img
												src={data.photoURL ? data.photoURL : avatar}
												alt='avatar'
												className='w-28 h-28 rounded-full border-2 border-slate-800 object-cover'
											/>
										)}
									</div>
									<FileUploader
										fileEntry={fileEntry}
										onChange={setFileEntry}
										preview={false}
									/>
								</div>
								<div className='flex flex-col mt-4'>
									<Label className='mb-4' htmlFor='name'>
										Display Name
									</Label>
									<Input
										className='mb-8'
										id='name'
										placeholder='Enter your username'
										value={data.displayName}
										onChange={(e: ChangeEvent<HTMLInputElement>) =>
											setData({ ...data, displayName: e.target.value })
										}
									/>
								</div>
								<div className='flex flex-col'>
									<Label className='mb-4' htmlFor='bio'>
										Profile bio
									</Label>
									<Textarea
										className='mb-8 max-h-56'
										id='bio'
										placeholder='Enter your profile bio'
										value={data.userBio}
										onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
											setData({ ...data, userBio: e.target.value })
										}
									/>
								</div>
								<Button className='mt-4 w-32 mr-8' type='submit'>
									Update
								</Button>
								<Button
									variant='destructive'
									className='mt-4 w-32 mr-8'
									type='submit'
									onClick={() => navigate('/edelgram/profile/')}
								>
									Cancel
								</Button>
							</form>
						</div>
					</div>
				</div>
			</Layout>
		</div>
	);
};

export default EditProfile;
