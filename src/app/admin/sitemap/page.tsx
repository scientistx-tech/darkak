'use client';
import React, { useState, useRef } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { Spin, Pagination } from 'antd';

export default function PageManager() {
  const [pages, setPages] = useState<any[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [pageName, setPageName] = useState('');
  const [pageUrl, setPageUrl] = useState('');
  const [lastMod, setLastMod] = useState('');
  const [changeFreq, setChangeFreq] = useState('weekly');
  const [priority, setPriority] = useState('5');
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = () => {
    setPageName('');
    setPageUrl('');
    setLastMod('');
    setChangeFreq('weekly');
    setPriority('5');
    setEditIndex(null);
  };

  const handleSubmit = () => {
    const newPage = {
      name: pageName,
      url: pageUrl,
      lastmod: lastMod,
      changefreq: changeFreq,
      priority: priority,
    };

    const updatedPages = [...pages];
    if (editIndex !== null) {
      updatedPages[editIndex] = newPage;
    } else {
      updatedPages.push(newPage);
    }
    setPages(updatedPages);
    resetForm();
  };

  const handleEdit = (index: number) => {
    const page = pages[index];
    setPageName(page.name);
    setPageUrl(page.url);
    setLastMod(page.lastmod);
    setChangeFreq(page.changefreq);
    setPriority(page.priority);
    setEditIndex(index);
  };

  const handleDelete = (index: number) => {
    const updatedPages = [...pages];
    updatedPages.splice(index, 1);
    setPages(updatedPages);
  };

  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 20;

  const paginatedPages = pages.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page - 1);
  };

  return (
    <div className="w-full">
      {/* Form */}
      <div className="mt-6 w-full rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">
          {editIndex !== null ? 'Edit' : 'Add'} Sitemap Page
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            placeholder="Page Name"
            value={pageName}
            onChange={(e) => setPageName(e.target.value)}
          />
          <Input
            placeholder="Page URL"
            value={pageUrl}
            onChange={(e) => setPageUrl(e.target.value)}
          />
          <Input
            type="date"
            placeholder="Last Modified Date"
            value={lastMod}
            onChange={(e) => setLastMod(e.target.value)}
          />

          <select
            className="w-full rounded border p-2"
            value={changeFreq}
            onChange={(e) => setChangeFreq(e.target.value)}
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>

          <select
            className="w-full rounded border p-2"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            {Array.from({ length: 11 }, (_, i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6">
          <Button onClick={handleSubmit}>{editIndex !== null ? 'Update' : 'Submit'}</Button>
        </div>
      </div>

      {/* List */}
      <div className="mt-6 w-full overflow-x-auto rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">Sitemap Page List</h2>
        <Spin spinning={isLoading}>
          {pages.length === 0 ? (
            <p className="text-gray-500">No pages added yet.</p>
          ) : (
            <>
              <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium">
                      ID
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium">
                      Page Name
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium">
                      URL
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium">
                      Last Modified
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium">
                      Changefreq
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium">
                      Priority
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedPages.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 text-sm">
                        {currentPage * pageSize + index + 1}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">{item.name}</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">{item.url}</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">{item.lastmod}</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">
                        {item.changefreq}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">{item.priority}</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(currentPage * pageSize + index)}
                            className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(currentPage * pageSize + index)}
                            className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-4 flex justify-end">
                <Pagination
                  current={currentPage + 1}
                  pageSize={pageSize}
                  total={pages.length}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                />
              </div>
            </>
          )}
        </Spin>
      </div>
    </div>
  );
}
