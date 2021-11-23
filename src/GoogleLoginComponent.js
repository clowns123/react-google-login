import React, { useEffect, useState } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";

const GoogleLoginComponent = () => {
  const CLIENT_ID =
    "942321812295-i91tot2126378amv76vpcs7dqbb8facv.apps.googleusercontent.com";

  const [isLoggedIn, setIsLoggedIn] = useState();
  const [userInfo, setUserInfo] = useState({ name: "", emailId: "" });

  const responseGoogleSuccess = (response) => {
    console.log();
    let userInfo = {
      name: response.profileObj.name,
      emailId: response.profileObj.email,
    };
    setIsLoggedIn(true);
    setUserInfo({ userInfo });
  };
  const responseGoogleError = (response) => {
    console.log(response);
  };

  const logout = (response) => {
    console.log(response);
    window.sessionStorage.removeItem("access_token");
    window.sessionStorage.removeItem("nama");
    let userInfo = {
      name: "",
      emailId: "",
    };
    setIsLoggedIn(false);
    setUserInfo({ userInfo });
  };

  useEffect(() => {}, []);

  return (
    <div className="row mt-5">
      <div className="col-md-12">
        {isLoggedIn ? (
          <div>
            <h1>Welcome, {userInfo.name}</h1>

            <GoogleLogout
              clientId={CLIENT_ID}
              buttonText={"Logout"}
              onLogoutSuccess={logout}
            ></GoogleLogout>
          </div>
        ) : (
          <GoogleLogin
            clientId={CLIENT_ID}
            buttonText="Sign In with Google"
            onSuccess={responseGoogleSuccess}
            onFailure={responseGoogleError}
            isSignedIn={true}
            cookiePolicy={"single_host_origin"}
          />
        )}
      </div>
    </div>
  );
};

export default GoogleLoginComponent;
