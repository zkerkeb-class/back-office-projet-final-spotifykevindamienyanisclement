import React from 'react';

interface IWrapperCenterFull {
  children: React.ReactNode;
}

function Index({ children }: IWrapperCenterFull) {
  return <div>{children}</div>;
}

export default Index;
