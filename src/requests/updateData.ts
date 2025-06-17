// import axios from 'axios';
import { getTomorrow, swapBinaryAndBool } from '../utils';
import {
  UpdateAlarmDataParams,
  UpdateDisarmDataParams,
} from '../../types';
import {
  updateAlarmTime as updateMockAlarmTime,
  updateDisarmStatus as updateMockDisarmStatus,
  updateSkipData as updateMockSkipData,
  removeSkip as removeMockSkip
} from '../mocks/mockStore';

export const updateAlarmTime = async ({
  timeData,
  getAlarmData,
}: UpdateAlarmDataParams): Promise<void> => {
  const { hour, minute, tod } = timeData;
  const hr = Number(hour);
  const min = Number(minute);
  try {
    updateMockAlarmTime(hr, min, tod);
    await getAlarmData();
  }
  catch (err) {
    console.warn('Error UPDATING alarm data:', err);
  }
};

export const updateDisarmStatus = async ({
  disarmData,
  getDisarmData,
}: UpdateDisarmDataParams): Promise<void> => {
  const convertedStatusData = swapBinaryAndBool(disarmData);
  try {
    updateMockDisarmStatus(convertedStatusData);
    await getDisarmData();
  }
  catch (err) {
    console.warn('Error UPDATING disarm data:', err);
  }
};

export const skipNextDay = async (
  getSkipData: () => Promise<void>,
): Promise<void> => {
  try {
    updateMockSkipData(getTomorrow());
    await getSkipData();
  }
  catch (err) {
    console.warn('Error UPDATING skip data:', err);
  }
};

export const skipToday = async (
  getSkipData: () => Promise<void>,
): Promise<void> => {
  try {
    updateMockSkipData(new Date().toLocaleDateString());
    await getSkipData();
  }
  catch (err) {
    console.warn('Error UPDATING skip data:', err);
  }
};

export const removeSkip = async (
  getSkipData: () => Promise<void>,
): Promise<void> => {
  try {
    removeMockSkip();
    await getSkipData();
  }
  catch (err) {
    console.warn('Error UPDATING skip data:', err);
  }
};
