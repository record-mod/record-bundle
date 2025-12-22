import ErrorCard from "./ErrorCard";
import { ThemeContext } from "@ui/styles";
import { Falsy } from "react-native";

type ErrorBoundaryState =
    | {
          hasErr: false;
      }
    | {
          hasErr: true;
          error: Error;
      };

export interface ErrorBoundaryProps {
    children: React.ReactNode | Falsy | (React.ReactNode | Falsy)[];
}

export default class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasErr: false };
    }

    static contextType = ThemeContext;
    static getDerivedStateFromError = (error: Error) => ({
        hasErr: true,
        error,
    });

    render() {
        if (!this.state.hasErr) return this.props.children;

        return (
            <ErrorCard
                error={this.state.error}
                onRetryRender={() => this.setState({ hasErr: false })}
            />
        );
    }
}
