// import { FaExclamationCircle } from 'react-icons/fa';

function Error({ title, children }) {
  return (
    <div className="error">
      <div className="icon">icon error</div>
      <h2>{title}</h2>
      {children}
    </div>
  );
}

export default Error;
