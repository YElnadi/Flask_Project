import { useSelector, useDispatch } from "react-redux";
import { login } from "../store/session";

const DemoButton = () => {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const demoLogin = async (e) => {
    e.preventDefault();
    await dispatch(login("demo@aa.io", "password"));
  };

  return (
    <button onClick={demoLogin} id="demo-button">
      Demo Button
    </button>
  );
};

export default DemoButton;
