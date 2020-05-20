import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "react-bootstrap/Button";
import { bindActionCreators } from "redux";
import {
  addCalendar,
  editCalendar,
  getCalendar,
  deleteCalendar,
} from "../actionCreators/calandarActions";
import { connect } from "react-redux";

class CalendarForm extends React.Component {
  state = {
    start: null,
    end: null,
    title: "",
    id: null
  };
  componentDidMount = () => {
    this.setState({
      title: this.props.calendarEvent.title,
      start: this.props.calendarEvent.start,
      end: this.props.calendarEvent.end,
      id: this.props.calendarEvent._id,
    });
  };

  handleStartChange = (date) => {
    this.setState({ start: date });
  };
  handleEndChange = (date) => {
    this.setState({ end: date });
  };
  handleTitleChange = (ev) => this.setState({ title: ev.target.value });
  deleteCalendarEvent = (id) => {
    // console.log(id);
    // 
    this.props.deleteCalendar(id);
    
      // this.props.calandar.allevents.map((d) => {
      //   return {
      //     ...d,
      //     start: new Date(d.start),
      //     end: new Date(d.end),
      //   };
      // });
    this.props.setInitializedFalse();
    this.props.onCancel();
  
  };
  submitCalendarEvent = (e) => {
    e.preventDefault();
    const { id, title, start, end } = this.state;
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
    if (!this.props.edit) {
      this.props.addCalendar(data);
    } else {
      this.props.editCalendar(data);

    }
    // console.log("coming coming");
    this.props.setInitializedFalse();
   this.props.onCancel()
  };

  render() {
 
    const { calendarEvent, onCancel } = this.props;
    return (
      <div>
        <Form noValidate onSubmit={(e) => this.submitCalendarEvent(e)}>
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Title"
                value={this.state.title || ""}
                onChange={this.handleTitleChange}
                isInvalid={!this.state.title}
              />
              <Form.Control.Feedback type="invalid">
                {!this.state.title}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="start">
              <Form.Label>Start</Form.Label>
              <br />
              <DatePicker
                showTimeSelect
                className="form-control"
                selected={this.state.start}
                onChange={this.handleStartChange}
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
                selected={this.state.end}
                onChange={this.handleEndChange}
              />
            </Form.Group>
          </Form.Row>
          {this.props.edit === true ? (
            <Button type="submit" style={{ marginRight: 10 }}>
              Edit
            </Button>
          ) : (
            <Button type="submit" style={{ marginRight: 10 }}>
              Save
            </Button>
          )}

          <Button
            type="submit"
            style={{ marginRight: 10 }}
            onClick={() => this.deleteCalendarEvent(calendarEvent._id)}
          >
            Delete
          </Button>
          <Button type="button" onClick={onCancel}>
            Cancel
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { addCalendar, editCalendar, deleteCalendar,getCalendar },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(CalendarForm);
