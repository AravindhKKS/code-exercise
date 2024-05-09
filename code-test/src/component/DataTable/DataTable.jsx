import React, { useEffect, useState } from 'react';
import './DataTable.css';
import axios from 'axios';
import Popup from '../Popup/Popup';

const DataTable = () => {
  const [showForm, setShowForm] = useState(false);
  const [datas, setDatas] = useState([]);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  //FETCH TH DATA FROM DATADOG
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_DATADOG_API + '/datadog');
        setDatas(res.data);
      } catch (err) {
        console.log('Error :', err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <div  className={showForm ? 'blur' : 'sub_Containter'}>
      <table   >
        <thead>
          <tr>
             <th className='table_head'>Name</th>
             <th className='table_head'>Message</th>
             <th className='table_head'>Query</th>
             <th className='table_head'>Type</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data, index) => (
            <tr key={index}>
              <td className='table-data'>{data.name}</td>
              <td className='table-data'>{data.message}</td>
              <td className='table-data'>{data.query}</td>
              <td className='table-data'>{data.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showForm ? null : (
        <button className='add_item_button' onClick={toggleForm}>Add New Item</button>
      )}
       </div>
      {showForm && (<Popup />)}
    </div>
  );
};

export default DataTable;

