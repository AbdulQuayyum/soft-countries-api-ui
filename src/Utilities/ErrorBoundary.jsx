import { Component } from 'react';

import assets from "../Assets/Index"

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="flex justify-center w-full">
          <div className="flex flex-col items-center justify-center max-w-2xl gap-4 py-32 mx-auto text-center">
            <img src={assets.NoData} alt="" />
            <h1 className="text-4xl font-medium">Oops! Something went wrong.</h1>
            <p>We&apos;re sorry, but something went wrong. Please try refreshing the page, or contact support if the problem persists.</p>
            <details style={{ whiteSpace: 'pre-wrap', cursor: "pointer" }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </details>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
