import Dropdown from 'react-bootstrap/Dropdown';

function BasicDropdown() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1"><p style={{color:"white"}}>Action</p></Dropdown.Item>
        <Dropdown.Item href="#/action-2"><p style={{color:"white"}}>Action</p></Dropdown.Item>
        <Dropdown.Item href="#/action-3"><p style={{color:"white"}}>Action</p></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default BasicDropdown;