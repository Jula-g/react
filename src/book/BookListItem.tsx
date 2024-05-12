import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Book from './Book';
import ListItem from '@mui/material/ListItem';

interface BookListItemProps {
  book: Book;
  open: boolean;
  onClick: () => void;
}

const BookListItem: React.FC<BookListItemProps> = ({ book, open, onClick }) => {
  return (
    <form>
      <ListItemButton onClick={onClick}>
        <ListItemText primary={book.title} />
        {open ? <ExpandMore /> : <ExpandLess />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem sx={{ pl: 4 }}>
            <ListItemText primary={`Author: ${book.author}`} />
          </ListItem>
          <ListItem sx={{ pl: 4 }}>
            <ListItemText primary={`Publisher: ${book.publisher}`} />
          </ListItem>
          <ListItem sx={{ pl: 4 }}>
            <ListItemText primary={`Year Published: ${book.yearPublished}`} />
          </ListItem>
          <ListItem sx={{ pl: 4 }}>
            <ListItemText
              primary={`Available: ${book.isAvailable ? 'Yes' : 'No'}`}
            />
          </ListItem>
        </List>
      </Collapse>
    </form>
  );
};

export default BookListItem;
