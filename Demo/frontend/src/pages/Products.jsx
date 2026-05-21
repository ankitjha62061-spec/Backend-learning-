import { useState } from "react";

function Products() {

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Laptop",
      price: 50000,
    },
    {
      id: 2,
      name: "Phone",
      price: 20000,
    },
  ]);

  const deleteProduct = (id) => {

    const filtered = products.filter(
      (item) => item.id !== id
    );

    setProducts(filtered);

  };

  return (

    <div>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Products
        </h1>

        <button className="bg-black text-white px-4 py-2 rounded-lg">

          Add Product

        </button>

      </div>

      <div className="bg-white shadow-lg rounded-xl p-5 overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="p-3 text-left">
                Name
              </th>

              <th className="p-3 text-left">
                Price
              </th>

              <th className="p-3 text-left">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {products.map((item) => (

              <tr
                key={item.id}
                className="border-b"
              >

                <td className="p-3">
                  {item.name}
                </td>

                <td className="p-3">
                  ₹{item.price}
                </td>

                <td className="p-3">

                  <button
                    onClick={() =>
                      deleteProduct(item.id)
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Products;