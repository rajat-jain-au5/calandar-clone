import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "react-bootstrap/Modal";
import CalendarForm from "./CalandarForm";
import { Link } from "react-router-dom";

import { getCalendar } from "../actionCreators/calandarActions";


const localizer = momentLocalizer(moment);
function Calandar() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [calendarEvent, setCalendarEvent] = useState({});
  const [initialized, setInitialized] = useState(false);
  const [events, setEvents] = useState([]);
  const hideModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
  };
  const logoutUser=()=>{
    localStorage.removeItem("token")
    
  }
  const setInitializedFalse = () => {
    setInitialized(false);
  };

  const getCalendarEvents = async () => {
    const response = await getCalendar();
    console.log(response)
    const evs = response.data.map((d) => {
      return {
        ...d,
        start: new Date(d.start),
        end: new Date(d.end),
      };
    });
    // console.log(evs);
    setEvents(evs);
    setInitialized(true);
  };
  const handleSelect = (event, e) => {
    const { start, end } = event;
    const data = { title: "", start, end, allDay: false };
    setShowAddModal(true);
    setShowEditModal(false);
    setCalendarEvent(data);
  };
  const handleSelectEvent = (event, e) => {
    setShowAddModal(false);
    setShowEditModal(true);
    let { _id, title, start, end, allDay } = event;
    start = new Date(start);
    end = new Date(end);
    const data = { _id, title, start, end, allDay };
    setCalendarEvent(data);
  };
  useEffect(() => {
    if (!initialized) {
      getCalendarEvents();
    }
  }, [initialized]);
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
              <a href="./"
                className="nav-link text-dark "
                onClick={logoutUser}
              >
                <span>{localStorage.getItem("name")}</span>&nbsp; Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <br />
      <br />
      <Modal show={showAddModal} onHide={hideModals}>
        <Modal.Header closeButton>
          <Modal.Title>Add Calendar Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CalendarForm
            calendarEvent={calendarEvent}
            setInitializedFalse={setInitializedFalse}
            onCancel={hideModals}
            edit={false}
          />
        </Modal.Body>
      </Modal>
      <Modal show={showEditModal} onHide={hideModals}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Calendar Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CalendarForm
            // calendarStore={calendarStore}
            calendarEvent={calendarEvent}
            setInitializedFalse={setInitializedFalse}
            onCancel={hideModals}
            edit={true}
          />
        </Modal.Body>
      </Modal>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable={true}
        style={{ height: "70vh" }}
        onSelectSlot={handleSelect}
        onSelectEvent={handleSelectEvent}
      />
    </div>
  );
}

// const mapStateToProps = (state) => {
//   return state;
// };
// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({ logoutUser }, dispatch);
// };
// export default connect(mapStateToProps, mapDispatchToProps)(Calandar);
export default Calandar
