'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useGetMyOrdersQuery, useGetMyReviewsQuery } from '@/redux/services/client/order';
import ClientLoading from '@/app/(root)/components/ClientLoading';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function ReviewHistory() {
  const lang = useSelector((state: RootState) => state.language.language);

  const {
    data: toReviewProducts,
    isLoading,
    isError,
  } = useGetMyOrdersQuery({ page: 1, limit: 10, status: 'pending' });
  const { data } = useGetMyReviewsQuery({
    page: 1,
    limit: 10,
  });
  const [activeTab, setActiveTab] = useState<'toReview' | 'toFollowUp' | 'history'>('toReview');
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <ClientLoading></ClientLoading>
      </div>
    );
  }
  return (
    <div className="mx-auto w-full max-w-5xl rounded-3xl border bg-gradient-to-tr from-[#ffffff80] via-[#ecf3ff90] to-[#ffffff80] p-2 py-4 shadow-2xl backdrop-blur-md md:p-10">
      <h2 className="mb-6 text-center text-2xl font-semibold text-primaryBlue md:mb-12 md:text-4xl">
        {lang === 'bn' ? 'আমার রিভিউ' : 'My Review'}
      </h2>

      {/* Tabs */}
      <div className="mb-8 flex justify-center gap-3 md:gap-0 md:space-x-6">
        {['toReview', 'toFollowUp', 'history'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`rounded-full px-6 py-2 text-sm font-semibold ${
              activeTab === tab ? 'bg-primaryBlue text-white' : 'bg-white text-primaryBlue'
            } shadow-md transition`}
          >
            {tab === 'toReview'
              ? lang === 'bn'
                ? 'রিভিউ বাকি'
                : 'To Review'
              : tab === 'toFollowUp'
                ? lang === 'bn'
                  ? 'অনুসরণ প্রয়োজন'
                  : 'To Follow-Up'
                : lang === 'bn'
                  ? 'ইতিহাস'
                  : 'History'}
          </button>
        ))}
      </div>

      {/* Content based on tab */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {activeTab === 'toReview' &&
          toReviewProducts?.data.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between rounded-2xl bg-white/80 p-6 text-center shadow-md backdrop-blur-md md:flex-col"
            >
              <Image
                src={product.product.thumbnail}
                alt={product.product.title}
                width={100}
                height={100}
                className="mb-4 rounded-lg object-cover"
              />

              <div>
                <h3 className="text-lg font-semibold text-gray-700">{product.product.title}</h3>
                <p className="mt-2 font-bold text-primaryBlue">{product.product.price}</p>
              </div>

              <Link
                href={`/user/review/${product.productId}`} // href={`/review?id=${product.id}`}
                className="mt-4 inline-block rounded-full bg-primaryBlue px-6 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
              >
                Write Review
              </Link>
            </div>
          ))}

        {activeTab === 'toFollowUp' &&
          data?.toReview.data.map((product) => (
            <div
              key={product.id}
              className="flex flex-col items-center rounded-2xl bg-white/80 p-6 text-center shadow-md backdrop-blur-md"
            >
              <Image
                src={product.thumbnail}
                alt={product.title}
                width={100}
                height={100}
                className="mb-4 rounded-lg object-cover"
              />
              <h3 className="text-lg font-semibold text-gray-700">{product.title}</h3>
              <p className="mt-2 font-bold text-primaryBlue">{product.price}</p>
              <p className="mt-2 text-sm text-gray-500">
                {product.short_description || 'No description available.'}
              </p>

              {/* Optional: Show a preview of existing review if available */}
              {product.review && product.review?.length > 0 && (
                <div className="mt-3 text-sm text-gray-600">
                  <p className="font-medium">Saved Review:</p>
                  <p className="mt-1 italic">&quot;{product.review[0].message}&quot;</p>
                </div>
              )}

              <Link
                href={`/user/review/${product.id}`}
                className="mt-4 inline-block rounded-full bg-yellow-500 px-6 py-2 text-sm font-semibold text-white transition hover:bg-yellow-600"
              >
                {product.review?.length ? 'Edit Review' : 'Write Review'}
              </Link>
            </div>
          ))}

        {activeTab === 'history' &&
          data?.history.data.map((product) =>
            product.review?.map((review) => (
              <div
                key={review.id}
                className="flex flex-col items-center rounded-2xl bg-white/80 p-6 text-center shadow-md backdrop-blur-md"
              >
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  width={100}
                  height={100}
                  className="mb-4 rounded-lg object-cover"
                />
                <h3 className="text-lg font-semibold text-gray-700">{product.title}</h3>
                <p className="mt-1 text-sm text-gray-500">Reviewed by: {review.name}</p>
                <p className="mt-1 text-xs text-gray-400">
                  {new Date(review.date).toLocaleDateString()}
                </p>
                <p className="mt-2 font-bold text-primaryBlue">{product.price}</p>
                <div className="mt-2 flex items-center">
                  {Array.from({ length: review.rate }).map((_, idx) => (
                    <span key={idx} className="text-lg text-yellow-400">
                      ★
                    </span>
                  ))}
                  {Array.from({ length: 5 - review.rate }).map((_, idx) => (
                    <span key={idx} className="text-lg text-gray-300">
                      ★
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-sm italic text-gray-500">&quot;{review.message}&quot;</p>

                {review.attachments.images.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {review.attachments.images.map((img, index) => (
                      <Image
                        key={index}
                        src={img}
                        alt={`Review image ${index + 1}`}
                        width={80}
                        height={80}
                        className="rounded object-cover"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
      </div>
    </div>
  );
}
