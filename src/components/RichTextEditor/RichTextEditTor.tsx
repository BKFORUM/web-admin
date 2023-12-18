import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './styles.css'

interface IProp {
  editorState: EditorState
  onEditorStateChange: (editorState: EditorState) => void
  error: any
}

const RichTextEditTor = ({ editorState, onEditorStateChange, error }: IProp) => {
  return (
    <>
      <Editor
        toolbarClassName='demo-toolbar-absolute'
        wrapperClassName='demo-wrapper'
        editorClassName={`demo-editor rounded-md  ${
          !!error && 'border border-red-500'
        } px-2 bg-[#E6F0F6] min-h-[150px]`}
        // toolbarHidden
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        placeholder='Viết bài tại đây ...'
        toolbar={{
          options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign'],
          inline: { options: ['bold', 'italic', 'underline'], inDropdown: true },
          list: {
            options: ['unordered', 'indent', 'outdent'],
            inDropdown: true,
          },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
        }}
        mention={{
          separator: ' ',
          trigger: '@',
          suggestions: [
            { text: 'APPLE', value: 'apple', url: 'apple' },
            { text: 'BANANA', value: 'banana', url: 'banana' },
            { text: 'CHERRY', value: 'cherry', url: 'cherry' },
            { text: 'DURIAN', value: 'durian', url: 'durian' },
            { text: 'FIG', value: 'fig', url: 'fig' },
            { text: 'GRAPEFRUIT', value: 'grapefruit', url: 'grapefruit' },
            { text: 'HONEYDEW', value: 'honeydew', url: 'honeydew' },
          ],
        }}
        hashtag={{}}
      />
      {!!error && <span className='text-sm text-red-600'>{error?.message}</span>}
    </>
  )
}

export default RichTextEditTor
