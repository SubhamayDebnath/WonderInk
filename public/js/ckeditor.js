import {
    ClassicEditor,
    Essentials,
    Autoformat,
    Heading,
    Bold,
    Italic,
    Font,
    Paragraph,
    CodeBlock,
    Strikethrough,
    Subscript,
    Superscript,
    Underline,
    BlockQuote,
    FindAndReplace,
    Highlight,
    HorizontalLine,
    Image,
    ImageInsert,
    ImageResizeEditing,
    ImageResizeHandles,
    ImageResize,
    ImageToolbar,
    ImageCaption,
    ImageStyle,
    LinkImage,
    AutoLink,
    Link,
    List,
    MediaEmbed,
    PageBreak,
    RemoveFormat,
    ShowBlocks,
    SourceEditing,
    Table,
    TableColumnResize,
    Alignment,
    TextTransformation,
  } from "ckeditor5";
  
  ClassicEditor.create(document.querySelector("#editor"), {
    plugins: [
      Essentials,
      Autoformat,
      Bold,
      Italic,
      Heading,
      Font,
      Paragraph,
      CodeBlock,
      Strikethrough,
      Subscript,
      Superscript,
      Underline,
      BlockQuote,
      FindAndReplace,
      Highlight,
      HorizontalLine,
      Image,
      ImageInsert,
      ImageResizeEditing,
      ImageResizeHandles,
      ImageResize,
      ImageToolbar,
      ImageCaption,
      ImageStyle,
      LinkImage,
      AutoLink,
      Link,
      List,
      MediaEmbed,
      PageBreak,
      RemoveFormat,
      ShowBlocks,
      SourceEditing,
      Table,
      TableColumnResize,
      Alignment,
      TextTransformation,
    ],
    placeholder: "Type the content here!",
    toolbar: [
      "showBlocks",
      "sourceEditing",
      "|",
      "undo",
      "redo",
      "|",
      "bold",
      "italic",
      "|",
      "heading",
      "alignment",
      "fontSize",
      "fontFamily",
      "fontColor",
      "fontBackgroundColor",
      "highlight",
      "link",
      "codeBlock",
      "underline",
      "strikethrough",
      "subscript",
      "superscript",
      "blockQuote",
      "horizontalLine",
      "pageBreak",
      "|",
      "insertImage",
      "mediaEmbed",
      "|",
      "findAndReplace",
      "bulletedList",
      "numberedList",
      "removeFormat",
      "insertTable",
    ],
  
    image: {
      toolbar: [
        "imageStyle:block",
        "imageStyle:side",
        "|",
        "toggleImageCaption",
        "imageTextAlternative",
        "|",
        "linkImage",
      ],
      insert: {
        type: "auto",
      },
    },
    codeBlock: {
      languages: [
        { language: "plaintext", label: "Plain text" },
        { language: "cs", label: "C#" },
        { language: "cpp", label: "C++" },
        { language: "css", label: "CSS" },
        { language: "diff", label: "Diff" },
        { language: "html", label: "HTML" },
        { language: "java", label: "Java" },
        { language: "javascript", label: "JavaScript" },
        { language: "php", label: "PHP" },
        { language: "python", label: "Python" },
        { language: "ruby", label: "Ruby" },
        { language: "typescript", label: "TypeScript" },
        { language: "xml", label: "XML" },
      ],
    },
    table: {
      contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
    },
  })
  .then((editor) => {
      window.editor = editor;
      
      document.querySelector('#postForm').addEventListener('submit',(e)=>{
          e.preventDefault();
          const content=editor.getData();
          const contentInput = document.querySelector("#content");
          contentInput.value=content; 
          e.target.submit();
      })
     
    })
    .catch((error) => {
      console.error("Error initializing editor:", error);
    });
    
  