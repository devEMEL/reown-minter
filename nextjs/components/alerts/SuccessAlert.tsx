interface SuccessAlertProps {
    message: string | undefined;
}
const SuccessAlert = ({ message }: SuccessAlertProps) => {
    return (
        <div
            className="fixed w-1/2 bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-8 shadow-md"
            role="alert"
        >
            <div className="flex">
                <div>
                    <p className="font-bold">Success</p>
                    <p className="text-sm">{message}</p>
                </div>
            </div>
        </div>
    );
};

export default SuccessAlert;
