import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CollectionForm() {
  const navigate = useNavigate();
  const [institutionData, setInstitutionData] = useState([]);
  const [userData, setUserData] = useState([]);

  /** Getting institutions */
  const getInstitution = () => {
    axios
      .get(
        'http://localhost/national_archives_admin_panel/api/collection.php?type=institution'
      )
      .then((response) => {
        console.log(response);
        setInstitutionData(response.data);
      })
      .catch((error) => {
        console.log(error);
        window.addEventListener('unhandledrejection', function (event) {
          console.error(
            'Unhandled rejection (promise: ',
            event.promise,
            ', reason: ',
            event.reason,
            ').'
          );
        });
      });
  };

  /** GetInstitution and UserData */
  useEffect(() => {
    setUserData(JSON.parse(Cookies.get('userData')));
    getInstitution();
  }, []);

  const [data, setData] = useState({
    institution_id: 0,
    collection_id: '',
    collection_name: '',
    collection_background: '',
    collection_summary: '',
    series_id: '',
    series_name: '',
    series_desc_code: '',
    description: '',
    sub_series_code: '',
    sub_series_name: '',
    user_id: 0,
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });

    console.log(data);
  };

  const submitForm = (e) => {
    e.preventDefault();
    const sendData = {
      institution_id: data.institution_id,
      collection_id: data.collection_id,
      emacollection_nameil: data.collection_name,
      collection_background: data.collection_background,
      collection_summary: data.collection_summary,
      series_id: data.series_id,
      series_name: data.series_name,
      series_desc_code: data.series_desc_code,
      description: data.description,
      sub_series_code: data.sub_series_code,
      sub_series_name: data.sub_series_name,
      user_id: userData[0],
    };

    console.log(sendData);

    axios
      .post(
        'http://localhost/national_archives_admin_panel/api/authentication.php',
        sendData
      )
      .then((result) => {
        if (result.data.Status === 'Invalid') {
          alert('Invalid User');
        } else {
          navigate(`/Login`);
        }

        console.log(userData);
      });
  };
  return (
    <div>
      <form className="col-8 m-auto" onSubmit={submitForm}>
        <h3 className="mt-3">Institution</h3>
        <select
          name="institution_id"
          onChange={handleChange}
          value={data.institution_id}
          className="form-select mb-3"
          role="button"
        >
          <option selected="true" disabled="disabled">
            Select institution
          </option>
          {institutionData.map((x, i) => {
            return (
              <option key={i} value={x.inst_id}>
                {x.Name}
              </option>
            );
          })}
        </select>

        <h3 className="mt-3">Collection</h3>
        <input
          className="form-control mt-3"
          name="collection_id"
          type="text"
          placeholder="Collectio ID"
          onChange={handleChange}
          value={data.collection_id}
        />
        <input
          className="form-control mt-3"
          type="text"
          name="collection_name"
          placeholder="Collectio name"
          onChange={handleChange}
          value={data.collection_name}
        />
        <textarea
          className="form-control mt-3"
          type="text"
          name="collection_background"
          placeholder="Collection background"
          onChange={handleChange}
          value={data.collection_background}
        />
        <input
          className="form-control mt-3"
          type="text"
          name="collection_summary"
          placeholder="Collectio summary"
          onChange={handleChange}
          value={data.collection_summary}
        />

        <h3 className="mt-3">Series</h3>
        <input
          className="form-control mt-3"
          type="text"
          name="series_id"
          placeholder="Series ID"
          onChange={handleChange}
          value={data.series_id}
        />
        <input
          className="form-control mt-3"
          type="text"
          name="series_name"
          placeholder="Series name"
          onChange={handleChange}
          value={data.series_name}
        />
        <h3 className="mt-3">Series description</h3>
        <input
          className="form-control mt-3"
          type="text"
          name="series_desc_code"
          placeholder="Series description code"
          onChange={handleChange}
          value={data.series_desc_code}
        />
        <textarea
          className="form-control mt-3"
          type="text"
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={data.description}
        />
        <h3 className="mt-3">Sub series</h3>
        <input
          className="form-control mt-3"
          type="text"
          name="sub_series_code"
          placeholder="Sub series code"
          onChange={handleChange}
          value={data.sub_series_code}
        />
        <input
          className="form-control mt-3"
          type="text"
          name="sub_series_name"
          placeholder="Sub series name"
          onChange={handleChange}
          value={data.sub_series_name}
        />
        <button
          className="btn mt-4"
          style={{ backgroundColor: '#353b48', color: 'white' }}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
