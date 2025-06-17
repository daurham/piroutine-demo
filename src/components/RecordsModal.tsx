import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { v4 as uuidv4 } from 'uuid';
import TableEntry from './TableEntry';
import { TableFont } from '../styles/ModalStyles';
import { swapBinaryAndBool } from '../utils';
import { DisarmRecordsObj } from '../../types';

const uuid = (): string => uuidv4();

type Props = {
  show: boolean;
  handleClose: () => void;
  disarmRecords: DisarmRecordsObj[];
};

export default React.memo(({ show, handleClose, disarmRecords }: Props) => {
  const [currMonth, setCurrMonth] = useState<string>('');
  const [currYear, setCurrYear] = useState<string>('');
  const [oldestMonth, setOldestMonth] = useState('');
  const [oldestYear, setOldestYear] = useState('');

  const thisMonth = String(new Date().getMonth() + 1);
  const thisYear = String(new Date().getFullYear());

  const getMonthName = (currentMonth: string) => {
    if (currentMonth === '1') return 'January';
    if (currentMonth === '2') return 'Febuary';
    if (currentMonth === '3') return 'March';
    if (currentMonth === '4') return 'April';
    if (currentMonth === '5') return 'May';
    if (currentMonth === '6') return 'June';
    if (currentMonth === '7') return 'July';
    if (currentMonth === '8') return 'August';
    if (currentMonth === '9') return 'September';
    if (currentMonth === '10') return 'October';
    if (currentMonth === '11') return 'November';
    if (currentMonth === '12') return 'December';
    return '';
  };

  const getDayFromDate = (d: string) =>
    d?.slice(d.indexOf('/') + 1, d.lastIndexOf('/'));
  const getMonthFromDate = (d: string) => d?.slice(0, d.indexOf('/'));
  const getYearFromDate = (d: string) =>
    d?.slice(d.lastIndexOf('/') + 1, d.length);

  const incrementMonth = (): void => {
    if (currMonth === '12') {
      setCurrMonth('1');
      setCurrYear(String(Number(currYear) + 1));
    } else {
      setCurrMonth(String(Number(currMonth) + 1));
    }
  };

  const decrementMonth = (): void => {
    if (currMonth === '1') {
      setCurrMonth('12');
      setCurrYear(String(Number(currYear) - 1));
    } else {
      setCurrMonth(String(Number(currMonth) - 1));
    }
  };

  const makeTwoDigits = (n: string) => (n?.length === 1 ? `0${n}` : n);

  const breakdownDate = (d: string) => {
    const day = makeTwoDigits(getDayFromDate(d));
    const month = makeTwoDigits(getMonthFromDate(d));
    const year = getYearFromDate(d);
    return { year, month, day };
  };

  const filterRecordsByMonth = (currentMonth: string, currentYear: string) => {
    return disarmRecords.filter(({ date_ }) => {
      const { year, month } = breakdownDate(date_!);
      return year === currentYear && month === makeTwoDigits(currentMonth);
    });
  };

  useEffect(() => {
    if (!currMonth) setCurrMonth(thisMonth);
    if (!currYear) setCurrYear(thisYear);

    if (!oldestMonth || !oldestYear) {
      let lowestMonth = '12';
      let lowestYear = thisYear;
      disarmRecords.forEach((rec) => {
        const month = getMonthFromDate(rec.date_!);
        const year = getYearFromDate(rec.date_!);
        if (Number(year) < Number(lowestYear) || 
            (Number(year) === Number(lowestYear) && Number(month) < Number(lowestMonth))) {
          lowestMonth = month;
          lowestYear = year;
        }
      });
      setOldestMonth(lowestMonth);
      setOldestYear(lowestYear);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isOldestMonth = currMonth === oldestMonth && currYear === oldestYear;
  const isCurrentMonth = currMonth === thisMonth && currYear === thisYear;

  return (
    <div>
      <Modal 
        show={show} 
        onHide={handleClose} 
        centered 
        scrollable 
        size="lg"
        style={{ height: '600px' }}
      >
        <Modal.Header style={{ height: '80px' }}>
          <Modal.Title>
            <h1 className="modal-headers">{'Routine Records: '}</h1>
          </Modal.Title>
          <h5 className="modal-headers">{`${getMonthName(
            currMonth,
          )} '${currYear.slice(-2)}`}
          </h5>
        </Modal.Header>
        <Modal.Body
          style={{
            height: '440px',
            overflowY: 'auto',
            padding: '1rem',
          }}
        >
          <Table size="sm" responsive style={{ width: '100%', tableLayout: 'fixed' }}>
            <thead>
              <tr>
                <TableFont as="th" style={{ width: '20%' }}>Date</TableFont>
                <TableFont as="th" style={{ width: '20%' }}>Disarm 1</TableFont>
                <TableFont as="th" style={{ width: '20%' }}>Alarm 1</TableFont>
                <TableFont as="th" style={{ width: '20%' }}>Disarm 2</TableFont>
                <TableFont as="th" style={{ width: '20%' }}>Alarm 2</TableFont>
              </tr>
            </thead>
            <tbody>
              {filterRecordsByMonth(currMonth, currYear).length > 0 ? (
                filterRecordsByMonth(currMonth, currYear)
                  .reverse()
                  .map((rec, i) => (
                    <TableEntry
                      key={uuid()}
                      classN={!(i % 2) ? 'oddtable' : 'eventable'}
                      failed={
                        !swapBinaryAndBool(rec.success) ? 'failed' : 'succeeded'
                      }
                      date_={rec.date_}
                      alarm1={rec.alarm1}
                      alarm2={rec.alarm2}
                      disarmedTime1={rec.disarmedtime1}
                      disarmedTime2={rec.disarmedtime2}
                    />
                  ))
              ) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '1rem' }}>
                    No records for this month
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer style={{ height: '80px' }}>
          <Button
            size="sm"
            variant={isOldestMonth ? 'outline-secondary' : 'warning'}
            disabled={isOldestMonth}
            onClick={decrementMonth}
          >
            previous
          </Button>
          <Button
            size="sm"
            variant={isCurrentMonth ? 'outline-secondary' : 'warning'}
            disabled={isCurrentMonth}
            onClick={incrementMonth}
          >
            next
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
});
