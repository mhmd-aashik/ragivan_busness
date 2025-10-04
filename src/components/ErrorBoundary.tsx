"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center">
            <div className="text-center p-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                Something went wrong
              </h2>
              <p className="text-gray-300 mb-6">
                We're sorry, but something unexpected happened. Please try
                refreshing the page.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors"
              >
                Refresh Page
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
