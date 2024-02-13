import { useState, useEffect } from "react";

export default function SearchBar() {
  const promise = "https://restcountries.com/v3.1/all";
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  //establece el parametro de busqueda a una cadena de texto vacia.
  const [q, setQ] = useState("");
  //set search parameters establece parametros de busqueda.
  //solo queremos buscar paises por capital y nombre
  //esta lista puede ser mas larga si quieres
  //solo tienes que agregarlo al arreglo
  const [searchParam] = useState(["capital"]);


  const [filterParam, setFilterParam] = useState(["All"]);

  //Nota: el array vacio [] significa que este useEffect correra una sola ves
  // parecido a componentDidMount()

  useEffect(() => {
    fetch(promise)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          console.log(result);
        },
        //Nota: Es importante manenjar los errores aqui en vez de un bloque
        // catch para evitar tragarnos excepciones de errores de componentes
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, []);

  function search(items) {
    return items.filter((item) => {

      /**aqui vamos a chequear se nuestra region es igual a nuestro estado 
       * si es igual, entonces debera retornar solo los elementos que cumplan con el criterio
       * de busqueda caso contrario, debera retornar todos los paises.
       */

      if (item.region == filterParam || filterParam == "All") {
        return searchParam.some((newItem) => {
          const commomName = item.name?.common || "";
          const itemValue = item[newItem];
          if (itemValue != undefined && itemValue != null) {
            return (
              item[newItem]
                .toString()
                .toLowerCase()
                .indexOf(q.toLowerCase()) > -1
            );
          };
          return false;
        });
      }
    }
    )
  };

  if (error) {
    return <>{error.message} No se Encontraron paises</>
  } else if (!isLoaded) {
    return <>Loading...</>
  } else {
    return (
      /*Aqui vamos a iterar sobre el elemento y mostrar cada uno como una tarjeta */
      <div className="wrapper">
        <div className="search-wrapper">
          <label htmlFor="htmlForm">
            <input
              type="search"
              name="search-form"
              id="search-form"
              className="search-input"
              placeholder="Search for..."
              value={q}

              /**
               * establece el valor de nuestro parametro q del useState
               * cada vez que el usuario tipea en el campo de busqueda
               */
              onChange={(e) => setQ(e.target.value)}
            />

            <span className="sr-only">
              search countries here
            </span>
          </label>
          <select
            /**aqui vamos a crear un input de seleccion basico 
             * establecemos el valior por defecto y actualizamos
             * el estado de setFilterParam() cada
             * vez que se llama a onChange
             */

            onChange={(e) => {
              setFilterParam(e.target.value);
            }}
            className="custom-select"
            aria-label="Filter Countries By Region">
            <option value="All">Filter By Region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
          <span className="focus"></span>
        </div>
        <ul className="card-grid">
          {search(items).map((item) => (
            <li>
              <article className="card" key={item.callingCodes}>
                <div className="card-image">
                  <img src={item.flags.png} alt={item.flags.alt} />
                </div>
                <div className="card-content">
                  <h2 className="card-name">{item.name.common}</h2>
                  <ol className="card-list">
                    <li>
                      Population:{" "}
                      <span>{item.population}</span>
                    </li>
                    <li>
                      Region: <span>{item.region}</span>
                    </li>
                    <li>
                      Capital: {item.capital}
                    </li>
                  </ol>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}