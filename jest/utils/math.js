// math.js
import axios from 'axios'
export function add(a, b) {
    return a + b;
  }
  
  export function minus(a, b) {
    return a - b;
  }
  
  export function multi(a, b) {
    return a * b;
  }

  export const getData = () => {
    return axios.get("http://www.dell-lee.com/react/api/demo.json");
    // return axios.get("http://www.dell-lee.com/react/api_error/demo.json");
  }