export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-GB", { month: "short" });

  return `${day} ${month}`;
};

export const formatTime = (isoDate: string): string => {
  const date = new Date(isoDate);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};
