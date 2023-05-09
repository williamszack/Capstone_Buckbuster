import { toast } from 'react-toastify';

const useNotification = () => {

  const toastNotify = (message, statusType) => {
    toast[statusType](message, {
      position: "top-center",
      autoClose: 1800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };
  return { toastNotify };
};

export default useNotification;