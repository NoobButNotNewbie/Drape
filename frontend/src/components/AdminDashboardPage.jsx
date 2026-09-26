import React from 'react';
import { newArrivals, curatedOutfits } from '../data/mockData';

export default function AdminDashboardPage() {
  const revenue = newArrivals.reduce((sum, product) => sum + product.price, 0) * 8;
  const orders = [
    { id: '#104821', customer: 'Huy', total: '$210.00', status: 'Paid' },
    { id: '#104822', customer: 'Nam', total: '$185.00', status: 'Processing' },
    { id: '#104823', customer: 'Minh', total: '$295.00', status: 'Shipped' },
    { id: '#104824', customer: 'Khoa', total: '$160.00', status: 'Paid' },
  ];

  const metricCards = [
    { label: 'Gross Revenue', value: `$${revenue.toLocaleString()}`, accent: 'bg-emerald-50 text-emerald-700' },
    { label: 'Live Products', value: `${newArrivals.length}`, accent: 'bg-blue-50 text-blue-700' },
    { label: 'Approved Outfits', value: `${curatedOutfits.length}`, accent: 'bg-violet-50 text-violet-700' },
    { label: 'Orders', value: `${orders.length}`, accent: 'bg-amber-50 text-amber-700' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#7D7A73]">Admin overview</p>
          <h1 className="mt-2 text-3xl font-bold text-[#151816]">Drape Operations</h1>
        </div>
        <div className="rounded-full border border-[#D9D4CC] bg-white px-3 py-1.5 text-xs font-medium text-[#1A3C24]">
          Connected to demo data
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {metricCards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-[#EAE6DF] bg-white p-5 shadow-sm">
            <div className={`inline-flex rounded-xl px-2.5 py-1.5 text-xs font-semibold ${card.accent}`}>
              {card.label}
            </div>
            <div className="mt-4 text-3xl font-bold text-[#151816]">{card.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 xl:grid-cols-[1.6fr_1fr] gap-5">
        <div className="rounded-2xl border border-[#EAE6DF] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-[#F0EEE9]">
            <div>
              <h2 className="text-lg font-bold text-[#151816]">Recent Orders</h2>
              <p className="text-xs text-[#7D7A73]">Latest purchase activity</p>
            </div>
            <button className="rounded-full bg-[#183B22] px-3 py-1.5 text-xs font-semibold text-white">View all</button>
          </div>

          <div className="mt-4 overflow-hidden rounded-xl border border-[#EEE9E2]">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-[#F7F4F0] text-[#5F5B55]">
                <tr>
                  <th className="px-4 py-3 font-medium">Order</th>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Total</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-t border-[#F0EEE9]">
                    <td className="px-4 py-3 font-semibold text-[#151816]">{order.id}</td>
                    <td className="px-4 py-3 text-[#4A4743]">{order.customer}</td>
                    <td className="px-4 py-3 text-[#151816] font-medium">{order.total}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-full px-2 py-1 text-[11px] font-semibold ${
                        order.status === 'Paid'
                          ? 'bg-emerald-100 text-emerald-700'
                          : order.status === 'Processing'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-blue-100 text-blue-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-[#EAE6DF] bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-[#151816]">Top catalog</h2>
          <div className="mt-4 space-y-3">
            {newArrivals.slice(0, 3).map((product) => (
              <div key={product.id} className="flex items-center gap-3 rounded-xl border border-[#F0EEE9] p-2.5">
                <img src={product.image} alt={product.name} className="h-14 w-12 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[#151816]">{product.name}</p>
                  <p className="text-xs text-[#706C64]">{product.fit}</p>
                </div>
                <span className="text-sm font-semibold text-[#183B22]">{product.formattedPrice}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
