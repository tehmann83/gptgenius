import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import TextCompletion from '@/components/completion/TextCompletion';

const CompletionPage = () => {
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TextCompletion />
    </HydrationBoundary>
  );
};

export default CompletionPage;
