interface EmptyStateProps {
  title: string;
  description?: string;
}

export const EmptyState = ({ title, description }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-12 text-gray-600">
      <p className="text-base font-medium">{title}</p>
      {description && (
        <p className="mt-2 text-sm text-gray-500 max-w-sm">{description}</p>
      )}
    </div>
  );
};
