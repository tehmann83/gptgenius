import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import ToursPage from '@/components/ToursPage';
import { getAllTours } from '@/utils/actions';

const AllToursPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['tours'],
    queryFn: () => getAllTours(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ToursPage />
    </HydrationBoundary>
  );
};

export default AllToursPage;
