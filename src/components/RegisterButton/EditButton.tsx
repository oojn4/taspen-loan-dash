import React from 'react';
import { Button } from '@mantine/core';

type EditButtonProps = {
  onClick: () => void;
};

const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
  return (
    <Button type="button" onClick={onClick} >
      Edit
    </Button>
  );
};

export default EditButton;

