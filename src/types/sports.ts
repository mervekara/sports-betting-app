export interface Sport {
  key: string;
  group: string;
  title: string;
  description: string;
  active: boolean;
  has_outrights: boolean;
  searchTerm: string;
}

export interface SportsState {
  sports: Sport[];
  selectedSport: Sport | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
