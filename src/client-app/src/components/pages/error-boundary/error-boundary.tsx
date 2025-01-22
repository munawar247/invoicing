import {
  FontAwesomeIcon,
  IconProp,
  fatriangleexclamationclassicregular
} from '@grc/ui-package';
import { ReactNode, Component, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
  componentName: string;
}

interface State {
  hasError: boolean;
}

// Styles for the Error Boundary
const styles = {
  errorContainer: {
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#f8d7da',
    borderRadius: '8px',
    border: '1px solid #f5c6cb',
    color: '#721c24',
    maxWidth: '600px',
    margin: '20px auto',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  },
  errorHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px'
  },
  errorLogo: {
    fontSize: '80px', // Size of the triangle exclamation icon
    color: '#e74c3c', // Red color for the icon
    marginRight: '15px' // Space between the logo and the text
  },
  errorTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '0'
  },
  errorMessage: {
    fontSize: '18px',
    margin: '0 0 20px',
    color: '#721c24'
  },
  errorDetails: {
    fontSize: '16px',
    margin: '10px 0',
    color: '#721c24'
  },
  reloadButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#bae3fd',
    color: '#000',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  },
  reloadButtonHover: {
    backgroundColor: '#45a049'
  },
  errorDetailsContainer: {
    marginTop: '20px',
    textAlign: 'left',
    backgroundColor: '#fff3cd',
    padding: '10px',
    borderRadius: '5px'
  },
  errorDetailsSummary: {
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  errorDetailsText: {
    fontFamily: 'monospace',
    whiteSpace: 'pre-wrap',
    backgroundColor: '#f8d7da',
    padding: '10px',
    borderRadius: '5px',
    marginTop: '10px'
  }
};

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };
  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    //Need to log in app  logger currently logging on console
    console.log(`Uncaught error:${error}`);
    console.log(`Uncaught error component stack :${errorInfo?.componentStack}`);
  }
  public render() {
    const { children, componentName } = this.props;
    const { hasError } = this.state;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const componentInfo = componentName ? (
      <span>
        &nbsp;with the&nbsp;<b>{componentName}</b>
      </span>
    ) : (
      ''
    );

    if (hasError) {
      return (
        // User notification component to be placed here for showing error.
        // <div>Something went wrong{componentInfo}. Please try again later</div>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <FontAwesomeIcon
            icon={fatriangleexclamationclassicregular as IconProp}
            size="3x"
          />
          <h2 style={styles.errorTitle}>
            Oops! Something went wrong. While processing your request...
          </h2>
          {/* <p style={styles.errorMessage}> while processing your request for {componentInfo} </p>*/}
          <p style={styles.errorMessage}> we're on it! </p>
          <p style={styles.errorDetails}>
            Please try reloading the page or check back later.
          </p>
          <button
            style={styles.reloadButton}
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return children;
  }
}
export default ErrorBoundary;
