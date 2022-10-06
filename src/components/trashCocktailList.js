import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCocktails } from "../redux/features/cocktailSlice";

const CocktailList = () => {
  const { cocktails, loading } = useSelector((state) => ({ ...state.app }));
  const [modifiedCocktail, setModifiedCocktail] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCocktails());
  }, [dispatch]);

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
      <>
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        <p>Loading...</p>
      </>
    );
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

export default CocktailList;
