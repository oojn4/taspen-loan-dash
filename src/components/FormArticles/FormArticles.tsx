import { FileInput, Select, TextInput } from '@mantine/core';
import { Link, RichTextEditor } from '@mantine/tiptap';
import Highlight from '@tiptap/extension-highlight';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useState } from 'react';
import { MasterService } from "../../lib/services/master.service";
import { showErrorFetching } from '../../utils/errorFetching';
import PillInput from '../PillsInput/PillsInput';
const contents = '';

type Props = {
  dataArticles: ClientInputArticle;
  handleChange: Function;
};

export function FormArticles({ dataArticles, handleChange }: Props) {
  const [editorContent, setEditorContent] = useState('');
  const [articleCategories, setArticleCategories] = useState<any[]>([]);


  useEffect(() => {
    console.log(dataArticles)
    if (dataArticles && dataArticles.contents) {
      setEditorContent(dataArticles.contents);
    }
  }, [dataArticles]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      Subscript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: editorContent,
    onUpdate: ({ editor }) => {
      const contents = editor.getHTML();
      dataArticles.contents = contents;
    },
  });

  useEffect(() => {
    if (editor && dataArticles.contents !== editorContent) {
      editor.commands.setContent(dataArticles.contents);
      setEditorContent(dataArticles.contents);
    }
  }, [dataArticles, editor, editorContent]);
  
  useEffect(() => { 
    handleFetchArticleCategories()
   }, []);
  const handleFetchArticleCategories = async () => {
    try {
      let arrayArticleCategories: any[] = [];
      const response = await MasterService.fetchArticleCategory();
      response.data.map((dt: any) => {
        arrayArticleCategories.push({ ...dt, value: dt.id,label: dt.name});
      });
      setArticleCategories(arrayArticleCategories);
    } catch (error) {
      return showErrorFetching(error);
    }
  };
  return (
    <>
      <TextInput
      label="Judul"
        placeholder="Masukan Judul"
        value={dataArticles.title}
        onChange={(e) => handleChange('title', e.target.value)}
      />

      {/* Dropdown for Category */}
      <Select
        label="Kategori"
        placeholder="Pilih kategori"
        data={articleCategories}
        value={dataArticles.article_category_id}
        onChange={(value) => {
          handleChange('article_category_id', value);
        }}
        required
      /> 
      {/* Image Input */}
      <FileInput
        label="Unggah Gambar"
        placeholder="Pilih gambar"
        accept="image/png,image/jpeg" 
        value={dataArticles.cover_image} // Ensure this is a File object
        onChange={(file) => {
          if (file instanceof File) {
            handleChange('cover_image', file);
          }
        }}
      />
      
    <PillInput 
      tags={dataArticles.tags} 
      setTags={(tags:string[]) => {
          handleChange('tags', tags);
        }} />



      {/* Rich Text Editor */}
      <br />
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>
        <RichTextEditor.Content />
      </RichTextEditor>
      <br />
    </>
  );
}
