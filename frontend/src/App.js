import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css';
import { format } from 'date-fns';


const baseUrl = "http://127.0.0.1:5000";

function App() {
  const [description, setDescription] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [eventsList, setEventsList] = useState([]);
  const [eventId, setEventId] = useState(null);

  const fetchEvents = async () => {
    try {
      const data = await axios.get(`${baseUrl}/events`);
      const { events } = data.data;
      setEventsList(events);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleChange = (e, field) => {
    if (field === 'edit') {
      setEditDescription(e.target.value);
    } else {
      setDescription(e.target.value);
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}/events/${id}`);
      const updatedList = eventsList.filter(event => event.id !== id);
      setEventsList(updatedList);
    } catch(err) {
      console.error(err.message);
    }
  }

  const toggleEdit = (event) => {
    setEventId(event.id);
    setEditDescription(event.description);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editDescription && eventId) {
        const data = await axios.put(`${baseUrl}/events/${eventId}`, { description: editDescription });
        const updatedEvent = data.data.event;
        const updatedList = eventsList.map(event => (event.id === eventId ? updatedEvent : event));
        setEventsList(updatedList);
      } else if (description) {
        const data = await axios.post(`${baseUrl}/events`, { description });
        setEventsList([...eventsList, data.data]);
      }
      setDescription('');
      setEditDescription('');
      setEventId(null);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="App">
      <section>
        <form onSubmit={handleSubmit}>
          <label htmlFor="description">Description</label>
          <input
            onChange={(e) => handleChange(e, 'description')}
            type="text"
            name="description"
            id="description"
            placeholder="Describe the event"
            value={description}
          />
          <button type="submit">Submit</button>
        </form>
      </section>
      <section>
        <ul>
          {eventsList.map(event => (
            <li style={{ display: "flex" }} key={event.id}>
              {format(new Date(event.created_at), "MM/dd, p")}: {" "}
              {event.id === eventId ? (
                <form onSubmit={handleSubmit}>
                  <input
                    onChange={(e) => handleChange(e, 'edit')}
                    type="text"
                    name="editDescription"
                    id="editDescription"
                    value={editDescription}
                  />
                  <button type="submit">Submit Edit</button>
                </form>
              ) : (
                <>
                  {event.description}
                  <button onClick={() => toggleEdit(event)}>Edit</button>
                  <button onClick={() => handleDelete(event.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;


