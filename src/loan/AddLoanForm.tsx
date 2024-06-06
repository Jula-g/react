import React, { useState } from 'react';
import { LibraryClient } from '../api/library-client';
import { CreateLoanResponseDto } from '../dto/loan.dto';

const AddLoanForm: React.FC = () => {
  const [loan, setLoan] = useState<CreateLoanResponseDto>({
    id: undefined,
    loanDate: new Date(),
    dueDate: undefined,
    userId: undefined,
    bookId: undefined,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoan({
      ...loan,
      [name]:
        name === 'loanDate' || name === 'dueDate'
          ? new Date(value)
          : Number(value),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const client = new LibraryClient();
    const response = await client.createLoan(loan);
    if (response.success) {
      alert('Loan added successfully');
    } else {
      alert('Error adding loan');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        name="bookId"
        value={loan.bookId}
        onChange={handleChange}
        placeholder="Book ID"
        required
      />
      <input
        type="date"
        name="loanDate"
        value={loan.loanDate?.toISOString().split('T')[0]}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="dueDate"
        value={loan.dueDate?.toISOString().split('T')[0]}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Loan</button>
    </form>
  );
};

export default AddLoanForm;
