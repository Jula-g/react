import React, { useState } from 'react';
import { LibraryClient } from '../api/library-client';
import { CreateUserResponseDto } from '../dto/user.dto';

const AddReaderForm: React.FC = () => {
  const [reader, setReader] = useState<CreateUserResponseDto>({
    userId: undefined,
    username: undefined,
    email: undefined,
    role: undefined,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReader({
      ...reader,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const client = new LibraryClient();
    const response = await client.createReader(reader);
    if (response.success) {
      alert('Reader added successfully');
    } else {
      alert('Error adding reader');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={reader.username}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="email"
        name="email"
        value={reader.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <button type="submit">Add Reader</button>
    </form>
  );
};

export default AddReaderForm;
