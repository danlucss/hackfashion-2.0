/* eslint-disable react-hooks/exhaustive-deps */
import "./Produto.css";
import { useParams } from "react-router-dom";
import { ButtonProduct } from "../../components/Button-product/Button-product";
import { useState, useEffect } from "react";
import { SimilarProducts } from "./SimilarProducts";

import "react-multi-carousel/lib/styles.css";

export const Produto = ({ produtosCarrinho, setProdutosCarrinho, url }) => {
  const params = useParams();
  const itemId = params.itemID;
  // const type = params.type;

  const [product, setProduct] = useState([
    {
      product_id: parseInt(itemId),
    },
  ]);

  useEffect(() => {
    fetch(`${url}/products/${itemId}`)
      .then(res => res.json())
      .then(resultado => {
        setProduct(resultado);
        let box = 0;
        let img = 0;
        setTimeout(() => {
          box = document.querySelector(".produto-item__container");
          img = document.querySelector(".produto__image");

          box.addEventListener("mousemove", e => {
            const x = e.clientX - e.target.offsetLeft;
            const y = e.clientY - e.target.offsetTop;

            img.style.transformOrigin = `${x}px ${y}px`;
            img.style.transform = "scale(2)";
          });

          box.addEventListener("mouseleave", () => {
            img.style.transformOrigin = `center center`;
            img.style.transform = "scale(1)";
          });
        }, 1);
      });

    // fetch(`${url}/products/${randomId}`)
    //   .then((res) => res.json())
    //   .then((resultado) => {
    //     setFilter(resultado)
    //     console.log("aqui")
    //     console.log(filter)
    //   });

    // Return aleatories products
  }, [itemId]);

  const formatPrice = price => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };



  return (
    <>
      {!product[0] && (
        <>
          <h1>carregando</h1>
        </>
      )}
      {product[0] && (
        <>
          <section className="produto__container">
            <div className="produto__image-box">
              <div className="produto-item__container">
                <img className="produto__image" src={product[0].img_link} alt={product[0].name} />
              </div>
            </div>
            <div className="produto__info">
              <h2 className="produto__title">{product[0].name}</h2>

              {/* Produto em oferta */}
              {product[0].offer_percent > 0 && (
                <h2 id="produto__offer">
                  {formatPrice(product[0].price - product[0].price * product[0].offer_percent)}
                </h2>
              )}
              {/* Produto normal */}
              {product[0].offer_percent === 0 && (
                <h2 className="produto__normal">{formatPrice(product[0].price)}</h2>
              )}

              <ButtonProduct
                produto={product[0]}
                produtosCarrinho={produtosCarrinho}
                setProdutosCarrinho={setProdutosCarrinho}
                url={url}
              />
            </div>
          </section>

          <section className="similar__products__container">
            <h2
              style={{
                textAlign: "center",
                fontSize: "2.5rem",
                marginTop: "2rem",
                marginBottom: "3rem",
              }}
              className="similar__title"
            >
              Produtos similares
            </h2>
            <div className="similar__products">

              <SimilarProducts />
              <SimilarProducts />
              <SimilarProducts />
              <SimilarProducts />
              <SimilarProducts />

            </div>
          </section>
        </>
      )}
    </>
  );
};
