import { useState, useEffect } from "react";

function ProductModal({ open, onClose, onSave, editData }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (editData) {
      setName(editData.name || "");
      setPrice(editData.price || "");
      setImage(null);
    } else {
      setName("");
      setPrice("");
      setImage(null);
    }
  }, [editData, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">

      <div className="bg-white/90 backdrop-blur-md p-6 rounded-xl w-[320px] shadow-xl">

        <h2 className="text-xl font-bold mb-4 text-center">
          {editData ? "Update Product" : "Add Product"}
        </h2>

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          min="0"
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
        />

      
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="border p-2 w-full mb-4 rounded"
        />

        <div className="flex justify-between">

          <button
            onClick={onClose}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={() => onSave({ name, price, image })}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            {editData ? "Update" : "Save"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default ProductModal;