import { AlarmTimeRes, DisarmRes, SkipRes, BinaryOrBool } from './mockData';
import { mockAlarmTime, mockDisarmStatus, mockSkipData } from './mockData';

// Create mutable copies of the mock data
let currentAlarmTime: AlarmTimeRes = [...mockAlarmTime];
let currentDisarmStatus: DisarmRes[] = [...mockDisarmStatus];
let currentSkipData: SkipRes[] = [...mockSkipData];

export const getCurrentAlarmTime = () => currentAlarmTime;
export const getCurrentDisarmStatus = () => currentDisarmStatus;
export const getCurrentSkipData = () => currentSkipData;

export const updateAlarmTime = (hour: number, minute: number, tod: 'AM' | 'PM') => {
  currentAlarmTime = [{
    id: 1,
    hour,
    minute,
    tod
  }];
};

export const updateDisarmStatus = (status: BinaryOrBool) => {
  currentDisarmStatus = [{
    disarmedstatus: status
  }];
};

export const updateSkipData = (skipDate: string) => {
  currentSkipData = [{
    skipped: currentSkipData[0].skipped + 1,
    skipdate: skipDate
  }];
};

export const removeSkip = () => {
  currentSkipData = [{
    skipped: 0,
    skipdate: 'None 💪🏼'
  }];
}; 