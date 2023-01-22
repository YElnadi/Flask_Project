import { useDispatch } from "react-redux";
import { login } from "../store/session";

const DemoButton = () => {
  const dispatch = useDispatch();
  const demoLogin = async (e) => {
    e.preventDefault();
    await dispatch(login("demo@aa.io", "password"));
  };

  return (
    <button onClick={demoLogin} className='demo-btn' id="demo-button">
      Demo Button
    </button>
  );
};

export default DemoButton;
