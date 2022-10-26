import './App.css';
import ListTask from './CRUDfront/ListTask'
import CreateTask from './CRUDfront/CreateTask'
import EditTask from './CRUDfront/EditTask'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import NavbarMenu from './NavbarMenu'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function App() {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link  href="/">View tasks</Nav.Link>
              <Nav.Link  href="create" >New task</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <BrowserRouter >
        <Routes>
        <Route path="/" element={<ListTask/>}></Route>
          <Route path="/duet" element={<ListTask duet={true}/>}></Route>
          <Route path="/create" element={<CreateTask/>}></Route>
          <Route path="/update/:id" element={<EditTask/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
