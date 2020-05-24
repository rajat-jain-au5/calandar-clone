import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "react-bootstrap/Modal";
import CalendarForm from "./CalandarForm";
import { Link } from "react-router-dom";
import axios from "axios";
import { getCalendar } from "../actionCreators/calandarActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const localizer = momentLocalizer(moment);
class Calandar extends React.Component {
  state = {
    showAddModal: false,
    showEditModal: false,
    calendarEvent: {},
    initialized: false,
  }

  componentDidMount() {
    const response = axios({
      method: "GET",
      url: `https://tranquil-spire-77716.herokuapp.com/calendar/getCalendarEvents`,
      headers: {
        "x-auth-token": window.localStorage.getItem("token"),
      },
    });
    response.then((res) => {
      console.log(res);
      this.props.getCalendar(res);
      const evs = res.data.map((d) => {
        return {
          ...d,
          start: new Date(d.start),
          end: new Date(d.end),
        };
      });
    
    });
  }

  hideModals = () => {
    this.setState({
      showAddModal: false,
      showEditModal: false,
    });
  };

  setInitializedFalse = () => {
    this.setState({ initialized: false });
  };
  handleSelect = (event, e) => {
    const { start, end } = event;
    const data = { title: "", start, end, allDay: false };
    this.setState({
      showAddModal: true,
      showEditModal: false,
      calendarEvent: data,
    });
  };
  handleSelectEvent = (event, e) => {
    this.setState({
      showAddModal: false,
      showEditModal: true,
    });
    let { _id, title, start, end, allDay } = event;
    start = new Date(start);
    end = new Date(end);
    const data = { _id, title, start, end, allDay };
    this.setState({
      calendarEvent: data,
    });
  };
  logoutUser = () => {
    localStorage.removeItem("token");
  };
  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-md  navbar-dark sticky-top overlay1">
          <Link class="navbar-brand text-dark " to="/home">
            Calender App
          </Link>
          <button
            className="navbar-toggler navbar-toggler-right"
            type="button"
            data-toggle="collapse"
            data-target="#navb"
            aria-expanded="true"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div id="navb" className="navbar-collapse collapse hide">
            <ul className="navbar-nav"></ul>
            <ul className="nav navbar-nav ml-auto">
              <li className="nav-item">
                <a
                  href="./"
                  className="nav-link text-dark "
                  onClick={this.logoutUser}
                >
                  <span>{localStorage.getItem("name")}</span>&nbsp; Logout
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <br />
        <br />
        <Modal show={this.state.showAddModal} onHide={this.hideModals}>
          <Modal.Header closeButton>
            <Modal.Title>Add Calendar Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CalendarForm
              calendarEvent={this.state.calendarEvent}
              setInitializedFalse={this.setInitializedFalse}
              onCancel={this.hideModals}
              edit={false}
            />
          </Modal.Body>
        </Modal>
        <Modal show={this.state.showEditModal} onHide={this.hideModals}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Calendar Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CalendarForm
              calendarEvent={this.state.calendarEvent}
              setInitializedFalse={this.setInitializedFalse}
              onCancel={this.hideModals}
              edit={true}
            />
          </Modal.Body>
        </Modal>
        <Calendar
          localizer={localizer}
          events={this.props.calandar.allevents}
          startAccessor="start"
          endAccessor="end"
          selectable={true}
          style={{ height: "70vh" }}
          onSelectSlot={this.handleSelect}
          onSelectEvent={this.handleSelectEvent}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getCalendar }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Calandar);
