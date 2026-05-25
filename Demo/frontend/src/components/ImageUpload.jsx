import { useState } from "react";

function ImageUpload({ setImage }) {
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="mb-4">
      <input type="file" onChange={handleChange} />

      {preview && (
        <img
          src={preview}
          alt="preview"
          className="w-20 h-20 mt-2 rounded"
        />
      )}
    </div>
  );
}

export default ImageUpload;