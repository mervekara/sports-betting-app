export const createOutcomeId = (
  eventId: string,
  bookmakerKey: string,
  marketKey: string,
  outcomeName: string
) => `${eventId}_${bookmakerKey}_${marketKey}_${outcomeName}`;
