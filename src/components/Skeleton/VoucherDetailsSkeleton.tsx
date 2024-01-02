import RedeemFormSkeleton from './RedeemFormSkeleton';

function VoucherDetailsSkeleton() {
  return (
    <div role="status" className="px-4 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-center animate-pulse md:justify-start">
        <div className="h-6 bg-gray-300 rounded-md w-48 mb-4" />
      </div>
      <div className="mt-8 md:grid md:gap-x-4 md:grid-cols-2 lg:gap-x-10">
        <div className="animate-pulse relative overflow-hidden  md:order-2">
          <div className="absolute -top-4 -left-8 h-40 w-40 bg-gray-200 rounded-full md:-top-8 md:h-48 md:w-48 lg:w-60 lg:h-60" />

          <div className="flex flex-col w-full h-64 px-4 py-6 bg-gray-400 rounded-xl mb-4 md:h-80">
            <div className="space-y-2">
              <div className="ml-auto h-7 w-2/5 bg-gray-200 rounded-full" />
              <div className="ml-auto h-7 w-2/4 bg-gray-200 rounded-full" />
            </div>

            <div className="mt-auto flex items-center">
              <div className="flex-1 space-y-2">
                <div className="h-5 w-8/12 bg-gray-200 rounded-full" />
                <div className="h-6 w-11/12 bg-gray-200 rounded-full" />
              </div>
              <div className="flex-1">
                <div className="ml-auto h-8 w-3/5 bg-gray-200 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        <div className=" mt-6 md:mt-0">
          <RedeemFormSkeleton />
        </div>
      </div>
    </div>
  );
}

export default VoucherDetailsSkeleton;
