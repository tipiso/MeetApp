const getISOfromJSDate = (date: Date) => date.toISOString().substring(0, date.toISOString().indexOf('T'));

const getDateAndTimeFromDate = (date: Date) => {
  const jsDate = new Date(date);
  return { timeString: jsDate.toLocaleTimeString(), dateString: jsDate.toLocaleDateString() };
};

export { getISOfromJSDate, getDateAndTimeFromDate };
