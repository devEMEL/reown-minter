export interface LoadingAlertProps {
    message: string | undefined;
}
const LoadingAlert = ({ message }: LoadingAlertProps) => {
    return (
        <div
            className="fixed w-1/2 bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-8"
            role="alert"
        >
            <p className="font-bold">{message || 'Loading...'}</p>
            <p className="text-sm">Interacting with smart contract.</p>
        </div>
    );
};

export default LoadingAlert;
