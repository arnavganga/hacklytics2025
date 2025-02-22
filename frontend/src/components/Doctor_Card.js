

const DoctorCard = () => {
  return (
    <div className="max-w-2xl mx-auto relative">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left side - Doctor's photo */}
        <div className="w-1/2 bg-white p-6">
          <div className="aspect-square relative">
            <img 
              src="/api/placeholder/400/400"
              alt="Doctor's photograph"
              className="rounded-lg object-cover"
            />
          </div>
        </div>

        {/* Right side - Information */}
        <div className="w-1/2 bg-gray-800 p-6 text-white">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              {/* Name and Title */}
              <div>
                <h2 className="text-xl font-bold">Dr. James Parker</h2>
                <p className="text-gray-300 text-sm">Cardiologist</p>
              </div>
              
              {/* Price and Reviews */}
              <div className="text-right">
                <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-2">
                  $150/visit
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <svg 
                  className="w-4 h-4 text-gray-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm">+1 234 567 890</span>
              </div>

              <div className="flex items-center space-x-2">
                <svg 
                  className="w-4 h-4 text-gray-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm">doctor@example.com</span>
              </div>

              <div className="flex items-center space-x-2">
                <svg 
                  className="w-4 h-4 text-gray-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm">123 Medical Center, Healthcare Ave.</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-700">
              <h3 className="text-sm font-semibold mb-2">Working Hours</h3>
              <p className="text-sm text-gray-300">Mon - Fri: 9:00 AM - 5:00 PM</p>
              <p className="text-sm text-gray-300">Sat: 9:00 AM - 1:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;