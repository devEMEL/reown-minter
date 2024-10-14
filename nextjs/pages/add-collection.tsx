import { FileObject } from 'pinata';
import React, { useState } from 'react';

const AddCollection = () => {
    const [name, setName] = useState<string>('');
    const [symbol, setSymbol] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [imageFile, setImageFile] = useState<FileObject>(new File([], ''));
    const [imagePreview, setImagePreview] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [totalSupply, setTotalSupply] = useState<string>('');

    const addProduct = () => {};
    return (
        <div>
            <div className="max-w-3xl mx-auto border border-white px-8 py-8 rounded-lg">
                {/* Form with input fields for the product, that triggers the addProduct function on submit */}
                <form onSubmit={addProduct}>
                    <div className="flex items-center justify-center min-height-100vh text-center sm:block sm:p-0">
                        {/* Input fields for the product */}
                        <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <p className="text-center py-4 text-2xl">
                                Create NFT Collection
                            </p>
                            <label>Name</label>
                            <input
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                                value={name}
                                required
                                type="text"
                                className="w-full p-2 mt-4 mb-10 bg-transparent focus:outline-none border-b border-[#ffffff]"
                            />

                            <label>Symbol</label>
                            <input
                                onChange={(e) => {
                                    setSymbol(e.target.value);
                                }}
                                value={symbol}
                                required
                                type="text"
                                className="w-full p-2 mt-4 mb-10 bg-transparent focus:outline-none border-b border-[#ffffff]"
                            />


<label>Description</label>
                            <input
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                                value={description}
                                required
                                type="text"
                                className="w-full p-2 mt-4 mb-10 bg-transparent focus:outline-none border-b border-[#ffffff]"
                            />

                            <label className="relative">
                                NFT Image
                                <input
                                    onChange={async (e) => {
                                        const file = e.target.files ?  e.target.files[0] : null;
                                        if (file) {
                                            setImageFile(file);
                                            const reader = new FileReader();
                                            console.log('hi');
                                            reader.onloadend = () => {
                                                setImagePreview(reader.result);

                                                console.log(reader.result);
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                    required
                                    type="file"
                                    accept="image/*"
                                    className="w-full p-2 mt-4 mb-10 bg-transparent focus:outline-none border-b border-[#ffffff]"
                                />
                                {imagePreview && (
                                    <div className="flex justify-center">
                                        <img
                                            src={imagePreview}
                                            alt="image preview"
                                            className="w-1/2 bg-black mb-10"
                                        />
                                    </div>
                                )}
                            </label>
                            <label>
                                Price (In ETH, input 0 if its a free collection)
                            </label>
                            <input
                                onChange={(e) => {
                                    setPrice(e.target.value);
                                }}
                                value={price}
                                required
                                type="text"
                                className="w-full p-2 mt-4 mb-10 bg-transparent focus:outline-none border-b border-[#ffffff]"
                            />
                            <label>Total Supply</label>
                            <input
                                onChange={(e) => {
                                    setTotalSupply(e.target.value);
                                }}
                                value={totalSupply}
                                required
                                type="text"
                                className="w-full p-2 mt-4 mb-10 bg-transparent focus:outline-none border-b border-[#ffffff]"
                            />
                        </div>
                        {/* Button to close the modal */}
                        <div className="bg-transparent px-4 py-3 text-right">
                            <button
                                type="button"
                                className="py-2 px-4 text-[#000000] bg-white rounded mr-2"
                                onClick={() => {
                                    // setVisible(false);
                                    // clearForm();
                                    // just take you back to the home page
                                }}
                            >
                                <i className="fas fa-times"></i> Cancel
                            </button>
                            {/* Button to add the product to the marketplace */}
                            <button
                                type="submit"
                                //   disabled={!!loading || !isComplete || !createProduct}
                                className="py-2 px-4 text-[#ffffff] rounded bg-blue-700 mr-2"
                            >
                                {/* {loading ? loading : "Create"} */}
                                Create
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCollection;
