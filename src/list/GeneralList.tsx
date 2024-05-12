import React from 'react';
import { List } from '@mui/material';
import ListItem from './GeneralListItem';

interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

const GeneralList = <T,>({ items, renderItem }: ListProps<T>) => {
  return (
    <List>
      {items.map((item, index) => (
        <ListItem key={index} item={item} renderItem={renderItem} />
      ))}
    </List>
  );
};

export default GeneralList;
