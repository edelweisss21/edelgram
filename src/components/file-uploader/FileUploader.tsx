import { TFileEntry, TPhotoMeta } from '@/types/types';
import { FileUploaderRegular } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';
import {
	OutputCollectionState,
	OutputCollectionStatus,
	OutputFileEntry,
} from '@uploadcare/blocks';
import { useCallback, useRef } from 'react';

//TODO: Декомпозироовать

interface IFileUploaderProps {
	fileEntry: TFileEntry;
	onChange: (fileEntry: TFileEntry) => void;
}

const FileUploader = ({ fileEntry, onChange }: IFileUploaderProps) => {
	const ctxProviderRef = useRef<InstanceType<UploadCtxProvider>>(null);

	const handleChangeEvent = (
		e: OutputCollectionState<OutputCollectionStatus, 'maybe-has-group'>
	) => {
		const newFiles: TPhotoMeta[] = e.successEntries.map((entry) => ({
			cdnUrl: entry.cdnUrl || null,
			uuid: entry.uuid || null,
		}));
		onChange({ files: newFiles });
		console.log('The uploaded file event is: ', newFiles);
	};

	const handleRemoveClick = useCallback(
		(uuid: OutputFileEntry['uuid']) =>
			onChange({ files: fileEntry.files.filter((f) => f.uuid !== uuid) }),
		[fileEntry.files, onChange]
	);

	const resetUploaderState = () => {
		ctxProviderRef.current?.uploadCollection.clearAll();
		onChange({ files: [] });
	};

	return (
		<div>
			<FileUploaderRegular
				maxLocalFileSizeBytes={10000000}
				multipleMax={50}
				imgOnly={true}
				sourceList='local, url, camera, dropbox, instagram'
				removeCopyright
				confirmUpload={false}
				onChange={handleChangeEvent}
				pubkey='e70c89d72eb677ec70b2'
			/>
			<div className='grid grid-cols-2 gap-4 mt-8'>
				{fileEntry.files.map((file) => (
					<div key={file.uuid} className='relative'>
						<img
							src={`${file.cdnUrl}/-/format/webp/-/quality/smart/-/stretch/fill/
              `}
							alt={file.uuid ?? ''}
						/>
						<div className='cursor-pointer flex justify-center absolute -right-2 -top-2 bg-white border-2 border-slate-800  rounded-full w-7 h-7'>
							<button
								className='text-slate-800 text-center'
								type='button'
								onClick={() => handleRemoveClick(file.uuid)}
							>
								&times;
							</button>
						</div>
						<button onClick={resetUploaderState}>test</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default FileUploader;
