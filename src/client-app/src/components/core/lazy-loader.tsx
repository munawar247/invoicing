import React, { Suspense } from 'react';

interface Props {
  path: string;
}

export default function LazyLoader({ path }: Props) {
  const LazyComponent = React.lazy(() =>
    import(`../pages/${path}`).catch(() => ({
      default: () => <div>Not found</div>
    }))
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
