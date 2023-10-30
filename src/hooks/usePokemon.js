import { useEffect } from "react";

function usePokemon(idArr, dispatch) {
  useEffect(
    function () {
      if (!idArr.length) return;
      async function fetchPokemon(id) {
        try {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

          if (!res.ok)
            throw new Error(`Pokemon data not found (${res.status})`);

          const data = await res.json();

          return { name: data.name, img: data.sprites.front_default };
        } catch (err) {
          dispatch({ type: "failedFetching", payload: err.message });
          console.error(err);
        }
      }

      const dataArr = idArr.map((id) => fetchPokemon(id));

      Promise.all(dataArr).then((data) =>
        data.every((obj) => obj !== undefined)
          ? dispatch({ type: "dataReceived", payload: data })
          : []
      );
    },
    [JSON.stringify(idArr), dispatch]
  );
}

export default usePokemon;
