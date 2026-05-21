import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ProductModal from "../components/ProductModal";

function Products() {

  const [products, setProducts] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  const [editData, setEditData] = useState(null);

  const [deleteModal, setDeleteModal] = useState(false);

  const [deleteId, setDeleteId] = useState(null);
  const [page, setPage] = useState(1);

  const productsPerPage = 5;

  const lastProductIndex = page * productsPerPage;

  const firstProductIndex = lastProductIndex - productsPerPage;

  const currentProducts = products.slice(firstProductIndex,lastProductIndex);

  const totalPages = Math.ceil(
    products.length / productsPerPage
  );

  const fetchProducts = async () => {

    try {

      const res = await axios.get(
        "http://localhost:3000/api/products"
      );

      setProducts(res.data.products);

    } catch (error) {

      toast.error("Failed to fetch products");

    }
  };

  useEffect(() => {

    fetchProducts();

  }, []);

  const openAddModal = () => {

    setEditData(null);

    setOpenModal(true);

  };

  const handleEdit = (item) => {

    setEditData(item);

    setOpenModal(true);

  };

  const handleSave = async (data) => {

    try {

      if (!data.name || !data.price) {

        toast.warning("Please fill all fields");

        return;

      }

      if (editData) {

        await axios.put(
          `http://localhost:3000/api/products/${editData._id}`,
          data
        );

        toast.success("Product updated");

      } else {

        await axios.post(
          "http://localhost:3000/api/products",
          data
        );

        toast.success("Product added");

      }

      setOpenModal(false);

      setEditData(null);

      fetchProducts();

    } catch (error) {

      toast.error("Something went wrong");

    }
  };

  const openDeleteModal = (id) => {

    setDeleteId(id);

    setDeleteModal(true);

  };

  const confirmDelete = async () => {

    try {

      await axios.delete(
        `http://localhost:3000/api/products/${deleteId}`
      );

      toast.success("Product deleted");

      setDeleteModal(false);

      setDeleteId(null);

      fetchProducts();

    } catch (error) {

      toast.error("Delete failed");

    }
  };

  return (

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Products Page
      </h1>

      <button
        onClick={openAddModal}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        + Add Product
      </button>

   
      <div className="bg-white shadow-md rounded-lg overflow-hidden">

        <table className="w-full border-collapse">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">
                Product
              </th>

              <th className="p-4 text-left">
                Price
              </th>

              <th className="p-4 text-left">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {currentProducts.length === 0 ? (

              <tr>

                <td
                  colSpan="3"
                  className="p-4 text-gray-500 text-center"
                >
                  No products found
                </td>

              </tr>

            ) : (

              currentProducts.map((item) => (

                <tr
                  key={item._id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-4">
                    {item.name}
                  </td>

                  <td className="p-4">
                    ₹{item.price}
                  </td>

                  <td className="p-4 flex gap-4">

                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        openDeleteModal(item._id)
                      }
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))
            )}

          </tbody>

        </table>

      </div>

     
      <div className="flex justify-center items-center gap-4 mt-6">


        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className={`px-4 py-2 rounded-lg ${
            page === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-black text-white"
          }`}
        >
          Prev
        </button>

        <p className="font-semibold">
          Page {page} of {totalPages}
        </p>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded-lg ${
            page === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-black text-white"
          }`}
        >
          Next
        </button>

      </div>

    
      <ProductModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleSave}
        editData={editData}
      />

    
      {deleteModal && (

        <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">

          <div className="bg-white p-6 rounded-xl w-[300px] shadow-xl text-center">

            <h2 className="text-lg font-bold mb-3">
              Delete Product?
            </h2>

            <p className="text-gray-600 mb-5">
              Are you sure to delete
            </p>

            <div className="flex justify-between">

              <button
                onClick={() =>
                  setDeleteModal(false)
                }
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default Products;