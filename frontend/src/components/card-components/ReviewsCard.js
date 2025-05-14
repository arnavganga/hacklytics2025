import React from 'react';
import { Star, MessageCircle } from 'lucide-react';

const ReviewsCard = () => {
  // Sample reviews data
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 1,
      date: "2 days ago",
      comment: "Excellent doctor! Very thorough and professional in the examination."
    },
    {
      id: 2,
      name: "Michael Brown",
      rating: 5,
      date: "1 week ago",
      comment: "Great experience. Dr. Parker took time to explain everything clearly."
    }
  ];

  return (
    <>
     {/* Reviews Section */}
     <div className="bg-gray-50 p-6">
     <div className="flex items-center justify-between mb-4">
       <h3 className="text-lg font-semibold text-gray-900">Patient Reviews</h3>
       <div className="flex items-center space-x-2">
         <div className="flex items-center">
           {[1, 2, 3, 4, 5].map((star) => (
             <Star
               key={star}
               className="w-4 h-4 text-yellow-400 fill-yellow-400"
             />
           ))}
         </div>
         <span className="text-sm text-gray-600">(128 reviews)</span>
       </div>
     </div>

     <div className="space-y-4">
       {reviews.map((review) => (
         <div key={review.id} className="bg-white rounded-lg p-4 shadow-sm">
           <div className="flex items-center justify-between mb-2">
             <div className="flex items-center space-x-2">
               <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                 <span className="text-sm font-medium text-gray-600">
                   {review.name.charAt(0)}
                 </span>
               </div>
               <div>
                 <h4 className="text-sm font-medium text-gray-900">{review.name}</h4>
                 <div className="flex items-center">
                   {[...Array(review.rating)].map((_, i) => (
                     <Star
                       key={i}
                       className="w-3 h-3 text-yellow-400 fill-yellow-400"
                     />
                   ))}
                 </div>
               </div>
             </div>
             <span className="text-xs text-gray-500">{review.date}</span>
           </div>
           <p className="text-sm text-gray-600">{review.comment}</p>
         </div>
       ))}
     </div>
   </div>
</>
);
};

export default ReviewsCard;
  
    

       