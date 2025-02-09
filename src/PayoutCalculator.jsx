// export default PayoutCalculator;
import React, { useContext, useState, useEffect } from "react";
import { ArticleContext } from "./Context/Article";
import Toggle from "./menu/Toggle";
function PayoutCalculator() {
  const ArticleContextUse = useContext(ArticleContext);
  const articles = ArticleContextUse.article;

  const [ratePerArticle, setRatePerArticle] = useState(5000); // rs50 per article
  const [payouts, setPayouts] = useState({});
  const calculatePayout = () => {
    const authorPayouts = {};

    articles.forEach((article) => {
      const author = article.author || "Unknown";
      if (!authorPayouts[author]) {
        authorPayouts[author] = 0;
      }
      authorPayouts[author] += ratePerArticle;
    });

    localStorage.setItem("payouts", JSON.stringify(authorPayouts));

    return authorPayouts;
  };

  useEffect(() => {
    const calculatedPayouts = calculatePayout();
    setPayouts(calculatedPayouts);
  }, [articles, ratePerArticle]); // Depend on articles and ratePerArticle

  return (
    <>
      <Toggle></Toggle>
      <div className="payout-container">
        <h3>Payout Calculator</h3>
        <div className="container">
          <div className="rate-input">
            <label htmlFor="rate">Set Rate per Article (INR):</label>
            <input
              type="number"
              id="rate"
              value={ratePerArticle}
              onChange={(e) => setRatePerArticle(Number(e.target.value))}
            />
          </div>
          <div className="payout-list">
            <h4>Payout Summary:</h4>
            <ul>
              {Object.entries(payouts).map(([author, total], index) => (
                <li key={index}>
                  <strong>{author}:</strong> {total} rs
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default PayoutCalculator;
