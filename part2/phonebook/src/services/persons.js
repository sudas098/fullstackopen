import axios from "axios";
const basicUrl = '/api/persons';

const getAll = () => {

      const request = axios.get(basicUrl);
      return request.then(response => response.data);
}

const create = (newObject) => {

    const request = axios.post(basicUrl, newObject);
      return request.then(response => response.data);
}

const update = (id, changedPerson) => {

      const request = axios.put(`${basicUrl}/${id}`, changedPerson);
      return request.then(res => res.data);
}

const remove = (id ) => {

    const request = axios.delete(`${basicUrl}/${id}`);
      return request.then(response => response.data);
}

export default { getAll, create, remove, update }