import './App.css';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { getDateList, setDate } from './actions/date-action';

import DataList from './components/data-list';

// Custom styling using styled component
const Button = styled.button`
  height: 30px;
  width: 100px;
  border-radius: 3px;
  border: 1px solid black;
  color: white;
  margin: 0.5em 1em;
  padding: 0.25em 1em;
  cursor: pointer;
  margin-bottom: 20px;
  font-weight: bold;
  ${(props) =>
    props.disabled
      ? `
    background: rgb(229, 229, 229);
    color: red;
    cursor: not-allowed;
    `
      : `
    background: palevioletred;
    `};
`;

const Input = styled.input`
  height: 25px;
  margin: 10px;
`;

const Container = styled.div`
  text-align: center;
`;

const Label = styled.label`
  margin: 30px;
`;

// This function is to check if a date is valid to not
function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

// This is the main react functional component
function App(props) {
  // Using react states
  const [dateString, setDateString] = useState('');
  const [buttonText, setButtonText] = useState('Submit');
  const [dateList, setDateList] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetching initial data
  useEffect(() => {
    setIsLoading(true);
    props.getDateList();
  }, [isLoading]);

  // Changing date list value on updating the data
  useEffect(() => {
    setDateList(props.list);
    setIsLoading(false);
  }, [props.list]);

  // This is the function which will be executed after clicking submit button
  function handleButtonClick(event) {
    event.preventDefault();

    setButtonText('Submitting...');

    const dateSubmitted = new Date().toISOString().split('T')[0];

    setTimeout(() => {
      const date = new Date(dateString);

      if (isValidDate(date) && dateString.length >= 6) {
        const isoDate = date.toISOString().split('T')[0];
        const year = parseInt(isoDate.split('-')[0]);

        // Validation check if the date is before 2019 on success storing
        if (year >= 2019 && year <= 2021) {
          props.setDate({ dateSubmitted, isoDate, originalDate: dateString });
          setMessage(
            `Success! Your date ${isoDate} was successfully tested and stored.`
          );
        } else if (year < 2019) {
          setMessage(`Your date ${isoDate} was too old. Try again.`);
        } else {
          setMessage('Invalid date.');
        }

        setButtonText('Submit');
      } else {
        setMessage('Invalid date.');
        setButtonText('Submit');
      }
    }, 500);
  }

  // Based on isLoading state showing data
  return !!isLoading ? (
    <Container>
      <Label>Fetching Data....</Label>
    </Container>
  ) : (
    <Container className='App'>
      <form onSubmit={handleButtonClick}>
        <Input
          type='text'
          value={dateString}
          onChange={(event) => {
            setMessage('');
            setDateString(event.target.value);
          }}
          disabled={buttonText === 'Submitting...'}
        />

        <br />

        <Button
          type='submit'
          disabled={buttonText === 'Submitting...' || dateString === ''}
        >
          {buttonText}
        </Button>

        <br />

        <Label>
          {message.split(' ')[0] === 'Success!' ? (
            <span style={{ color: 'green' }}>{message}</span>
          ) : (
            <span style={{ color: 'red' }}>{message}</span>
          )}
        </Label>

        <br />
      </form>

      <div
        style={{
          marginTop: '50px',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <DataList
          year={2019}
          data={dateList.filter(
            (date) => date.isoDate.split('-')[0] === '2019'
          )}
        />

        <DataList
          year={2020}
          data={dateList.filter(
            (date) => date.isoDate.split('-')[0] === '2020'
          )}
        />

        <DataList
          year={2021}
          data={dateList.filter(
            (date) => date.isoDate.split('-')[0] === '2021'
          )}
        />
      </div>
    </Container>
  );
}

// Mapping state data to props
const mapStateToProps = (state) => {
  return {
    list: state.dates.list,
  };
};

export default connect(mapStateToProps, { getDateList, setDate })(App);
