import getFiltredData from '../getFiltredData';

const initialFilter = { data: {}, state: false, tags: [] };

export const applyFilter = (setFilter, data, tag) => {
  setFilter((prev) => {
    const uniqueFilter = Array.from(new Set([...prev.tags, tag]));
    return { ...prev, state: true, data: getFiltredData(data, uniqueFilter), tags: uniqueFilter };
  });
};

export const resetFilter = (setFilter) => setFilter(initialFilter);

export const removeFilter = (tags, setFilter, data, filterName) => {
  const newFilters = tags.filter((tag) => tag !== filterName);
  if (newFilters.length) {
    setFilter((prev) => ({
      ...prev,
      state: true,
      tags: newFilters,
      data: getFiltredData(data, newFilters),
    }));
  } else resetFilter(setFilter);
};
