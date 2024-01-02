import { Card } from '../Shared';

interface Props {
  hasTitle?: boolean;
}

function VoucherRedeemSkeleton({ hasTitle = false }: Props) {
  return (
    <div role="status" className="max-w-3xl mx-auto w-full animate-pulse">
      {hasTitle && (
        <div className="flex items-center justify-center">
          <div className="h-6 bg-gray-300 rounded-md w-48 mb-4" />
        </div>
      )}
      <Card>
        <div className="h-96 space-y-4 md:h-[400px]">
          <div className="h-16 bg-gray-200 rounded-2xl px-2 flex items-center justify-between space-x-2">
            <div className="h-8 w-2/5 bg-gray-300 rounded-full" />
            <div className="h-8 w-2/5 bg-gray-300 rounded-full" />
          </div>
          <div className="bg-gray-200 rounded-2xl px-2 py-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="h-8 w-2/5 bg-gray-300 rounded-full" />
              <div className="h-8 w-2/5 bg-gray-300 rounded-full" />
            </div>
            <div className="flex items-center justify-between">
              <div className="h-8 w-2/5 bg-gray-300 rounded-full" />
              <div className="h-8 w-2/5 bg-gray-300 rounded-full" />
            </div>
          </div>
          <div className="h-16 bg-gray-200 rounded-2xl px-2 flex items-center justify-between space-x-2">
            <div className="h-8 w-2/5 bg-gray-300 rounded-full" />
            <div className="h-8 w-2/5 bg-gray-300 rounded-full" />
          </div>
          <div className="space-y-2">
            <div className="h-6 w-full bg-gray-300 rounded-md" />
            <div className="flex items-center justify-center">
              <div className="h-4 w-8/12 bg-gray-300 rounded-md" />
            </div>
          </div>
          <div className="h-14 w-full bg-gray-300 rounded-xl" />

          <span className="sr-only">Loading...</span>
        </div>
      </Card>
    </div>
  );
}

export default VoucherRedeemSkeleton;
