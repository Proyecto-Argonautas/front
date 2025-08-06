import { useState } from "react";
import { nanoid } from "nanoid";

interface Expense {
  id: number;
  nanoidId: string; // ID único generado con nanoid
  title: string;
  category: "Vuelos" | "Alojamiento" | "Comida" | "Transporte" | "Otros";
  amount: number;
  sharedWith: string[];
}

export const useBudget = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<
    "Vuelos" | "Alojamiento" | "Comida" | "Transporte" | "Otros"
  >("Vuelos");
  const [amount, setAmount] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [groupMembers] = useState<string[]>([
    "Albert",
    "María",
    "Carlos",
    "Ana",
    "Luis",
    "Sofía",
  ]);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  const toggleMember = (member: string) => {
    setSelectedMembers((prev) =>
      prev.includes(member)
        ? prev.filter((m) => m !== member)
        : [...prev, member],
    );
  };

  const handleAddOrUpdateExpense = () => {
    if (!title || !amount || selectedMembers.length === 0) return;

    // Mapear categorías a formato requerido
    const categoryMap: Record<string, "flight" | "food" | "transport" | "hotel" | "others"> = {
      "Vuelos": "flight",
      "Alojamiento": "hotel", 
      "Comida": "food",
      "Transporte": "transport",
      "Otros": "others"
    };

    if (editId !== null) {
      const updatedExpenseId = nanoid(); // Generar nuevo ID único para la actualización
      setExpenses((prev) =>
        prev.map((exp) =>
          exp.id === editId
            ? {
                ...exp,
                nanoidId: updatedExpenseId, // Actualizar también el nanoidId
                title,
                category,
                amount: parseFloat(amount),
                sharedWith: selectedMembers,
              }
            : exp,
        ),
      );
      
      // Console.log cuando se actualiza un gasto
      const updatedExpenseData = {
        id: updatedExpenseId, // ID único generado con nanoid para la actualización
        travel_id: "travel_123", // TODO: obtener del contexto de viaje
        name: title,
        type: categoryMap[category],
        part: selectedMembers.map(member => ({
          member_name: member,
          member_amount: parseFloat(amount) / selectedMembers.length
        }))
      };
      
      console.log("Expense updated:", updatedExpenseData);
      setEditId(null);
    } else {
      const expenseId = nanoid(); // Generar ID único con nanoid
      const newExpense: Expense = {
        id: Date.now(),
        nanoidId: expenseId, // Almacenar el nanoid en el objeto
        title,
        category,
        amount: parseFloat(amount),
        sharedWith: selectedMembers,
      };
      setExpenses([newExpense, ...expenses]);

      // Console.log cuando se añade un nuevo gasto
      const expenseData = {
        id: expenseId, // ID único generado con nanoid
        travel_id: "travel_123", // TODO: obtener del contexto de viaje
        name: title,
        type: categoryMap[category],
        part: selectedMembers.map(member => ({
          member_name: member,
          member_amount: parseFloat(amount) / selectedMembers.length
        }))
      };
      
      console.log("Expense added:", expenseData);
    }

    setTitle("");
    setAmount("");
    setSelectedMembers([]);
  };

  const handleDelete = (id: number) => {
    // Encontrar el gasto para obtener su nanoidId antes de eliminarlo
    const expenseToDelete = expenses.find(exp => exp.id === id);
    if (expenseToDelete) {
      console.log("Expense deleted - ID:", expenseToDelete.nanoidId);
    }
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
    handleEdit,
  };
};
