import { DisarmRecordsObj } from '../../types';

const generateRandomTime = (hour: number, minute: number): string => {
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12; // Convert 0 to 12 for 12-hour format
  const formattedHour = displayHour.toString().padStart(2, '0');
  const formattedMinute = minute.toString().padStart(2, '0');
  return `${formattedHour}:${formattedMinute} ${period}`;
};

const generateDate = (date: Date): string => {
  const month = (date.getMonth() + 1).toString();
  const day = date.getDate().toString();
  const year = date.getFullYear().toString();
  return `${month}/${day}/${year}`;
};

export const generateDummyRecords = (): DisarmRecordsObj[] => {
  const records: DisarmRecordsObj[] = [];
  const today = new Date();
  const twoYearsAgo = new Date();
  twoYearsAgo.setFullYear(today.getFullYear() - 2);
  
  // Generate records for every day in the past 2 years up to today
  for (let d = new Date(twoYearsAgo); d <= today; d.setDate(d.getDate() + 1)) {
    // Skip weekends (optional, remove if you want to include weekends)
    if (d.getDay() === 0 || d.getDay() === 6) continue;

    const date = generateDate(d);
    const alarm1 = generateRandomTime(6, Math.floor(Math.random() * 60));
    const alarm2 = generateRandomTime(7, Math.floor(Math.random() * 60));
    
    // 95% success rate, but ensure at least one failure per month
    const isFirstOfMonth = d.getDate() === 1;
    const success = isFirstOfMonth ? false : Math.random() > 0.05;
    
    // If successful, generate disarm times slightly before alarms
    const disarmedTime1 = success 
      ? generateRandomTime(5, Math.floor(Math.random() * 60))
      : undefined;
    const disarmedTime2 = success 
      ? generateRandomTime(6, Math.floor(Math.random() * 60))
      : undefined;

    records.push({
      date_: date,
      alarm1,
      alarm2,
      disarmedtime1: disarmedTime1,
      disarmedtime2: disarmedTime2,
      success: success ? 1 : 0
    });
  }

  // Sort by date to ensure current day is last
  return records.sort((a, b) => {
    const dateA = new Date(a.date_!.split('/').reverse().join('-'));
    const dateB = new Date(b.date_!.split('/').reverse().join('-'));
    return dateA.getTime() - dateB.getTime();
  });
}; 