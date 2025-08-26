'use client';
import React, { useState } from 'react';
import { FaTrash, FaLink, FaEdit } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Page() {
  const [oldUrl, setOldUrl] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [redirects, setRedirects] = useState<{ id: number; oldUrl: string; newUrl: string }[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  const handleAddOrUpdate = () => {
    if (!oldUrl || !newUrl) return;

    if (editId) {
      // Update existing redirection
      setRedirects(
        redirects.map((r) =>
          r.id === editId ? { ...r, oldUrl, newUrl } : r
        )
      );
      setEditId(null);
    } else {
      // Add new redirection
      setRedirects([...redirects, { id: Date.now(), oldUrl, newUrl }]);
    }

    setOldUrl('');
    setNewUrl('');
  };

  const handleDelete = (id: number) => {
    setRedirects(redirects.filter((r) => r.id !== id));
    if (editId === id) {
      setEditId(null);
      setOldUrl('');
      setNewUrl('');
    }
  };

  const handleEdit = (id: number) => {
    const redirection = redirects.find((r) => r.id === id);
    if (redirection) {
      setOldUrl(redirection.oldUrl);
      setNewUrl(redirection.newUrl);
      setEditId(id);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
          Manage Redirection URLs
        </h1>

        {/* Form Section */}
        <div className="mb-8 w-full rounded-2xl bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold text-gray-700">
            {editId ? 'Edit Redirection' : 'Add New Redirection'}
          </h2>
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <input
              type="text"
              placeholder="Old URL"
              value={oldUrl}
              onChange={(e) => setOldUrl(e.target.value)}
              className="w-full rounded-lg border p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 md:w-1/2"
            />
            <input
              type="text"
              placeholder="New URL"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="w-full rounded-lg border p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 md:w-1/2"
            />
            <button
              onClick={handleAddOrUpdate}
              className={`rounded-lg px-6 py-3 font-medium text-white shadow-md transition-all ${
                editId
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700'
                  : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'
              }`}
            >
              {editId ? 'Update' : 'Add'}
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="w-full overflow-hidden rounded-2xl bg-white shadow">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-gray-200 to-gray-300 text-left">
                <th className="px-4 py-3 font-semibold text-gray-700">#</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Old URL</th>
                <th className="px-4 py-3 font-semibold text-gray-700">New URL</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {redirects.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-6 text-center italic text-gray-500">
                    No redirections added yet
                  </td>
                </tr>
              ) : (
                redirects.map((r, index) => (
                  <motion.tr
                    key={r.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="transition-all hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="flex items-center gap-2 px-4 py-3 text-blue-600">
                      <FaLink className="text-gray-500" /> {r.oldUrl}
                    </td>
                    <td className="px-4 py-3 text-green-600">{r.newUrl}</td>
                    <td className="px-4 py-3 text-center flex gap-3 justify-center">
                      <button
                        onClick={() => handleEdit(r.id)}
                        className="flex items-center gap-2 rounded-lg bg-yellow-500 px-4 py-2 text-white shadow transition-all hover:bg-yellow-600"
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white shadow transition-all hover:bg-red-600"
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
