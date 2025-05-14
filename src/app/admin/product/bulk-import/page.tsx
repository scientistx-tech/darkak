export default function BulkImport() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="">
        <h1 className="mb-4 flex items-center gap-2 text-2xl font-bold">
          <span className="text-yellow-600">📋</span> Bulk Import
        </h1>

        {/* Instructions */}
        <div className="mb-6 rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold">Instructions :</h2>
          <ol className="list-decimal space-y-2 pl-6 text-gray-700">
            <li>Download the format file and fill it with proper data.</li>
            <li>
              You can download the example file to understand how the data must
              be filled.
            </li>
            <li>
              Once you have downloaded and filled the format file, Upload it in
              the form below and submit.
            </li>
            <li>
              After uploading products you need to edit them and set product
              images and choices.
            </li>
            <li>
              You can get brand and category id from their list please input the
              right ids.
            </li>
            <li>
              You can upload your product images in product folder from gallery
              and copy image path.
            </li>
          </ol>
        </div>

        {/* Upload Section */}
        <div className="rounded-xl bg-white p-6 shadow">
          <div className="mb-6 text-center">
            <span className="font-medium text-gray-700">
              Do not have the template ?{" "}
            </span>
            <a href="#" className="font-medium text-blue-600">
              Download here
            </a>
          </div>

          <div className="mb-6 flex justify-center">
            <div className="w-80 cursor-pointer rounded-lg border-2 border-dashed border-blue-400 p-10 text-center text-blue-600">
              Drag & drop file or browse file
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button className="rounded-lg bg-gray-200 px-4 py-2 text-black">
              Reset
            </button>
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-white">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
