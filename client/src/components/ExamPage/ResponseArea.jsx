import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import isHotkey from 'is-hotkey';
import { Editable, withReact, useSlate, Slate } from 'slate-react';
import {
	Editor,
	Transforms,
	createEditor,
	Descendant,
	Element as SlateElement,
} from 'slate';
import { withHistory } from 'slate-history';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import CodeIcon from '@mui/icons-material/Code';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import { ReactNode, Ref, PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';
import { cx, css } from '@emotion/css';
import { Grid } from '@mui/material';
export const Button = React.forwardRef(
	({ className, active, reversed, ...props }, ref) => (
		<span
			{...props}
			ref={ref}
			className={cx(
				className,
				css`
					cursor: pointer;
					color: ${reversed
						? active
							? 'white'
							: '#aaa'
						: active
						? 'black'
						: '#ccc'};
				`
			)}
		/>
	)
);

export const EditorValue = React.forwardRef(
	({ className, value, ...props }, ref) => {
		const textLines = value.document.nodes
			.map((node) => node.text)
			.toArray()
			.join('\n');
		return (
			<div
				ref={ref}
				{...props}
				className={cx(
					className,
					css`
						margin: 30px -20px 0;
					`
				)}
			>
				<div
					className={css`
						font-size: 14px;
						padding: 5px 20px;
						color: #404040;
						border-top: 2px solid #eeeeee;
						background: #f8f8f8;
					`}
				>
					Slate's value as text
				</div>
				<div
					className={css`
						color: #404040;
						font: 12px monospace;
						white-space: pre-wrap;
						padding: 10px 20px;
						div {
							margin: 0 0 0.5em;
						}
					`}
				>
					{textLines}
				</div>
			</div>
		);
	}
);

export const Icon = React.forwardRef(({ className, ...props }, ref) => (
	<span
		{...props}
		ref={ref}
		className={cx(
			'material-icons',
			className,
			css`
				font-size: 18px;
				vertical-align: text-bottom;
			`
		)}
	/>
));

export const Instruction = React.forwardRef(({ className, ...props }, ref) => (
	<div
		{...props}
		ref={ref}
		className={cx(
			className,
			css`
				white-space: pre-wrap;
				margin: 0 -20px 10px;
				padding: 10px 20px;
				font-size: 14px;
				background: #f8f8e8;
			`
		)}
	/>
));

export const Menu = React.forwardRef(({ className, ...props }, ref) => (
	<div
		{...props}
		data-test-id='menu'
		ref={ref}
		className={cx(
			className,
			css`
				& > * {
					display: inline-block;
				}

				& > * + * {
					margin-left: 15px;
				}
			`
		)}
	/>
));

export const Portal = ({ children }) => {
	return typeof document === 'object'
		? ReactDOM.createPortal(children, document.body)
		: null;
};

const Toolbar = React.forwardRef(({ className, ...props }, ref) => (
	<Menu
		{...props}
		ref={ref}
		className={cx(
			className,
			css`
				position: relative;
				padding: 1px 18px 17px;
				margin-top: 20px;
				/* margin-left: 50%; */
				/* margin: 0 -20px; */
				border-bottom: 2px solid #eee;
				margin-bottom: 20px;
			`
		)}
	/>
));
const HOTKEYS = {
	'mod+b': 'bold',
	'mod+i': 'italic',
	'mod+u': 'underline',
	'mod+`': 'code',
};

const LIST_TYPES = ['numbered-list', 'bulleted-list'];
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];

export default function ResponseArea(props) {
	const { show } = props;
	const response = props.response;
	// console.log(response == false);
	// JSON.parse(null);
	// console.log(localStorage.getItem('content'));
	const initialValue = (response && JSON.parse(response)) ||
		JSON.parse(localStorage.getItem('content')) || [
			{
				type: 'paragraph',
				children: [{ text: '' }],
			},
		];

	// console.log(JSON.parse(props.response));
	const renderElement = useCallback((props) => <Element {...props} />, []);
	const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
	const editor = useMemo(() => withHistory(withReact(createEditor())), []);
	return (
		<div hidden={!show}>
			<Slate
				editor={editor}
				initialValue={initialValue}
				onChange={(value) => {
					const isAstChange = editor.operations.some(
						(op) => 'set_selection' !== op.type
					);
					if (isAstChange) {
						// Save the value to Local Storage.
						const content = JSON.stringify(value);
						localStorage.setItem('content', content);
					}
				}}
				// onChange={(val) => {
				// 	console.log(val);
				// }}
			>
				<Toolbar>
					<MarkButton
						format='bold'
						icon={<FormatBoldIcon />}
					/>
					<MarkButton
						format='italic'
						icon={<FormatItalicIcon />}
					/>
					<MarkButton
						format='underline'
						icon={<FormatUnderlinedIcon />}
					/>
					<MarkButton
						format='code'
						icon={<CodeIcon />}
					/>
					<BlockButton
						format='heading-one'
						icon={<LooksOneIcon />}
					/>
					<BlockButton
						format='heading-two'
						icon={<LooksTwoIcon />}
					/>
					<BlockButton
						format='block-quote'
						icon={<FormatQuoteIcon />}
					/>
					<BlockButton
						format='numbered-list'
						icon={<FormatListNumberedIcon />}
					/>
					<BlockButton
						format='bulleted-list'
						icon={<FormatListBulletedIcon />}
					/>
					<BlockButton
						format='left'
						icon={<FormatAlignLeftIcon />}
					/>
					<BlockButton
						format='center'
						icon={<FormatAlignCenterIcon />}
					/>
					<BlockButton
						format='right'
						icon={<FormatAlignRightIcon />}
					/>
					<BlockButton
						format='justify'
						icon={<FormatAlignJustifyIcon />}
					/>
				</Toolbar>
				<Editable
					readOnly={response ? true : false}
					renderElement={renderElement}
					renderLeaf={renderLeaf}
					placeholder='Write your responses here...'
					spellCheck
					style={{
						boxShadow: '0 0 0 1px gray',
						margin: 25,
						fontSize: 'large',
						letterSpacing: 0.1,
						paddingLeft: 6,
						paddingRight: 6,
						paddingTop: '0px',
						paddingBottom: 1,
					}}
					autoFocus
					onKeyDown={(event) => {
						for (const hotkey in HOTKEYS) {
							if (isHotkey(hotkey, event)) {
								event.preventDefault();
								const mark = HOTKEYS[hotkey];
								toggleMark(editor, mark);
							}
						}
					}}
				/>
			</Slate>
		</div>
	);
}

const toggleBlock = (editor, format) => {
	const isActive = isBlockActive(
		editor,
		format,
		TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
	);
	const isList = LIST_TYPES.includes(format);

	Transforms.unwrapNodes(editor, {
		match: (n) =>
			!Editor.isEditor(n) &&
			SlateElement.isElement(n) &&
			LIST_TYPES.includes(n.type) &&
			!TEXT_ALIGN_TYPES.includes(format),
		split: true,
	});
	let newProperties;
	if (TEXT_ALIGN_TYPES.includes(format)) {
		newProperties = {
			align: isActive ? undefined : format,
		};
	} else {
		newProperties = {
			type: isActive ? 'paragraph' : isList ? 'list-item' : format,
		};
	}
	Transforms.setNodes(editor, newProperties);

	if (!isActive && isList) {
		const block = { type: format, children: [] };
		Transforms.wrapNodes(editor, block);
	}
};

const toggleMark = (editor, format) => {
	const isActive = isMarkActive(editor, format);

	if (isActive) {
		Editor.removeMark(editor, format);
	} else {
		Editor.addMark(editor, format, true);
	}
};

const isBlockActive = (editor, format, blockType = 'type') => {
	const { selection } = editor;
	if (!selection) return false;

	const [match] = Array.from(
		Editor.nodes(editor, {
			at: Editor.unhangRange(editor, selection),
			match: (n) =>
				!Editor.isEditor(n) &&
				SlateElement.isElement(n) &&
				n[blockType] === format,
		})
	);

	return !!match;
};

const isMarkActive = (editor, format) => {
	const marks = Editor.marks(editor);
	return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }) => {
	const style = { textAlign: element.align };
	switch (element.type) {
		case 'block-quote':
			return (
				<blockquote
					style={style}
					{...attributes}
				>
					{children}
				</blockquote>
			);
		case 'bulleted-list':
			return (
				<ul
					style={style}
					{...attributes}
				>
					{children}
				</ul>
			);
		case 'heading-one':
			return (
				<h1
					style={style}
					{...attributes}
				>
					{children}
				</h1>
			);
		case 'heading-two':
			return (
				<h2
					style={style}
					{...attributes}
				>
					{children}
				</h2>
			);
		case 'list-item':
			return (
				<li
					style={style}
					{...attributes}
				>
					{children}
				</li>
			);
		case 'numbered-list':
			return (
				<ol
					style={style}
					{...attributes}
				>
					{children}
				</ol>
			);
		default:
			return (
				<p
					style={style}
					{...attributes}
				>
					{children}
				</p>
			);
	}
};

const Leaf = ({ attributes, children, leaf }) => {
	if (leaf.bold) {
		children = <strong>{children}</strong>;
	}

	if (leaf.code) {
		children = <code>{children}</code>;
	}

	if (leaf.italic) {
		children = <em>{children}</em>;
	}

	if (leaf.underline) {
		children = <u>{children}</u>;
	}

	return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon }) => {
	const editor = useSlate();
	return (
		<Button
			active={isBlockActive(
				editor,
				format,
				TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
			)}
			onMouseDown={(event) => {
				event.preventDefault();
				toggleBlock(editor, format);
			}}
		>
			<Icon>{icon}</Icon>
		</Button>
	);
};

const MarkButton = ({ format, icon }) => {
	const editor = useSlate();
	return (
		<Button
			active={isMarkActive(editor, format)}
			onMouseDown={(event) => {
				event.preventDefault();
				toggleMark(editor, format);
			}}
		>
			<Icon>{icon}</Icon>
		</Button>
	);
};

// const initialValue = [
// 	{
// 		type: 'paragraph',
// 		children: [{ text: '' }],
// 	},
// ];
