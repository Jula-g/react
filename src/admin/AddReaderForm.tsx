// import React, { useState } from 'react';
// import { LibraryClient } from '../api/library-client';
// import { CreateUserResponseDto } from '../dto/user.dto';
//
const AddReaderForm: () => void = () => {
  //   const [user, setReader] = useState<CreateUserResponseDto>({
  //     userId: undefined,
  //     username: undefined,
  //     email: undefined,
  //     role: undefined,
  //   });
  //
  //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const { name, value } = e.target;
  //     setReader({
  //       ...user,
  //       [name]: value,
  //     });
  //   };
  //
  //   const handleSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     const client = new LibraryClient();
  //     const response = await client.createReader(user);
  //     if (response.success) {
  //       alert('Reader added successfully');
  //     } else {
  //       alert('Error adding user');
  //     }
  //   };
  //
  //   return (
  //     <form onSubmit={handleSubmit}>
  //       <input
  //         type="text"
  //         name="name"
  //         value={user.username}
  //         onChange={handleChange}
  //         placeholder="Name"
  //         required
  //       />
  //       <input
  //         type="email"
  //         name="email"
  //         value={user.email}
  //         onChange={handleChange}
  //         placeholder="Email"
  //         required
  //       />
  //       <button type="submit">Add Reader</button>
  //     </form>
  //   );
};

export default AddReaderForm;
