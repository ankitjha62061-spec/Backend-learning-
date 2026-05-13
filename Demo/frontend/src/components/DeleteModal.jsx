function DeleteModal({
  deletePopup,
  setDeletePopup,
  deleteUser,
}) {

  if (!deletePopup) return null;

  return (

    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center">

      <div className="bg-white w-80 p-6 rounded-2xl shadow-2xl">

        <h2 className="text-2xl font-bold mb-3 text-center">
          Delete User
        </h2>

        <p className="text-gray-600 text-center mb-6">
          Are you sure you want to delete this user?
        </p>

        <div className="flex justify-center gap-4">

          <button
            onClick={() =>
              setDeletePopup(false)
            }
            className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={deleteUser}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteModal;