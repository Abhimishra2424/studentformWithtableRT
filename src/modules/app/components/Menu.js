import { Link } from "react-router-dom";
import { Menu, Segment } from "semantic-ui-react";

const Menus = () => {
  return (
    <Segment inverted>
      <Menu inverted pointing secondary>
        <Menu.Item name="student list">Student</Menu.Item>
      </Menu>
    </Segment>
  );
};

export default Menus;
