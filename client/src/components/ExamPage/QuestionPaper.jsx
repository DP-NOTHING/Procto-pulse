import React, { useState, useEffect } from 'react';
import Bar from './Drawer.jsx';
import Webcam from 'react-webcam';
import axios from 'axios';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useRestrictCopyPaste } from './useRestrictCopyPaste.ts';
import { Document, Page, pdfjs } from 'react-pdf';
import Pagination from '@mui/material/Pagination';
import { Stack } from '@mui/material';
import Loader from '../Loader/Loader.jsx';
import CircularProgress from '@mui/material/CircularProgress';
import AlertDialog from './AlertDialog.jsx';
import ResponseArea from './ResponseArea.jsx';
import Box from '@mui/material/Box';
import 'react-pdf/dist/esm/Page/TextLayer.css';
// import 'react-pdf/dist/esm/Page/TextLayer.css';
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
export default function QuestionPaper({ exam, show }) {
	// console.log(exam);
	pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	/*To Prevent right click on screen*/
	document.addEventListener('contextmenu', (event) => {
		event.preventDefault();
	});

	/*When document gets loaded successfully*/
	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
		setPageNumber(1);
	}

	// function changePage(offset) {
	// 	setPageNumber((prevPageNumber) => prevPageNumber + offset);
	// }
	function changePageNumber(e, n) {
		setPageNumber(n);
	}
	// function previousPage() {
	// 	changePage(-1);
	// }

	// function nextPage() {
	// 	changePage(1);
	// }

	return (
		<>
			{
				<div hidden={!show}>
					<Stack
						spacing={2}
						alignItems='center'
					>
						<Document
							loading={<CircularProgress />}
							// renderMode='custom'
							file={`${process.env.REACT_APP_BACKEND}/exam/download/${exam.file}`}
							onLoadSuccess={onDocumentLoadSuccess}
						>
							<Page
								loading={<CircularProgress />}
								pageNumber={pageNumber}
								renderTextLayer={false}
							/>
						</Document>
						{numPages && (
							<Pagination
								count={numPages}
								boundaryCount={0}
								variant='outlined'
								color='primary'
								size='large'
								siblingCount={1}
								onChange={changePageNumber}
								showFirstButton
								showLastButton
							/>
						)}
						{/* <div>
	            <div>
	              Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
	            </div>
	            <div>
	              <button
	                type='button'
	                disabled={pageNumber <= 1}
	                onClick={previousPage}
	                className='Pre'
	              >
	                Previous
	              </button>
	              <button
	                type='button'
	                disabled={pageNumber >= numPages}
	                onClick={nextPage}
	              >
	                Next
	              </button>
	            </div>
	          </div> */}
					</Stack>
				</div>
			}
		</>
	);
}
