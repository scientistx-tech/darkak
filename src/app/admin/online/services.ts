import { cookies } from 'next/headers';
import { PaymentListResponse } from './types';

export async function getPaymentList(params: string) {
  const token = (await cookies()).get('token')?.value;
  const res = await fetch(`https://api.darkak.com.bd/api/admin/order/payment-list?${params}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store', // ✅ disables cache (Next.js fetch option)
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch payments: ${res.statusText}`);
  }

  const data: PaymentListResponse = await res.json();
  return data;
}
