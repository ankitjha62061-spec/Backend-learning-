import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function CartPage() {

  const [cart, setCart] = useState([]);

  const fetchCart = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:3000/api/cart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCart(res.data.cart);

    } catch (error) {

      console.log(error);

    }
  };

  const handleRemove = async (cartItemId) => {

    try {

      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:3000/api/cart/${cartItemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Item removed");
      fetchCart();

    } catch (error) {

      console.log(error);
      toast.error("Failed to remove item");

    }
  };

  useEffect(() => {

    fetchCart();

  }, []);

  return (

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Cart Page
      </h1>

      {
        cart.length === 0 ? (

          <p>
            Cart is empty
          </p>

        ) : (

          cart.map((item) => (

            <div
              key={item._id}
              className="border p-4 mb-4 rounded-lg flex gap-4 items-center"
            >

              <img
                src={`http://localhost:3000/uploads/${item.productId.image}`}
                alt=""
                className="w-24 h-24 object-cover rounded"
              />

              <div>

                <h2 className="text-xl font-bold">
                  {item.productId.name}
                </h2>

                <p>
                  Rs.{item.productId.price}
                </p>

                <p>
                  Quantity: {item.quantity}
                </p>

              </div>  

              <button
                onClick={() => handleRemove(item._id)}
                className="ml-auto bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>

            </div>
          ))
        )
      }

    </div>
  );
}

export default CartPage;