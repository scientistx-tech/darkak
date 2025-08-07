'use client';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Input from '../components/Input';
import Button from '../components/Button';
import { Spin, Pagination } from 'antd';
import {
  useCreateSiteMapMutation,
  useDeleteSiteMapMutation,
  useGetSiteMapsQuery,
  useUpdateSiteMapMutation,
} from '@/redux/services/admin/sitemapApi';

export default function PageManager() {
  const [editId, setEditId] = useState<number | null>(null);
  const [pageName, setPageName] = useState('');
  const [pageUrl, setPageUrl] = useState('');
  const [lastMod, setLastMod] = useState('');
  const [changeFreq, setChangeFreq] = useState('weekly');
  const [priority, setPriority] = useState('1');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  const { data, isLoading, refetch } = useGetSiteMapsQuery({ page: currentPage, limit: pageSize });
  const [createSiteMap] = useCreateSiteMapMutation();
  const [updateSiteMap] = useUpdateSiteMapMutation();
  const [deleteSiteMap] = useDeleteSiteMapMutation();

  const resetForm = () => {
    setPageName('');
    setPageUrl('');
    setLastMod('');
    setChangeFreq('weekly');
    setPriority('1');
    setEditId(null);
  };

  const handleSubmit = async () => {
    const payload = {
      title: pageName,
      url: pageUrl,
      date: lastMod || new Date(),
      refresh: changeFreq,
      priority: Number(priority),
    };

    try {
      if (editId) {
        await updateSiteMap({ id: editId, ...payload }).unwrap();
        toast.success('Sitemap updated successfully');
      } else {
        await createSiteMap(payload).unwrap();
        toast.success('Sitemap created successfully');
      }
      refetch();
      resetForm();
    } catch (err: any) {
      toast.error(err?.data?.message || 'Something went wrong');
    }
  };

  const handleEdit = (map: any) => {
    setEditId(map.id);
    setPageName(map.title);
    setPageUrl(map.url);
    setLastMod(map.date?.slice(0, 10));
    setChangeFreq(map.refresh);
    setPriority(map.priority.toString());
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteSiteMap(id).unwrap();
      refetch();
      toast.success('Deleted successfully');
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="w-full">
      {/* Form */}
      <div className="mt-6 w-full rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">
          {editId ? 'Edit' : 'Add'} Sitemap Page
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
          <Input type="date" value={lastMod} onChange={(e) => setLastMod(e.target.value)} />
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
              <option key={i} value={i===10?"1.0":`0.${i}`}>
                {i===10?"1.0":`0.${i}`}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-6">
          <Button onClick={handleSubmit}>{editId ? 'Update' : 'Submit'}</Button>
        </div>
      </div>

      {/* Table */}
      <div className="mt-6 w-full overflow-x-auto rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">Sitemap Page List</h2>
        <Spin spinning={isLoading}>
          {data?.data?.length === 0 ? (
            <p className="text-gray-500">No pages added yet.</p>
          ) : (
            <>
              <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    {['ID', 'Title', 'URL', 'Date', 'Refresh', 'Priority', 'Actions'].map((h) => (
                      <th
                        key={h}
                        className="border border-gray-300 px-4 py-2 text-left text-sm font-medium"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.map((item: any, index: number) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="border px-4 py-2 text-sm">{item.id}</td>
                      <td className="border px-4 py-2 text-sm">{item.title}</td>
                      <td className="border px-4 py-2 text-sm">{item.url}</td>
                      <td className="border px-4 py-2 text-sm">{item.date?.slice(0, 10)}</td>
                      <td className="border px-4 py-2 text-sm">{item.refresh}</td>
                      <td className="border px-4 py-2 text-sm">{item.priority}</td>
                      <td className="border px-4 py-2 text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
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
                  current={currentPage}
                  pageSize={pageSize}
                  total={data?.total || 0}
                  onChange={setCurrentPage}
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
