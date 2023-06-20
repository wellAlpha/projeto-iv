import { Category, MenuBook, Person } from "@mui/icons-material";
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
        <Link to="/admin/autor">
          <ListItemButton>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Autor" />
          </ListItemButton>
        </Link>
        <Link to="/admin/categoria">
          <ListItemButton>
            <ListItemIcon>
              <Category />
            </ListItemIcon>
            <ListItemText primary="Categoria" />
          </ListItemButton>
        </Link>
        <Link to="/admin/livro">
          <ListItemButton>
            <ListItemIcon>
              <MenuBook />
            </ListItemIcon>
            <ListItemText primary="Livro" />
          </ListItemButton>
        </Link>
      </List>
    </div>
  );
}
