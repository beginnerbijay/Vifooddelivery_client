import { toast } from 'react-toastify';
export const warning=(txt)=>{
    toast.warn(`${txt}`);
  }
export const error=(txt)=>{
    toast.error(`${txt}`);
  }
  export const success=(txt)=>{
    toast.success(`${txt}`);
  }