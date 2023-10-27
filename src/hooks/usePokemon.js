import { useEffect } from "react";

function usePokemon(idArr, dispatch) {
  useEffect(
    function () {
      if (!idArr.length) return;
      async function fetchPokemon(id) {
        try {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

          if (!res.ok) throw new Error("Pokemon data not found");

          const data = await res.json();

          return { name: data.name, img: data.sprites.front_default };
        } catch (err) {
          dispatch({ type: "failedFetching", payload: err });
          console.error(err);
        }
      }

      const dataArr = idArr.map((id) => fetchPokemon(id));
      Promise.all(dataArr).then((data) =>
        dispatch({ type: "dataReceived", payload: data })
      );
    },
    [JSON.stringify(idArr), dispatch]
  );
}

export default usePokemon;
