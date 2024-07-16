import { Component, ErrorInfo } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from './types';

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, retryClicked: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.error('Error caught by ErrorBoundary:', error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (prevProps.hasError && !this.props.hasError) {
      this.setState({ hasError: false, retryClicked: false });
    }
  }

  render() {
    if (this.state.hasError || this.props.hasError) {
      return (
        <div>
          <h1>Something went wrong</h1>
          <p>{this.props.errorMessage}</p>
          <button
            onClick={() => {
              this.props.onReset();
            }}
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
