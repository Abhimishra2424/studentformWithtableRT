import React from "react";
// import { Routes, Route } from "react-router-dom";
import { Container, Grid, Segment } from "semantic-ui-react";
import AddStudent from "./components/AddStudent";
import FormWithFormik from "./components/AddStudent";
import Menus from "./components/Menu";
import TableWithReact from "./components/TableWithReact";

// import Student from "./components/Student";
// import StudentForm from "./components/StudentForm";

const App = () => {
  return (
    <div>
      <Menus />
      <Grid centered>
        <Grid.Row>
          <Grid.Column>
            <Container>
              <TableWithReact />
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default App;
