import axios from 'axios';
import { hostname, port } from './config';


class API {
  constructor() {
    this.axios = axios.create({
      baseURL: `https://${hostname}:${port}`
    });
  }

  setToken(value) {
    this.token = value;
  }

  async getJobs() {
    return this.axios.get('/v1/job', {
      headers: {
        'Authorization': this.token
      }
    }).then((res) => {
      return res;
    }).catch(console.log);
  }

  async getJob(jobId) {
    return this.axios.get(`/v1/job/${jobId}/`, {
      headers: {
        'Authorization': this.token
      }
    }).then((res) => {
      return res;
    }).catch(console.log);
  }

  async getReport(jobId) {
    return this.axios.get(`/v1/job/${jobId}/report`, {
      headers: {
        'Authorization': this.token
      }
    }).then((res) => {
      return res;
    }).catch(console.log);
  }

  async postJob(values) {
    return this.axios.post('/v1/job', {
      job: values
    }, {
      headers: {
        'Authorization': this.token
      }
    }).then((res) => {
      return res;
    }).catch(console.log);
  }

  async quitJob(jobId) {
    return this.axios.post(`/v1/job/${jobId}/cancel`, {
    }, {
      headers: {
        'Authorization': this.token
      }
    }).then((res) => {
      return res;
    }).catch(console.log);
  }

  async deleteJob(jobId) {
    return this.axios.post(`/v1/job/${jobId}/delete`, {
    }, {
      headers: {
        'Authorization': this.token
      }
    }).then((res) => {
      return res;
    }).catch(console.log);
  }

  async downloadJobResult(jobId, runName) {
    return this.axios.get(`/v1/job/${jobId}/${runName}/download`, {
      headers: {
        'Authorization': this.token
      },
      responseType: 'blob' // important
    }).then((response) => {
      console.log(response);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${jobId}-${runName}.zip`); //or any other extension
      document.body.appendChild(link);
      link.click();
    }).catch(console.log);
  }

}

const api = new API();

export default api;
