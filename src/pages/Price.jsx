import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Price(props) {
  const apiKey = "xxxxxxxxxx";
  const params = useParams();
  const symbol = params.symbol;
  const url = `https://rest.coinapi.io/v1/exchangerate/${symbol}/USD?apikey=${apiKey}`;
  const [coin, setCoin] = useState(null);

  // useEffect to run getCoin when component mounts.
  useEffect(() => {
    const getCoin = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setCoin(data);
      } catch (e) {
        console.error(e);
      }
    };
    getCoin();
  }, []);
  const loaded = () => {
    return (
      <>
        <h1>
          {coin.asset_id_base}/{coin.asset_id_quote}
        </h1>
        <h2>{coin.rate}</h2>
      </>
    );
  };

  // Function for when data doesn't exist.
  const loading = () => {
    return <h1>Loading...</h1>;
  };

  // If coin has data, run the loaded function; otherwise, run loading.
  return coin && coin.rate ? loaded() : loading();
}
