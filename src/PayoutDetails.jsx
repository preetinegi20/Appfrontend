import React, { useState, useContext, useEffect } from "react";
import { useFilter } from "./Context/FilterContext";
import Toggle from "./menu/Toggle";
import jsPDF from "jspdf";
import "jspdf-autotable";

function PayoutDetails() {
  // const ArticleContextUse = useContext(ArticleContext);
  // const articles = ArticleContextUse.article;

  const [ratePerArticle, setRatePerArticle] = useState(5000); // Default payout rate (INR)
  const [payouts, setPayouts] = useState({});
  const [editingAuthor, setEditingAuthor] = useState(null);
  const { filters, articles } = useFilter();
  // Calculate payouts based on articles and rate
  const calculatePayouts = () => {
    const authorPayouts = {};
    const authorArticles = {};

    articles.forEach((article) => {
      const author = article.author || "Unknown";
      if (!authorPayouts[author]) {
        authorPayouts[author] = 0;
        authorArticles[author] = 0;
      }
      authorPayouts[author] += ratePerArticle;
      authorArticles[author] += 1;
    });

    setPayouts({ authorPayouts, authorArticles });
  };

  useEffect(() => {
    calculatePayouts();
  }, [articles, ratePerArticle]);

  const handleRateChange = (e, author) => {
    const newRate = Number(e.target.value);
    setPayouts((prevPayouts) => {
      const updatedPayouts = { ...prevPayouts };
      updatedPayouts.authorPayouts[author] =
        newRate * payouts.authorArticles[author];
      return updatedPayouts;
    });
  };

  // Export as PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Payout Report", 14, 20);

    const tableData = Object.entries(payouts.authorPayouts || {}).map(
      ([author, total]) => [
        author,
        payouts.authorArticles[author],
        total,
        ratePerArticle,
      ]
    );

    doc.autoTable({
      head: [["Author", "Articles", "Total Payout (INR)", "Rate Per Article"]],
      body: tableData,
    });

    doc.save("payout-report.pdf");
  };

  // Export as CSV
  const exportToCSV = () => {
    const csvData = [
      ["Author", "Articles", "Total Payout (INR)", "Rate Per Article"],
      ...Object.entries(payouts.authorPayouts || {}).map(([author, total]) => [
        author,
        payouts.authorArticles[author],
        total,
        ratePerArticle,
      ]),
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvData.map((row) => row.join(",")).join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "payout-report.csv");
    link.click();
  };

  // Export to Google Sheets
  const exportToGoogleSheets = () => {
    const SHEET_ID = "YOUR_GOOGLE_SHEET_ID"; // Replace with your Google Sheet ID
    const API_KEY = "YOUR_API_KEY"; // Replace with your API key
    const ENDPOINT = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/A1:append?valueInputOption=USER_ENTERED&key=${API_KEY}`;

    const rows = [
      ["Author", "Articles", "Total Payout (INR)", "Rate Per Article"],
      ...Object.entries(payouts.authorPayouts || {}).map(([author, total]) => [
        author,
        payouts.authorArticles[author],
        total,
        ratePerArticle,
      ]),
    ];

    fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: rows }),
    })
      .then((response) => response.json())
      .then(() => alert("Data successfully exported to Google Sheets!"))
      .catch((error) =>
        alert("Error exporting to Google Sheets: " + error.message)
      );
  };

  return (
    <div className="payout-details-container">
      <Toggle></Toggle>
      <h1>Payout Details</h1>
      <div className="export-buttons">
        <button onClick={exportToPDF}>Export as PDF</button>
        <button onClick={exportToCSV}>Export as CSV</button>
        <button onClick={exportToGoogleSheets}>Export to Google Sheets</button>
      </div>
      <table className="payout-table">
        <thead>
          <tr>
            <th>Author</th>
            <th>Articles</th>
            <th>Total Payout (INR)</th>
            <th>Edit Payout Rate (Per Article)</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(payouts.authorPayouts || {}).map(
            ([author, total], index) => (
              <tr key={index}>
                <td>{author}</td>
                <td>{payouts.authorArticles[author]}</td>
                <td>{total}</td>
                <td>
                  {editingAuthor === author ? (
                    <input
                      type="number"
                      defaultValue={ratePerArticle}
                      onChange={(e) => handleRateChange(e, author)}
                      onBlur={() => setEditingAuthor(null)}
                    />
                  ) : (
                    <button onClick={() => setEditingAuthor(author)}>
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PayoutDetails;
