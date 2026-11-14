type SearchableSalesRun = {
  isOwner: boolean;
  title: string;
};

export const matchesSalesRun = (run: SearchableSalesRun, query: string, filter = 'All Ongoing') => {
  const matchesFilter = filter === 'All Ongoing'
    || (filter === 'Host Owned' && run.isOwner)
    || (filter === 'Assistant In' && !run.isOwner);
  const normalizedQuery = query.trim().toLowerCase();

  return matchesFilter && (!normalizedQuery || run.title.toLowerCase().includes(normalizedQuery));
};
