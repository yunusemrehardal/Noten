import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { Navbar, Container, Row, Col, ListGroup, Button, Form } from 'react-bootstrap';
import { faStickyNote } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function App() {
  const apiRoot = 'https://localhost:7158/api/Notes';
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedNote, setSelectedNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // verileri axios kütüphanesi ile api'den çekelim
    axios.get(apiRoot)
      .then((response) => {
        setNotes(response.data);
      });
  }, []);

  const openNote = function (event, note, index) {
    event.preventDefault();
    setSelectedIndex(index);
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleSubmit = function (event) {
    event.preventDefault();
    if (selectedNote) {
      const updatedNote = {
        id: selectedNote.id,
        title: title,
        content: content
      };
      axios.put(apiRoot + "/" + selectedNote.id, updatedNote).then((response) => {
        const newNotes = [...notes];
        newNotes[selectedIndex] = updatedNote;
        setNotes(newNotes);
      });
    }
    else {
      const newNote = {
        title: title,
        content: content
      };
      axios.post(apiRoot, newNote).then((response) => {
        const newNotes = [...notes];
        newNotes.push(response.data);
        setNotes(newNotes);
        setSelectedIndex(newNotes.length - 1);
        setSelectedNote(response.data);
      });
    }
  };

  const handleClickNew = function (event) {
    event.preventDefault();
    setSelectedIndex(-1);
    setSelectedNote(null);
    setTitle("");
    setContent("");
  };

  const handleDelete = function (event) {
    if (selectedNote) {
      axios.delete(apiRoot + "/" + selectedNote.id).then((response) => {
        const newNotes = [...notes];
        newNotes.splice(selectedIndex, 1);
        setNotes(newNotes);
        handleClickNew(event);
      });
    }
  };

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand href="#home" className="fw-bold fs-2">
            <FontAwesomeIcon icon={faStickyNote} className="me-2" />
            Noten
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container fluid>
        <Row>
          <Col sm={4} md={3}>
            <div className='d-flex align-items-baseline mt-4'>
              <h4>Notes</h4>
              <Button size="sm" variant='primary' className='mb-2 ms-auto'
                onClick={handleClickNew}>
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </div>
            <ListGroup>
              {notes.map((note, index) =>
                <ListGroup.Item key={note.id} action active={selectedIndex === index}
                  onClick={(e) => openNote(e, note, index)}>
                  {note.title}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Col>
          <Col sm={8} md={9}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3 mt-4">
                <Form.Control type="text" placeholder="Title" value={title}
                  onChange={(e) => setTitle(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control as="textarea" placeholder="Content" rows={10} value={content}
                  onChange={(e) => setContent(e.target.value)} />
              </Form.Group>
              <div>
                <Button variant="primary" type="submit" className="me-2">Save</Button>
                <Button variant="danger" type="button" onClick={handleDelete}>Delete</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;