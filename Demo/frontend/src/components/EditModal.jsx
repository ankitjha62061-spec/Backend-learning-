function EditModal({
  isOpen,
  setIsOpen,
  editName,
  setEditName,
  editEmail,
  setEditEmail,
  updateUser,
}) {

  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center">

      <div className="bg-white p-6 rounded-xl w-96 shadow-xl">

        <h2 className="text-2xl font-bold mb-4">
          Edit User
        </h2>

        <input
          type="text"
          value={editName}
          onChange={(e) =>
            setEditName(e.target.value)
          }
          placeholder="Enter name"
          className="w-full border p-3 rounded-lg mb-4 outline-none"
        />

        <input
          type="email"
          value={editEmail}
          onChange={(e) =>
            setEditEmail(e.target.value)
          }
          placeholder="Enter email"
          className="w-full border p-3 rounded-lg mb-4 outline-none"
        />

        <div className="flex justify-end gap-4">

          <button
            onClick={() =>
              setIsOpen(false)
            }
            className="bg-gray-400 text-white px-4 py-2 rounded-lg"
          >
            Cancel
          </button>


{/* 

          <button
            onClick={updateUser}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Update
          </button> */}


<button
  onClick={updateUser} disabled={!editName || !editEmail}
  className={`text-white px-4 py-2 rounded-lg ${
    !editName || !editEmail
      ? "bg-blue-300 cursor-not-allowed"
      : "bg-blue-500 hover:bg-blue-600"
  }`}
>
  Update
</button>



          

        </div>

      </div>

    </div>
  );
}

export default EditModal;