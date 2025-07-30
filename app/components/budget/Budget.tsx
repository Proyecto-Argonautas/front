import {
  BedDouble,
  Car,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  Pencil,
  Plane,
  Plus,
  Trash2,
  Users,
  Utensils,
} from "lucide-react";
import { useState } from "react";
import { useBudget } from "../../hooks/useBudget";

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
  const [showMembers, setShowMembers] = useState(false);
  
  const {
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
  } = useBudget();

  return (
    <div className="bg-light-secondary-50 px-4 pt-4 pb-4">
      <div className="max-w-md mx-auto lg:max-w-7xl">
        {/* Layout móvil */}
        <div className="lg:hidden">
          <div 
            className="bg-cold-light-500 text-white rounded-2xl p-6 text-center shadow-lg cursor-pointer hover:bg-cold-light-800 transition-colors"
            onClick={() => setShowMembers(!showMembers)}
          >
            <div className="flex items-center justify-center gap-2">
              <div>
                <h2 className="text-3xl font-bold">{total.toFixed(2)} €</h2>
                <p className="mt-2 text-sm">Gasto total del grupo</p>
              </div>
              {showMembers ? (
                <ChevronUp className="w-6 h-6" />
              ) : (
                <ChevronDown className="w-6 h-6" />
              )}
            </div>
          </div>

          {/* Sección desplegable de miembros */}
          {showMembers && (
            <div className="mt-4 bg-light-primary rounded-2xl p-4 shadow-lg">
              <h3 className="text-lg font-semibold mb-3">
                Miembros del grupo
              </h3>
              <div className="space-y-3">
                {groupMembers.map((member) => {
                  const memberTotal = expenses
                    .filter((e) => e.sharedWith.includes(member))
                    .reduce(
                      (sum, expense) =>
                        sum + expense.amount / expense.sharedWith.length,
                      0,
                    );
                  const memberExpenseCount = expenses.filter((e) =>
                    e.sharedWith.includes(member),
                  ).length;

                  return (
                    <div
                      className="flex items-center justify-between p-3 bg-light-secondary-50 rounded-lg"
                      key={member}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-cold-light-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {member.charAt(0)}
                        </div>
                        <span className="font-medium">{member}</span>
                      </div>
                      <div className="text-right">
                        <div className="bg-light-primary border-2 border-gray-400 rounded-lg px-3 py-1">
                          <span className="font-bold text-lg">
                            {memberTotal.toFixed(0)}€
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {memberExpenseCount} gastos
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Gastos</h3>

            <div className="mb-4 space-y-2">
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nombre del gasto"
                value={title}
              />
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Cantidad (€)"
                type="number"
                value={amount}
              />
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) =>
                  setCategory(
                    e.target.value as
                      | "Vuelos"
                      | "Alojamiento"
                      | "Comida"
                      | "Transporte"
                      | "Otros",
                  )
                }
                value={category}
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
                  {groupMembers.map((member) => (
                    <button
                      className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedMembers.includes(member)
                          ? "bg-cold-light-100 text-gray-700"
                          : "bg-light-secondary-100 text-gray-700 hover:bg-light-secondary-200"
                      }`}
                      key={member}
                      onClick={() => toggleMember(member)}
                      type="button"
                    >
                      {member}
                    </button>
                  ))}
                </div>
                {selectedMembers.length === 0 ? (
                  <p className="text-xs text-red-500 mt-1">
                    Selecciona al menos un miembro
                  </p>
                ) : (
                  <p className="text-xs text-light-secondary-400 mt-1">
                    Has seleccionado {selectedMembers.length} {selectedMembers.length === 1 ? 'miembro' : 'miembros'}
                  </p>
                )}
              </div>
              <button
                className="w-full bg-cold-light-400 hover:bg-cold-light-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                onClick={handleAddOrUpdateExpense}
                type="button"
              >
                <Plus className="w-4 h-4" />
                {editId ? "Actualizar gasto" : "Añadir gasto"}
              </button>
            </div>

            <div className="space-y-3">
              {expenses.map((expense) => (
                <div
                  className="flex items-center p-4 justify-between bg-light-primary border border-gray-200 rounded-lg shadow-sm"
                  key={expense.id}
                >
                  <div className="flex items-center gap-4">
                    {iconForCategory(expense.category)}
                    <div>
                      <p className="font-medium capitalize">{expense.title}</p>
                      <p className="text-sm text-gray-500">
                        {expense.category}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <Users className="w-3 h-3 text-gray-400" />
                        <p className="text-xs text-gray-400">
                          {expense.sharedWith.join(", ")} (
                          {expense.sharedWith.length}{" "}
                          {expense.sharedWith.length === 1
                            ? "persona"
                            : "personas"}
                          )
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{expense.amount.toFixed(2)} €</p>
                    <p className="text-xs text-gray-500">
                      {(expense.amount / expense.sharedWith.length).toFixed(2)}{" "}
                      € por persona
                    </p>
                    <div className="flex gap-2 mt-1 justify-end">
                      <button
                        className="p-1 hover:bg-light-secondary-100 rounded transition-colors"
                        onClick={() => handleEdit(expense)}
                        type="button"
                      >
                        <Pencil className="w-4 h-4 text-blue-600" />
                      </button>
                      <button
                        className="p-1 hover:bg-light-secondary-100 rounded transition-colors"
                        onClick={() => handleDelete(expense.id)}
                        type="button"
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
          <div className="grid grid-cols-3 gap-8 py-4 items-stretch">
            {/* Columna izquierda: Resumen */}
            <div className="bg-light-primary rounded-2xl p-6 shadow-lg flex flex-col">
              <div className="bg-cold-light-400 text-white rounded-2xl p-8 text-center shadow-lg">
                <h2 className="text-4xl font-bold">{total.toFixed(2)} €</h2>
                <p className="mt-3 text-base">Gasto total del grupo</p>
              </div>

              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-4">
                  Miembros del grupo
                </h3>
                <div
                  className="space-y-3 overflow-y-auto"
                  style={{ maxHeight: "400px" }}
                >
                  {groupMembers.map((member) => {
                    const memberTotal = expenses
                      .filter((e) => e.sharedWith.includes(member))
                      .reduce(
                        (sum, expense) =>
                          sum + expense.amount / expense.sharedWith.length,
                        0,
                      );
                    const memberExpenseCount = expenses.filter((e) =>
                      e.sharedWith.includes(member),
                    ).length;

                    return (
                      <div
                        className="flex items-center justify-between p-3 bg-light-secondary-50 rounded-lg"
                        key={member}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-cold-light-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {member.charAt(0)}
                          </div>
                          <span className="font-medium">{member}</span>
                        </div>
                        <div className="text-right">
                          <div className="bg-light-primary border-2 border-gray-400 rounded-lg px-3 py-1">
                            <span className="font-bold text-lg">
                              {memberTotal.toFixed(0)}€
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">
                            {memberExpenseCount} gastos
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Columna central: Formulario */}
            <div className="bg-light-primary rounded-2xl p-6 shadow-lg flex flex-col">
              <h3 className="text-2xl font-semibold mb-6">
                Añadir nuevo gasto
              </h3>

              <div className="space-y-4 flex-1">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="expense-title"
                  >
                    Nombre del gasto
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    id="expense-title"
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ej: Cena en restaurante"
                    value={title}
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="expense-amount"
                  >
                    Cantidad
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    id="expense-amount"
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    type="number"
                    value={amount}
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="expense-category"
                  >
                    Categoría
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    id="expense-category"
                    onChange={(e) =>
                      setCategory(
                        e.target.value as
                          | "Vuelos"
                          | "Alojamiento"
                          | "Comida"
                          | "Transporte"
                          | "Otros",
                      )
                    }
                    value={category}
                  >
                    <option value="Vuelos">Vuelos</option>
                    <option value="Alojamiento">Alojamiento</option>
                    <option value="Comida">Comida</option>
                    <option value="Transporte">Transporte</option>
                    <option value="Otros">Otros</option>
                  </select>
                </div>

                <div>
                  <div className="block text-sm font-medium text-gray-700 mb-2">
                    Repartir entre
                  </div>
                  <div className="border border-gray-300 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-3">
                      {groupMembers.map((member) => (
                        <button
                          className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                            selectedMembers.includes(member)
                              ? "bg-cold-light-100 text-gray-700 shadow-md"
                              : "bg-light-secondary-100 text-gray-700 hover:bg-light-secondary-200"
                          }`}
                          key={member}
                          onClick={() => toggleMember(member)}
                          type="button"
                        >
                          {member}
                        </button>
                      ))}
                    </div>
                    {selectedMembers.length === 0 ? (
                      <p className="text-sm text-red-500 mt-2">
                        Selecciona al menos un miembro
                      </p>
                    ) : (
                      <p className="text-sm text-light-secondary-400 mt-2">
                        Has seleccionado {selectedMembers.length} {selectedMembers.length === 1 ? 'miembro' : 'miembros'}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  className="w-full bg-cold-light-500 hover:bg-cold-light-600 text-white px-6 py-4 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium text-lg mt-6"
                  onClick={handleAddOrUpdateExpense}
                  type="button"
                >
                  <Plus className="w-5 h-5" />
                  {editId ? "Actualizar gasto" : "Añadir gasto"}
                </button>
              </div>
            </div>

            {/* Columna derecha: Lista de gastos */}
            <div className="bg-light-primary rounded-2xl p-6 shadow-lg flex flex-col">
              <h3 className="text-2xl font-semibold mb-6">Lista de gastos</h3>

              <div className="space-y-4 flex-1">
                {expenses.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <div className="w-16 h-16 bg-light-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Plus className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-lg">No hay gastos aún</p>
                    <p className="text-sm">Añade el primer gasto del grupo</p>
                  </div>
                ) : (
                  expenses.map((expense) => (
                    <div
                      className="bg-light-secondary-50 rounded-lg p-4 hover:bg-light-secondary-100 transition-colors"
                      key={expense.id}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1 min-w-0">
                          <div className="mt-1 flex-shrink-0">
                            {iconForCategory(expense.category)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-lg capitalize truncate">
                              {expense.title}
                            </h4>
                            <p className="text-sm text-gray-600 mb-2">
                              {expense.category}
                            </p>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              <p className="text-sm text-gray-600 truncate">
                                {expense.sharedWith.join(", ")}
                              </p>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              {expense.sharedWith.length}{" "}
                              {expense.sharedWith.length === 1
                                ? "persona"
                                : "personas"}
                            </p>
                          </div>
                        </div>

                        <div className="text-right flex-shrink-0 ml-4">
                          <p className="text-xl font-bold text-indigo-900">
                            {expense.amount.toFixed(2)} €
                          </p>
                          <p className="text-sm text-gray-500 mb-3">
                            {(
                              expense.amount / expense.sharedWith.length
                            ).toFixed(2)}{" "}
                            € por persona
                          </p>
                          <div className="flex gap-2 justify-end">
                            <button
                              className="p-2 hover:bg-light-primary rounded-lg transition-colors"
                              onClick={() => handleEdit(expense)}
                              type="button"
                            >
                              <Pencil className="w-4 h-4 text-blue-600" />
                            </button>
                            <button
                              className="p-2 hover:bg-light-primary rounded-lg transition-colors"
                              onClick={() => handleDelete(expense.id)}
                              type="button"
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
