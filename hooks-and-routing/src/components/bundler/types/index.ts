import { ReactNode } from 'react';

export interface ErrorBoundaryProps {
  children: ReactNode;
  hasError: boolean;
  errorMessage: string;
  onReset: () => void;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  retryClicked: boolean;
}
