import React, { useState, useEffect } from "react";
import { companiesWithPlastic } from "../assets/companyPlasticHoldings";
import "./plasticSearchBar.css";

const PlasticSearch = () => {
  const [plasticType, setPlasticType] = useState('');
  const [amountInKgs, setAmountInKgs] = useState('');
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Set the number of items per page
  const [selectedCompany, setSelectedCompany] = useState(null);


  useEffect(() => {
    const filteredResults = companiesWithPlastic.filter((company) => {
      const plasticAmount = company.plasticAvail[plasticType]?.amount || 0;
      return (
        (plasticType === "" || plasticAmount > 0) &&
        (amountInKgs === "" || plasticAmount >= parseInt(amountInKgs, 10))
      );
    });

    setResults(filteredResults);
    setCurrentPage(1); // Reset to the first page on new search
  }, [plasticType, amountInKgs]);

  const handlePlasticType = (e) => {
    setPlasticType(e.target.value);
  };

  const handleAmountInKgs = (e) => {
    setAmountInKgs(e.target.value);
  };

  const handleSearch = () => {
    const filteredResults = companiesWithPlastic.filter((company) => {
      const plasticAmount = company.plasticAvail[plasticType]?.amount || 0;
      return (
        (plasticType === "" || plasticAmount > 0) &&
        (amountInKgs === "" || plasticAmount >= parseInt(amountInKgs, 10))
      );
    });

    setResults(filteredResults);
    setCurrentPage(1); // Reset to the first page on new search
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = results.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleContactClick = (company) => {
    if (selectedCompany === company) {
      setSelectedCompany(null); // Close contact info if the same company is clicked again
    } else {
      setSelectedCompany(company); // Show contact info for the clicked company
    }
  };

  return (
    <div>
      <div className="search-container">
        <select value={plasticType} onChange={handlePlasticType}>
          <option value="">All</option>
          <option value="#1 PET(E) Polyethylene terephthalate">
            #1 PET(E) Polyethylene terephthalate
          </option>
          <option value="#2 PEHD or HDPE High-density polyethylene">
            #2 PEHD or HDPE High-density polyethylene
          </option>
          <option value="#3 PVC Polyvinyl chloride">
            #3 PVC Polyvinyl chloride
          </option>
          <option value="#4 PELD or LDPE Low-density polyethylene">
            #4 PELD or LDPE Low-density polyethylene
          </option>
          <option value="#5 PP Polypropylene">#5 PP Polypropylene</option>
          <option value="#6 PS Polystyrene">#6 PS Polystyrene</option>
          <option value="#7 O(ther) All other plastics">
            #7 O(ther) All other plastics
          </option>
          <option value="#9 or #ABS Acrylonitrile Butadiene Styrene">
            #9 or #ABS Acrylonitrile Butadiene Styrene
          </option>
        </select>
        <input
          type="number"
          placeholder="Amount in kgs"
          value={amountInKgs}
          onChange={handleAmountInKgs}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="results-container">
        {currentItems.length === 0 ? (
          <p>No companies found with the specified criteria.</p>
        ) : (
          currentItems.map((company) => (
            <div key={company.id}>
              <h3>{company.companyName}</h3>
              <ul>
                {Object.entries(company.plasticAvail)
                  .filter(([plastic, details]) => details.amount > 0)
                  .map(([plastic, details]) => (
                    <li key={plastic}>
                      {plastic}: {details.amount} kgs
                    </li>
                  ))}
              </ul>
              <button className="contact-button" onClick={() => handleContactClick(company)}>
                Contact
              </button>
              {selectedCompany === company && (
                <div>
                  <p>Phone: {company.contactInfo.phoneNumber}</p>
                  <p>Address: {company.contactInfo.address}</p>
                </div>
              )}
            </div>
          ))
        )}

        {/* Pagination */}
        {results.length > itemsPerPage && (
          <div className="pagination">
            {[...Array(Math.ceil(results.length / itemsPerPage))].map(
              (_, index) => (
                <button key={index + 1} onClick={() => paginate(index + 1)}>
                  {index + 1}
                </button>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlasticSearch;
