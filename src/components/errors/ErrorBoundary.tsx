import React from 'react';
import { logError } from '../../lib/logging/errorLogger';

interface Props {
  children: React.ReactNode;
  component?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    logError(error, this.props.component).catch(console.error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-lg font-medium text-red-700">Something went wrong</h2>
          <p className="mt-1 text-sm text-red-600">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-2 text-sm text-red-600 hover:text-red-700"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}