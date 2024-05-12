import React from 'react';
import ListItem from '@mui/material/ListItem';

interface ListItemProps<T> {
  item: T;
  renderItem: (item: T) => React.ReactNode;
}

const GeneralListItem = <T,>({ item, renderItem }: ListItemProps<T>) => {
  return <ListItem alignItems="flex-start">{renderItem(item)}</ListItem>;
};

export default GeneralListItem;
