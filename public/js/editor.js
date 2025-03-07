tinymce.init({
    selector: "#content",
    skin: "oxide-dark",
    content_css: "dark",
    height: 400,
    plugins: [
      "advlist",
      "autolink",
      "link",
      "image",
      "lists",
      "charmap",
      "anchor",
      "pagebreak",
      "searchreplace",
      "wordcount",
      "visualblocks",
      "code",
      "fullscreen",
      "insertdatetime",
      "media",
      "table",
      "emoticons",
      "template",
      "codesample",
    ],
    toolbar:
      "undo redo | styles | bold italic underline | alignleft aligncenter alignright alignjustify |" +
      "bullist numlist outdent indent | link image | print media fullscreen | " +
      "forecolor backcolor emoticons",
    menu: {
      favs: {
        title: "menu",
        items: "code visualaid | searchreplace | emoticons",
      },
    },
    menubar: "favs file edit view insert format tools table",
    content_style: "body{font-family:Helvetica,Arial,sans-serif; font-size:16px}",
  });
  