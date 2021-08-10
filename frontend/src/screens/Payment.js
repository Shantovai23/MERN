import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { initPayment } from "../actions/orderActions";
import { useSelector } from "react-redux";






const Payment = () => {
  
  const [sessionSuccess, setSessionSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDetail = useSelector((state) => state.orderDetails);
  const { order } = orderDetail;

 

  useEffect(() => {
    initPayment(userInfo.token,order._id)
      .then((response) => {  
        if (response.data.status === "SUCCESS") {
          setSessionSuccess(true);
          setRedirectUrl(response.data.GatewayPageURL);
          setFailed(false);
        }
      })
      .catch((err) => {
        setFailed(true);
        setSessionSuccess(false);
        console.log(err);
      });
  }, [userInfo.token,order]);

  return (
    <div>
      {sessionSuccess
        ? (window.location = redirectUrl)
        : "payment is processing..."}
      {failed ? (
        <>
          <p>failed to start payment</p> <Link to="/">Back</Link>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Payment;
