import { ReviewCard } from './ReviewCard';

const dummyReviews = [
  {
    name: 'Mahadi Hassan',
    date: '24/04/2025',
    productName: 'MacBook 16pro',
    rating: 5,
    comment:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s...',
    images: [
      'https://images.unsplash.com/photo-1585909695284-32d2985ac9c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmV2aWV3fGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1552581234-26160f608093?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHJldmlld3xlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJldmlld3xlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1584091377118-79bcb017e125?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHJldmlld3xlbnwwfHwwfHx8MA%3D%3D',
    ],
  },
  {
    name: 'Mahadi Hassan',
    date: '24/04/2025',
    productName: 'MacBook 16pro',
    rating: 5,
    comment:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry...',
    images:  [
      'https://images.unsplash.com/photo-1585909695284-32d2985ac9c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmV2aWV3fGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1552581234-26160f608093?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHJldmlld3xlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJldmlld3xlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1584091377118-79bcb017e125?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHJldmlld3xlbnwwfHwwfHx8MA%3D%3D',
    ],
  },
];

export const CustomerReviews = () => {
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-primaryBlue mb-4">
        Customers’ Review
      </h2>
      {dummyReviews.map((review, i) => (
        <ReviewCard key={i} review={review} />
      ))}
    </div>
  );
};
