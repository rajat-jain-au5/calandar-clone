import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "react-bootstrap/Button";
import {
  addCalendar,
  editCalendar,
  getCalendar,
  deleteCalendar,
} from "../actionCreators/calandarActions";
const buttonStyle = { marginRight: 10 };
function CalendarForm({ setInitializedFalse, calendarEvent, onCancel, edit }) {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [title, setTitle] = useState("");
  const [id, setId] = useState(null);
  useEffect(() => {
    setTitle(calendarEvent.title);
    setStart(calendarEvent.start);
    setEnd(calendarEvent.end);
    setId(calendarEvent._id);
  }, [
    calendarEvent.title,
    calendarEvent.start,
    calendarEvent.end,
    calendarEvent._id,
  ]);

  const handleStartChange = (date) => setStart(date);
  const handleEndChange = (date) => setEnd(date);
  const handleTitleChange = (ev) => setTitle(ev.target.value);
  const deleteCalendarEvent = async () => {
    await deleteCalendar(id);
    const response = await getCalendar();
    // eslint-disable-next-line
    const evs = response.data.map((d) => {
      return {
        ...d,
        start: new Date(d.start),
        end: new Date(d.end),
      };
    });
    setInitializedFalse();
    onCancel();
  };

  const submitCalendarEvent = async () => {
    if (!title || !start || !end) {
      return;
    }
    if (+start > +end) {
      alert("Start date must be earlier than end date");
      return;
    }
    const data = {
      id,
      title,
      start,
      end,
    };
    if (!edit) {
      await addCalendar(data);
      
    } else {
      await editCalendar(data);
    }
    // console.log("coming coming");
    setInitializedFalse();
    const response = await getCalendar();
    // eslint-disable-next-line
    const evs = response.data.map((d) => {
      return {
        ...d,
        start: new Date(d.start),
        end: new Date(d.end),
      };
    });
    onCancel();
  };

  return (
    <Form noValidate>
      <Form.Row>
        <Form.Group as={Col} md="12" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Title"
            value={title || ""}
            onChange={handleTitleChange}
            isInvalid={!title}
          />
          <Form.Control.Feedback type="invalid">{!title}</Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="12" controlId="start">
          <Form.Label>Start</Form.Label>
          <br />
          <DatePicker
            showTimeSelect
            className="form-control"
            selected={start}
            onChange={handleStartChange}
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="12" controlId="end">
          <Form.Label>End</Form.Label>
          <br />
          <DatePicker
            showTimeSelect
            className="form-control"
            selected={end}
            onChange={handleEndChange}
          />
        </Form.Group>
      </Form.Row>
      <Button type="submit" style={buttonStyle} onClick={submitCalendarEvent}>
        Save
      </Button>
      <Button type="button" style={buttonStyle} onClick={deleteCalendarEvent}>
        Delete
      </Button>
      <Button type="button" onClick={onCancel}>
        Cancel
      </Button>
    </Form>
  );
}
export default CalendarForm;
