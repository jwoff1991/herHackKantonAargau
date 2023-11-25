import React, { useState, useEffect } from "react";
import { companiesWithPlastic } from "../assets/companyPlasticHoldings";
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';


import "./listPlasticComponent.css";

const ListPlasticComponent = () => {

  const [plastics, setPlastics] = useState([
    { plasticType: "", amountInKgs: "" },
  ]);
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Set the number of items per page

  // ... (existing code remains unchanged)

  const handlePlasticTypeChange = (index, e) => {
    const updatedPlastics = [...plastics];
    updatedPlastics[index].plasticType = e.target.value;
    setPlastics(updatedPlastics);
  };

  const handleAmountInKgsChange = (index, e) => {
    const updatedPlastics = [...plastics];
    updatedPlastics[index].amountInKgs = e.target.value;
    setPlastics(updatedPlastics);
  };

  const handleAddPlasticField = () => {
    setPlastics([...plastics, { plasticType: "", amountInKgs: "" }]);
  };

  const handleSearch = () => {
    // Perform search based on the plastics array
    // ...
  };

  const handleSubmit = (e) => {
    e.preventdefault()
    alert("Plastic listed")
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <h1>Selects the plastic you would like to list</h1>
        {plastics.map((plastic, index) => (
          <div key={index}>
            <select
              value={plastic.plasticType}
              onChange={(e) => handlePlasticTypeChange(index, e)}
            >
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
              value={plastic.amountInKgs}
              onChange={(e) => handleAmountInKgsChange(index, e)}
            />
            <div className="add-another-plastic">

            {index === plastics.length - 1 && (
                <Button variant="text" size="large" onClick={handleAddPlasticField}>
                <AddIcon />
              </Button>
            )}
            </div>
          </div>
        ))}
        <Button variant="contained" type="submit" onClick={handleSubmit}>Submit</Button>
      </form>
    </div>
  );
};

export default ListPlasticComponent;
