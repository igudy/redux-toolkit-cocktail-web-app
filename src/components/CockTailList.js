import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCocktails } from "../redux/features/cocktailSlice";
import { Link } from "react-router-dom";

const CockTailList = () => {
  const { cocktails, loading } = useSelector((state) => ({ ...state.app }));
  const [modifiedCocktail, setModifiedCocktail] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCocktails());
  }, [dispatch]);

  // Changing the name in the API, thats why we mapped here first before using it in the original
  useEffect(() => {
    if (cocktails) {
      const newCocktails = cocktails.map((item) => {
        const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } =
          item;
        return {
          id: idDrink,
          name: strDrink,
          image: strDrinkThumb,
          info: strAlcoholic,
          glass: strGlass,
        };
      });
      setModifiedCocktail(newCocktails);
    } else {
      setModifiedCocktail([]);
    }
  }, [cocktails]);

  if (loading) {
    return (
      <div className="spinner-grow" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  if (!cocktails) {
    return <h2>No cocktails matched your search criteria</h2>;
  }

  return (
    <div className="container my-5">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {modifiedCocktail.map((item) => {
          const { id, name, image, info, glass } = item;
          return (
            <div className="col" key={id}>
              <div className="card h-2">
                <img src={image} className="card-img-top" alt={name} />
              </div>
              <div className="card-body" style={{ textAlign: "left" }}>
                <h5 className="card-title">{name}</h5>
                <h4 className="card-title">{glass}</h4>
                <p className="card-text">{info}</p>
                <Link to={`/cocktail/${id}`}>
                  <button className="btn btn-info">Details</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CockTailList;
