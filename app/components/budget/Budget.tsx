import { BedDouble, Car, MoreHorizontal, Pencil, Plane, Plus, Trash2, Users, Utensils } from "lucide-react";
import { useState } from "react";

interface Expense {
  id: number;
  title: string;
  category: "Vuelos" | "Alojamiento" | "Comida" | "Transporte" | "Otros";
  amount: number;
  sharedWith: string[]; // Array de nombres de miembros que comparten el gasto
}

const iconForCategory = (category: string) => {
  switch (category) {
    case "Vuelos":
      return <Plane className="text-gray-500 w-5 h-5" />;
    case "Alojamiento":
      return <BedDouble className="text-gray-500 w-5 h-5" />;
    case "Comida":
      return <Utensils className="text-gray-500 w-5 h-5" />;
    case "Transporte":
      return <Car className="text-gray-500 w-5 h-5" />;
    case "Otros":
      return <MoreHorizontal className="text-gray-500 w-5 h-5" />;
    default:
      return null;
  }
};

const Budget: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<"Vuelos" | "Alojamiento" | "Comida" | "Transporte" | "Otros">("Vuelos");
  const [amount, setAmount] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  
  // Lista de miembros del grupo (esto podría venir de props o contexto)
  const [groupMembers] = useState<string[]>(["Albert", "María", "Carlos", "Ana"]);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

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

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-40">
      <div className="max-w-md mx-auto lg:max-w-7xl">
        
        {/* Layout móvil */}
        <div className="lg:hidden">
          <div className="bg-emerald-900 text-white rounded-2xl p-6 text-center shadow-lg">
            <h2 className="text-3xl font-bold">{total.toFixed(2)} €</h2>
            <p className="mt-2 text-sm">Gasto total del grupo</p>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Gastos</h3>

            <div className="mb-4 space-y-2">
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Nombre del gasto"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Cantidad (€)"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={category} 
                onChange={(e) => setCategory(e.target.value as "Vuelos" | "Alojamiento" | "Comida" | "Transporte" | "Otros")}
              >
                <option value="Vuelos">Vuelos</option>
                <option value="Alojamiento">Alojamiento</option>
                <option value="Comida">Comida</option>
                <option value="Transporte">Transporte</option>
                <option value="Otros">Otros</option>
              </select>
              
              <div className="border border-gray-300 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium">Repartir entre:</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {groupMembers.map(member => (
                    <button
                      key={member}
                      type="button"
                      onClick={() => toggleMember(member)}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedMembers.includes(member)
                          ? 'bg-emerald-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {member}
                    </button>
                  ))}
                </div>
                {selectedMembers.length === 0 && (
                  <p className="text-xs text-red-500 mt-1">Selecciona al menos un miembro</p>
                )}
              </div>
              <button 
                type="button"
                className="w-full bg-emerald-400 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2" 
                onClick={handleAddOrUpdateExpense}
              >
                <Plus className="w-4 h-4" />
                {editId ? "Actualizar gasto" : "Añadir gasto"}
              </button>
            </div>

            <div className="space-y-3">
              {expenses.map((expense) => (
                <div key={expense.id} className="flex items-center p-4 justify-between bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="flex items-center gap-4">
                    {iconForCategory(expense.category)}
                    <div>
                      <p className="font-medium capitalize">{expense.title}</p>
                      <p className="text-sm text-gray-500">{expense.category}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Users className="w-3 h-3 text-gray-400" />
                        <p className="text-xs text-gray-400">
                          {expense.sharedWith.join(", ")} ({expense.sharedWith.length} {expense.sharedWith.length === 1 ? 'persona' : 'personas'})
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{expense.amount.toFixed(2)} €</p>
                    <p className="text-xs text-gray-500">
                      {(expense.amount / expense.sharedWith.length).toFixed(2)} € por persona
                    </p>
                    <div className="flex gap-2 mt-1 justify-end">
                      <button 
                        type="button"
                        className="p-1 hover:bg-gray-100 rounded transition-colors" 
                        onClick={() => handleEdit(expense)}
                      >
                        <Pencil className="w-4 h-4 text-blue-600" />
                      </button>
                      <button 
                        type="button"
                        className="p-1 hover:bg-gray-100 rounded transition-colors" 
                        onClick={() => handleDelete(expense.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Layout escritorio */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-3 gap-8 py-8 min-h-screen items-start">
            
            {/* Columna izquierda: Resumen */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="bg-emerald-400 text-white rounded-2xl p-8 text-center shadow-lg">
                <h2 className="text-4xl font-bold">{total.toFixed(2)} €</h2>
                <p className="mt-3 text-base">Gasto total del grupo</p>
              </div>
              
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-4">Miembros del grupo</h3>
                <div className="space-y-3">
                  {groupMembers.map(member => (
                    <div key={member} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {member.charAt(0)}
                        </div>
                        <span className="font-medium">{member}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {expenses.filter(e => e.sharedWith.includes(member)).length} gastos
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Columna central: Formulario */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-2xl font-semibold mb-6">Añadir nuevo gasto</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="expense-title" className="block text-sm font-medium text-gray-700 mb-2">Nombre del gasto</label>
                  <input
                    id="expense-title"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Ej: Cena en restaurante"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                
                <div>
                  <label htmlFor="expense-amount" className="block text-sm font-medium text-gray-700 mb-2">Cantidad</label>
                  <input
                    id="expense-amount"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="0.00"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                
                <div>
                  <label htmlFor="expense-category" className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                  <select 
                    id="expense-category"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    value={category} 
                    onChange={(e) => setCategory(e.target.value as "Vuelos" | "Alojamiento" | "Comida" | "Transporte" | "Otros")}
                  >
                    <option value="Vuelos">Vuelos</option>
                    <option value="Alojamiento">Alojamiento</option>
                    <option value="Comida">Comida</option>
                    <option value="Transporte">Transporte</option>
                    <option value="Otros">Otros</option>
                  </select>
                </div>
                
                <div>
                  <div className="block text-sm font-medium text-gray-700 mb-2">Repartir entre</div>
                  <div className="border border-gray-300 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-3">
                      {groupMembers.map(member => (
                        <button
                          key={member}
                          type="button"
                          onClick={() => toggleMember(member)}
                          className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                            selectedMembers.includes(member)
                              ? 'bg-emerald-500 text-white shadow-md'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {member}
                        </button>
                      ))}
                    </div>
                    {selectedMembers.length === 0 && (
                      <p className="text-sm text-red-500 mt-2">Selecciona al menos un miembro</p>
                    )}
                  </div>
                </div>
                
                <button 
                  type="button"
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-4 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium text-lg mt-6" 
                  onClick={handleAddOrUpdateExpense}
                >
                  <Plus className="w-5 h-5" />
                  {editId ? "Actualizar gasto" : "Añadir gasto"}
                </button>
              </div>
            </div>

            {/* Columna derecha: Lista de gastos */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-2xl font-semibold mb-6">Lista de gastos</h3>
              
              <div className="space-y-4">
                {expenses.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Plus className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-lg">No hay gastos aún</p>
                    <p className="text-sm">Añade el primer gasto del grupo</p>
                  </div>
                ) : (
                  expenses.map((expense) => (
                    <div key={expense.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1 min-w-0">
                          <div className="mt-1 flex-shrink-0">
                            {iconForCategory(expense.category)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-lg capitalize truncate">{expense.title}</h4>
                            <p className="text-sm text-gray-600 mb-2">{expense.category}</p>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              <p className="text-sm text-gray-600 truncate">
                                {expense.sharedWith.join(", ")}
                              </p>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              {expense.sharedWith.length} {expense.sharedWith.length === 1 ? 'persona' : 'personas'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="text-right flex-shrink-0 ml-4">
                          <p className="text-xl font-bold text-indigo-900">{expense.amount.toFixed(2)} €</p>
                          <p className="text-sm text-gray-500 mb-3">
                            {(expense.amount / expense.sharedWith.length).toFixed(2)} € por persona
                          </p>
                          <div className="flex gap-2 justify-end">
                            <button 
                              type="button"
                              className="p-2 hover:bg-white rounded-lg transition-colors" 
                              onClick={() => handleEdit(expense)}
                            >
                              <Pencil className="w-4 h-4 text-blue-600" />
                            </button>
                            <button 
                              type="button"
                              className="p-2 hover:bg-white rounded-lg transition-colors" 
                              onClick={() => handleDelete(expense.id)}
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budget;
