import ClipLoader from 'react-spinners/ClipLoader';
export default function Loader() {
	return (
		<div
			style={{
				width: ' 100px',
				height: '100px',
				position: 'absolute',
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
				margin: 'auto',
			}}
		>
			<ClipLoader
				color='black'
				size={100}
			/>
		</div>
	);
}
