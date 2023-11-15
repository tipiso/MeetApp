const getISOfromJSDate = (date: Date) => date.toISOString().substring(0, date.toISOString().indexOf('T'));

export { getISOfromJSDate };
