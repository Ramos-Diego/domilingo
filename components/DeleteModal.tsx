export default function DeleteModal() {
  return (
    <>
      <button
        tabIndex={-1}
        // onClick={() => setDeleteAlert(false)}
        className="fixed w-full h-full inset-0 bg-black opacity-50"
      ></button>
      <div className="fixed flex justify-center inset-x-1/2 bg-white top-10">
        <div className="bg-green-900 px-4 py-2 rounded w-30">Create modal!</div>
      </div>
    </>
  )
}
