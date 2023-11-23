import React from "react";
import Cookies from "universal-cookie";
import Button from "@mui/material/Button";

const cookies = new Cookies();

export default function LogoutComponent() {
  // set an initial state for the message we will receive after the API call
//   const [message, setMessage] = useState("");

  // logout
  const logout = () => {
    // destroy the cookie
    cookies.remove("TOKEN", { path: "/" });
    // redirect user to the landing page
    window.location.href = "/login";
  }

  return (
    <div className="text-center">
      {/* logout */}
      <Button type="submit" variant="danger" onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
}