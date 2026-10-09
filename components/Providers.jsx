'use client';

import React from 'react';
import { StockoraProvider } from '@/context/StockoraContext';

export default function Providers({ children }) {
  return <StockoraProvider>{children}</StockoraProvider>;
}
