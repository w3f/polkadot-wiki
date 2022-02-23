import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { driver } from '../../static/js/blockHeightEstimator';
import React, { useState } from 'react';

export const BlockHeightEstimator = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [blockTime, setBlockTime] = useState(6000);

  const [isDateFilled, setIsDateFilled] = useState(false);
  const [isTimeFilled, setIsTimeFilled] = useState(false);
  const [isBlockTimeFilled, setIsBlockTimeFilled] = useState(false);

  const [blockHeight, setBlockHeight] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const onDateInput = ({ target: { value } }) => {
    setDate(value);
    setIsDateFilled(true);
  };

  const onTimeInput = ({ target: { value } }) => {
    setTime(value);
    setIsTimeFilled(true);
  };

  const onBlockTimeInput = ({ target: { value } }) => {
    setBlockTime(value);
    setIsBlockTimeFilled(true);
  };

  const onFormSubmit = async (e: any) => {
    e.preventDefault();

    setIsSubmitted(true);
    const value = date + ' ' + time;
    console.log(value);

    try {
      setIsLoading(true);
      const ret = await driver(value, blockTime);
      console.log(ret);
      if (ret == NaN) {
        setBlockHeight('Invalid number returned. Please try again');
      }
      setBlockHeight(ret);
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <Form>
        <Form.Group controlId="formBlockHeight">
          <Form.Text>Enter both a date and time</Form.Text>
          <Row>
            <Col>
              <Form.Label>
                Date<span style={{ color: 'red' }}> *</span>
              </Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter Date"
                onChange={onDateInput}
                value={date}
                required
              />
            </Col>
            <Col>
              <Form.Label>
                Time<span style={{ color: 'red' }}> *</span>
              </Form.Label>
              <Form.Control
                type="time"
                placeholder="Enter Time"
                onChange={onTimeInput}
                value={time}
                step="1"
                required
              />
            </Col>
            <Col>
              <Form.Label>
                Block Time (ms)<span style={{ color: 'red' }}> *</span>
              </Form.Label>
              <Form.Control
                type="text"
                defaultValue={6000}
                onChange={onBlockTimeInput}
                value={blockTime}
                required
              />
            </Col>
            <Col>
              <Button
                variant="primary"
                type="submit"
                style={{ marginTop: '1.8rem', marginBottom: '1rem' }}
                onClick={onFormSubmit}
                disabled={!isDateFilled || !isTimeFilled}
              >
                Calculate
              </Button>
            </Col>
          </Row>
        </Form.Group>
      </Form>
      <Form.Group controlId="formNewBlockHeight">
        <Row>
          <Col md="auto">
            <Form.Label>Estimated Block Height: </Form.Label>
          </Col>
          <Col>
            <div style={{ color: 'var(--ifm-color-primary)' }}>
              {(() => {
                if (!isSubmitted) {
                  return '';
                } else {
                  if (!isLoading) {
                    return <div>{blockHeight}</div>;
                  } else {
                    return (
                      <div>Loading...</div>
                      // <>
                      //   <Spinner animation="border" size="sm" variant="dark" />
                      // </>
                    );
                  }
                }
              })()}
            </div>
          </Col>
        </Row>
      </Form.Group>
    </div>
  );
};
