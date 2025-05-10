interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="flex items-center justify-center h-full px-4 py-3 bg-red-100 text-red-700 rounded-md shadow">
      <span className="font-medium">Error:</span>&nbsp;{message}
    </div>
  );
};
