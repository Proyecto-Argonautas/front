import { useState } from 'react';

interface Expense {
  id: number;
  title: string;
  category: "Vuelos" | "Alojamiento" | "Comida" | "Transporte" | "Otros";
  amount: number;
  sharedWith: string[];
}

export const useBudget = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<"Vuelos" | "Alojamiento" | "Comida" | "Transporte" | "Otros">("Vuelos");
  const [amount, setAmount] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [groupMembers] = useState<string[]>(["Albert", "María", "Carlos", "Ana"]);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  const toggleMember = (member: string) => {
    setSelectedMembers(prev => 
      prev.includes(member) 
        ? prev.filter(m => m !== member)
        : [...prev, member]
    );
  };

  const handleAddOrUpdateExpense = () => {
    if (!title || !amount || selectedMembers.length === 0) return;

    if (editId !== null) {
      setExpenses((prev) =>
        prev.map((exp) =>
          exp.id === editId
            ? { ...exp, title, category, amount: parseFloat(amount), sharedWith: selectedMembers }
            : exp
        )
      );
      setEditId(null);
    } else {
      const newExpense: Expense = {
        id: Date.now(),
        title,
        category,
        amount: parseFloat(amount),
        sharedWith: selectedMembers,
      };
      setExpenses([newExpense, ...expenses]);
    }

    setTitle("");
    setAmount("");
    setSelectedMembers([]);
  };

  const handleDelete = (id: number) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  const handleEdit = (expense: Expense) => {
    setTitle(expense.title);
    setAmount(expense.amount.toString());
    setCategory(expense.category);
    setSelectedMembers(expense.sharedWith);
    setEditId(expense.id);
  };

  return {
    expenses,
    title,
    setTitle,
    category,
    setCategory,
    amount,
    setAmount,
    editId,
    groupMembers,
    selectedMembers,
    total,
    toggleMember,
    handleAddOrUpdateExpense,
    handleDelete,
    handleEdit
  };
};
