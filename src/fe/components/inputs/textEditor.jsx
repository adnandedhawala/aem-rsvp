import clsx from "clsx";
import dynamic from "next/dynamic";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>
});

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "code",
  "image"
];

const modules = {
  toolbar: [
    [{ header: [2, 3, 4, 5, false] }],
    ["bold", "italic", "underline"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" }
    ],
    ["link"]
  ]
};

export const TextEditor = ({ value, placeholder, onChange }) => {
  return (
    <QuillNoSSRWrapper
      theme="snow"
      value={value || ""}
      modules={modules}
      formats={formats}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export const RichText = ({ value, className }) => {
  return (
    <div
      className={clsx("richText", className)}
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
};
