// Type definitions
export type AlarmTimeRes = [{
  id: number;
  hour: number;
  minute: number;
  tod: 'AM' | 'PM';
}];

export interface DisarmRes {
  disarmedstatus: BinaryOrBool;
}

export interface StreakRes {
  streak: number;
  maxstreak: number;
}

export interface SkipRes {
  skipped: number;
  skipdate: string;
}

export interface SoakedRes {
  soaked: number;
}

export interface DisarmRecordsData {
  id: number;
  timestamp: string;
  status: number;
}

export interface UserRes {
  password_: string;
}

export type BinaryOrBool = 1 | 0 | '1' | '0' | true | false | 'true' | 'false' | undefined;

// Mock data
export const mockAlarmTime: AlarmTimeRes = [{
  id: 1,
  hour: 6,
  minute: 0,
  tod: 'AM'
}];

export const mockDisarmStatus: DisarmRes[] = [{
  disarmedstatus: 0  // 0 for armed, 1 for disarmed
}];

export const mockStreakData: StreakRes[] = [{
  streak: 5,
  maxstreak: 10
}];

export const mockSkipData: SkipRes[] = [{
  skipped: 2,
  skipdate: 'None 💪🏼'
}];

export const mockSoakedData: SoakedRes[] = [{
  soaked: 3
}];

export const mockDisarmRecords: DisarmRecordsData[] = [
  {
    id: 1,
    timestamp: new Date().toISOString(),
    status: 0
  },
  {
    id: 2,
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    status: 1
  }
];

export const mockUserData: UserRes[] = [{
  password_: '1234'
}]; 