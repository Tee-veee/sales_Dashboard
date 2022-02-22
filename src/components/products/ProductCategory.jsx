import { MdAdd } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { useContext } from "react";
import CategoryContext from "../../context/CategoryContext";

function ProductCategory() {
  const {
    showProductTooltip,
    setShowProductTooltip,
    showProductInput,
    setShowProductInput,
    productCategoryData,
    setProductCategoryData,
    createProductCategory,
  } = useContext(CategoryContext);

  const handleClick = () => {
    setShowProductInput(!showProductInput);
    setShowProductTooltip(false);
  };
  return (
    <div className="w-full flex justify-end ">
      {!showProductInput && (
        <>
          <div
            className="p-1 bg-green-400 rounded-lg hover:scale-95 hover:transition-all cursor-pointer"
            onMouseEnter={() => setShowProductTooltip(true)}
            onMouseLeave={() => setShowProductTooltip(false)}
            onClick={() => handleClick()}
          >
            <MdAdd className="text-3xl" />
          </div>
          {showProductTooltip && (
            <div className="relative ">
              <h1 className="bg-stone-600 text-white text-center p-2 round-lg absolute z-10 w-[120px] bottom-0 right-12 ">
                New Category
              </h1>
            </div>
          )}
        </>
      )}
      {showProductInput && (
        <>
          <div className="w-full  flex flex-col  ">
            <div className=" flex justify-end w-full ">
              <div
                className="p-1 rounded-lg hover:scale-95 hover:transition-all cursor-pointer bg-red-500"
                onMouseEnter={() => setShowProductTooltip(true)}
                onMouseLeave={() => setShowProductTooltip(false)}
                onClick={() => handleClick()}
              >
                <AiOutlineClose className="text-3xl" />
              </div>
            </div>
            <label htmlFor="newCategory" className="text-sm">
              New Category
            </label>
            <input
              type="text"
              name="newCategory"
              className="text-lg border-2 border-stone-500 p-1 outline-none focus:shadow-lg focus:transition-all"
              onChange={(e) => setProductCategoryData(e.target.value)}
            />

            <button
              className="px-4 py-2 mt-6 border-2 rounded-lg bg-green-400 text-stone-800 flex items-center space-x-2 hover:scale-95 hover:transition-all w-full justify-center"
              onClick={() => createProductCategory(productCategoryData)}
            >
              <h1>Create Category</h1>
            </button>
          </div>
          {showProductTooltip && (
            <div className="relative ">
              <h1 className="bg-stone-600 text-white text-center p-2 round-lg absolute z-10 w-[120px] bottom-15 right-12 ">
                Cancel
              </h1>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ProductCategory;
