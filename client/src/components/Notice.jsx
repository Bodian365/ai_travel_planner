function Notice({ message }) {
  return (
    <div className="flex col-span-2 gap-2 border-2 border-orange-300 bg-orange-100 px-4 py-3 rounded-xl font-medium ">
      <span>⚠️</span>
      <p>{message}</p>
    </div>
  );
}

export default Notice;
