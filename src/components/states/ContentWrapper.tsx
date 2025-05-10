import { Loader } from "../ui/Loader";
import { ErrorMessage } from "../ui/ErrorMessage";
import { EmptyState } from "../ui/EmptyState";

interface ContentWrapperProps {
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
  isEmpty?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  children: React.ReactNode;
}

export const ContentWrapper = ({
  status,
  error,
  isEmpty,
  emptyTitle = "No data found",
  emptyDescription = "Try again later.",
  children,
}: ContentWrapperProps) => {
  if (status === "loading") return <Loader />;
  if (status === "failed")
    return <ErrorMessage message={error || "Something went wrong."} />;
  if (isEmpty)
    return <EmptyState title={emptyTitle} description={emptyDescription} />;

  return <>{children}</>;
};
