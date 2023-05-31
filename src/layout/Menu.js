import { Home, Person } from "@mui/icons-material";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { Link } from "react-router-dom";
export default function Menu() {
  return (
    <div className="w-60 border-r-2 h-screen">
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Administrador Livraria
          </ListSubheader>
        }
      >
        <Link to="/">
          <ListItemButton>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </Link>
        <Link to="/admin/autor">
          <ListItemButton>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Autor" />
          </ListItemButton>
        </Link>
      </List>
    </div>
  );
}
