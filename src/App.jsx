import React from "react";
import shortid from "shortid";

function App() {
  const [tarea, setTarea] = React.useState("");
  const [tareas, setTareas] = React.useState([]);
  const [modoEdicion, setModoEdicion] = React.useState(false);
  const [id, setId] = React.useState("");
  const [error, setError] = React.useState(null);

  const agregarTarea = (event) => {
    event.preventDefault();

    if (!tarea.trim()) {
      console.log("Elemento vacio");
      setError("Escriba algo Por favor...");
      setTimeout(() => setError(null), 2200);
      return;
    }

    setTareas([...tareas, { id: shortid.generate(), nombreTarea: tarea }]);
    console.log(tarea);
    setTarea("");
  };

  const editarTarea = (event) => {
    event.preventDefault();
    if (!tarea.trim()) {
      console.log("Elemento vacio");
      setError("Escriba algo Por favor...");
      setTimeout(() => setError(null), 2200);
      return;
    }

    setTareas(
      tareas.map((item) => (item.id === id ? { id, nombreTarea: tarea } : item))
    );
    setModoEdicion(false);
    setTarea("");
    setId("");
  };

  const eliminarTarea = (id) => {
    setTareas(tareas.filter((item) => item.id !== id));
  };

  const editar = (item) => {
    console.log("editar");
    setModoEdicion(true);
    setTarea(item.nombreTarea);
    setId(item.id);
  };

  return (
    <div className="container">
      <h1 className="text-center">CRUD Simple</h1>
      <hr />

      <main className="row">
        <section className="col-8">
          <h4 className="text-center">Listas de Tareas</h4>
          <ul className="list-group">
            {tareas.length === 0 ? (
              <li className="list-group-item text-center">No hay Tareas</li>
            ) : (
              tareas.map((datos, index) => {
                return (
                  <li key={datos.id} className="list-group-item">
                    <span className="lead">{datos.nombreTarea}</span>

                    <button
                      onClick={() => eliminarTarea(datos.id)}
                      className="btn btn-sm btn-danger float-end mx-2"
                      type="button"
                    >
                      Eliminar
                    </button>
                    <button
                      className="btn btn-sm btn-warning float-end "
                      onClick={() => editar(datos)}
                      type="button"
                    >
                      Editar
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </section>
        <section className="col-4">
          <h4 className="text-center">
            {modoEdicion ? "Editar Tarea" : "Agregar Tarea"}
          </h4>

          <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
            {error ? <span className="text-danger">{error}</span> : null}
            <input
              type="text"
              onChange={(e) => setTarea(e.target.value)}
              value={tarea}
              className="form-control mb-2"
              placeholder="Ingrese Tarea"
            />
            {modoEdicion ? (
              <button type="submit" className="btn btn-warning w-100">
                Editar
              </button>
            ) : (
              <button type="submit" className="btn btn-dark w-100">
                Agregar
              </button>
            )}
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;
