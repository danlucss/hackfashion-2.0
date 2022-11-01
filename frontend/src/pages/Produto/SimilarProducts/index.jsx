/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Produtos } from "../../../components/Produtos/Produtos";

export const SimilarProducts = () => {
    const [filter, setFilter] = useState([]);
    const randomId = Math.floor(Math.random() * 15) + 1;
    const url = "http://localhost:3000";

    useEffect(() => {
        fetch(`${url}/products/${randomId}`)
            .then(res => res.json())
            .then(resultado => {
                setFilter(resultado);
                console.log("aqui");
            });
    }, []);

    return (
        <>
            <div className="produtos__container">
                {filter.map(produto => (
                    <Produtos key={produto.product_id} produto={produto} />
                ))}

            </div>
        </>
    );
};
