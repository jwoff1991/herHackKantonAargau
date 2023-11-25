import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { companiesWithPlastic } from "../assets/companyPlasticHoldings";
import React, { useState, useEffect } from "react";
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

  const [openModal, setOpenModal] = useState(false);
  const [modalFormData, setModalFormData] = useState({
    company: '',
    plastics: [],
  });

  const handleOpenModal = (company) => {
    setModalFormData({
      company: company.companyName,
      plastics: Object.entries(company.plasticAvail)
        .filter(([_, details]) => details.amount > 0)
        .map(([plastic, details]) => ({
          plastic,
          amount: 0, // Set default amount to 0 for each plastic
        })),
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubmitModal = () => {
    // Logic to handle form submission
    handleCloseModal();
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
              <div className="company-details">
                <div className="company-name">
                  <h3>{company.companyName}</h3>
                  <p>Phone: {company.contactInfo.phoneNumber}</p>
                  <p>Address: {company.contactInfo.address}</p>
                </div>
                <ul>
                  <h4>Plastics Available</h4>
                  {Object.entries(company.plasticAvail)
                    .filter(([plastic, details]) => details.amount > 0)
                    .map(([plastic, details]) => (
                      <li key={plastic} className="plastic-and-amount">
                        <span className="plastic-name">{plastic}:</span>
                        <span className="plastic-amount">
                          {details.amount} kgs
                        </span>
                      </li>
                    ))}
                </ul>
                <div className="contact-info">
                  <Button
                    variant="contained"
                    onClick={() => handleOpenModal(company)}
                  >
                    Request
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
        {/*Moodal */}
        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogTitle>Request Plastics</DialogTitle>
          <DialogContent>
            <p>{modalFormData.company}</p>
            <form>
              {modalFormData.plastics.map((item, index) => (
                <div key={index} className="plastic-input">
                  <TextField
                    label={`${item.plastic} (kgs)`}
                    type="number"
                    value={item.amount}

                    onChange={(e) =>
                      setModalFormData((prevData) => ({
                        ...prevData,
                        plastics: prevData.plastics.map((plastic, idx) =>
                          idx === index
                            ? { ...plastic, amount: e.target.value }
                            : plastic
                        ),
                      }))
                    }
                  />
                </div>
              ))}
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button
              onClick={handleSubmitModal}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>

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
