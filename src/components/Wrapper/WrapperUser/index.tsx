import React from 'react';

interface IWrapperUser {
  children: React.ReactNode;
}

function Index({ children }: IWrapperUser) {
  return <div>{children}</div>;
}

export default Index;
