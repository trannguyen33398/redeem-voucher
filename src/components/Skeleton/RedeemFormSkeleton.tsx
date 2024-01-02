import { Card } from '../Shared';

function RedeemFormSkeleton() {
  return (
    <div role="status" className="max-w-3xl mx-auto w-full animate-pulse">
      <Card>
        <div className="space-y-8">
          <div className="space-y-2">
            <div className="h-6 w-2/5 bg-gray-300 rounded-full" />
            <div className="h-16 bg-gray-200 rounded-2xl px-2 space-y-2" />
          </div>

          <div className="grid gap-x-4 grid-cols-3">
            <div className="space-y-2 col-span-2">
              <div className="h-6 w-2/5 bg-gray-300 rounded-full" />
              <div className="h-16 bg-gray-200 rounded-2xl px-2 space-y-2" />
            </div>
            <div className="space-y-2">
              <div className="h-6 w-2/5 bg-gray-300 rounded-full" />
              <div className="h-16 bg-gray-200 rounded-2xl px-2 space-y-2" />
            </div>
          </div>

          <div className="grid gap-x-4 grid-cols-2">
            <div className="space-y-2">
              <div className="h-6 w-2/5 bg-gray-300 rounded-full" />
              <div className="h-16 bg-gray-200 rounded-2xl px-2 space-y-2" />
            </div>
            <div className="space-y-2">
              <div className="h-6 w-2/5 bg-gray-300 rounded-full" />
              <div className="h-16 bg-gray-200 rounded-2xl px-2 space-y-2" />
            </div>
          </div>

          <div className="h-16 rounded-2xl px-2 flex items-center justify-between space-x-2">
            <div className="h-8 w-2/5 bg-gray-300 rounded-full" />
            <div className="h-8 w-2/6 bg-gray-300 rounded-full" />
          </div>

          <div className="space-y-2">
            <div className="h-6 w-2/5 bg-gray-300 rounded-full" />
            <div className="h-16 bg-gray-200 rounded-2xl px-2 space-y-2" />
            <div className="ml-auto h-4 w-2/5 bg-gray-300 rounded-full" />
          </div>

          <div className="h-14 w-full bg-gray-300 rounded-xl" />

          <span className="sr-only">Loading...</span>
        </div>
      </Card>
    </div>
  );
}

export default RedeemFormSkeleton;
