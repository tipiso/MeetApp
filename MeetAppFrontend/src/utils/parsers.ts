import { PrimitiveValue } from 'types/general';

const getISOfromJSDate = (date: Date) => date.toISOString().substring(0, date.toISOString().indexOf('T'));

const getDateAndTimeFromDate = (date: Date) => {
  const jsDate = new Date(date);
  return { timeString: jsDate.toLocaleTimeString(), dateString: jsDate.toLocaleDateString() };
};

const mapDTOToURLEntry = (dto: Record<string, PrimitiveValue | PrimitiveValue[]>) => {
  const newParams = new URLSearchParams();
  Object.entries(dto).forEach(([key, val]) => {
    if (Array.isArray(val)) {
      if (val.length) {
        val.forEach((ai) => newParams.append(key, `${ai}`));
      }
      return;
    }
    if (!!val) newParams.set(key, `${val}`);
  });
  return newParams;
};

export { getISOfromJSDate, getDateAndTimeFromDate, mapDTOToURLEntry };
