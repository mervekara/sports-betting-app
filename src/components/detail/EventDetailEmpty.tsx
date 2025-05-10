import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { EmptyState } from "../ui/EmptyState";

export default function EventDetailEmpty() {
  const navigate = useNavigate();
  const [redirectMessage, setRedirectMessage] = useState("");

  useEffect(() => {
    setRedirectMessage(
      "You will be redirected to the homepage in 3 seconds..."
    );

    const timeout = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex flex-col items-center space-y-4">
      <EmptyState
        title="No Event Data"
        description="Please check back later."
      />
      <p className="text-sm text-gray-500">{redirectMessage}</p>
    </div>
  );
}
