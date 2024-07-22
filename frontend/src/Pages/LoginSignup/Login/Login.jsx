import React, { useState, useEffect } from "react";
import { Box, Button, Image, Input, Text, useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAPI } from "../../../Redux/Auth/auth.action";

import {
  loginFailedToast,
  loginSuccessToast,
  serverErrorToast,
} from "../../../Controllers/login.controller";
import { useLoginUserMutation } from "../../../Redux/services/auth";
import { authMessages } from "../../../constants";
// import { AxiosError } from "axios";

const Login = () => {
  const [loginUser, { isError, isLoading, isSuccess }] = useLoginUserMutation();
  // const { token, loading, error } = useSelector(store => store.auth);
  const loading = false;
  const error = false;
  const token = "";
  // console.log(token, 'state')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const [text, setText] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await loginUser(text);
        console.log("Response received:", res);
        
        if (res.error && res.error.status >= 400 && res.error.status < 500) {//Client Side Error
            const responseMessage = authMessages[res.error.data.messageKey];
            loginFailedToast(toast, responseMessage);
        } else if (res.error && (res.error.status >= 500 || res.error.status === "FETCH_ERROR")) {//Server sider error and fetch Error
            const responseMessage = authMessages[res?.error?.data?.messageKey] || "Fetch Error";
            serverErrorToast(toast, responseMessage);
        } else if (res.data) {//login Successful
            const responseMessage = authMessages[res.data.messageKey];
            loginSuccessToast(toast, responseMessage);
        } else {
            throw new Error("Try After Sometime");
        }
    } catch (err) {
        console.error("Caught an error:", err);
        if (err.response) {
            // The request was made and the server responded with a status code outside the 2xx range
            console.error("Error response data:", err.response.data);
            console.error("Error response status:", err.response.status);
            console.error("Error response headers:", err.response.headers);
        } else if (err.request) {
            // The request was made but no response was received
            console.error("Error request data:", err.request);
        } else {
            // Something happened in setting up the request that triggered an error
            console.error("Error message:", err.message);
        }
    }
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setText({
      ...text,
      [name]: value,
    });
  };

  useEffect(() => {
    if (token) navigate("/project");
  }, []);

  return (
    <Box display="flex" maxW="100%">
      <Box
        w="50%"
        display={{ base: "none", md: "block" }}
        bgColor="#2e4476"
        bgSize="100% 100%"
        minH="100vh"
        bgGradient={`url('https://pro.trackingtime.co/img/ui-login-background.svg')`}
      ></Box>

      {/* rightBox */}
      <Box w={{ base: "100%", md: "50%" }} py={{ base: "40px", md: "60px" }}>
        <Image
          src="https://trackingtime.co/wp-content/themes/trackingtime-v5/img/layout/header/logo.svg"
          w="135px"
          m="auto"
          mb="20px"
        ></Image>

        <Box w="100%">
          <Button
            display="flex"
            position="relative"
            gap="15px"
            fontSize="13px"
            alignItems="center"
            w="250px"
            justifyContent={"center"}
            pl="10px"
            m="auto"
            mb="5px"
          >
            <img
              width="30px"
              style={{ position: "absolute", left: "10px" }}
              src="https://pro.trackingtime.co/img/login/google-logo.png"
            />
            <p>Sign in with Google</p>
          </Button>
          <Button
            display="flex"
            position="relative"
            gap="15px"
            fontSize="13px"
            alignItems="center"
            w="250px"
            justifyContent={"center"}
            pl="10px"
            m="auto"
            mb="5px"
          >
            <img
              width="30px"
              style={{ position: "absolute", left: "10px" }}
              src="https://pro.trackingtime.co/img/login/microsoft-logo.png"
            />
            <p>Sign in with Microsoft</p>
          </Button>
          <Button
            display="flex"
            position="relative"
            gap="15px"
            fontSize="13px"
            alignItems="center"
            w="250px"
            justifyContent={"center"}
            pl="10px"
            m="auto"
            mb="5px"
          >
            <img
              width="30px"
              style={{ position: "absolute", left: "10px" }}
              src="https://pro.trackingtime.co/img/login/apple-logo.png"
            />
            <p>Sign in with Apple</p>
          </Button>

          <form onSubmit={handleSubmit} width="100%">
            <Text fontSize="13px" align="center" fontWeight={600} mt="20px">
              Sign in with your email
            </Text>
            <br />
            <Box w="fit-content" m="auto">
              <Input
                w="250px"
                mb="9px"
                textAlign="center"
                onChange={handleChange}
                name="email"
                required
                value={text.email}
                type="email"
                placeholder="Email"
                variant="unstyled"
                py="8px"
                border="1px solid rgba(0,0,0,0.1)"
                backgroundColor="white"
                _focus={{ border: "1px solid blue" }}
              ></Input>
              <br />
              <Input
                w="250px"
                mb="9px"
                textAlign="center"
                onChange={handleChange}
                name="password"
                required
                value={text.password}
                type="password"
                placeholder="Password"
                variant="unstyled"
                py="8px"
                border="1px solid rgba(0,0,0,0.1)"
                backgroundColor="white"
                _focus={{ border: "1px solid blue" }}
              ></Input>
              <br />
            </Box>
            <Text fontSize="10px" w="250px" textAlign="right" m="auto">
              Forgot Your password?{" "}
              <a href="" style={{ textDecoration: "underline" }}>
                Retrieve
              </a>
            </Text>
            <br />
            <Box w="fit-content" m="auto" mt="-10px">
              <Button
                fontSize="14px"
                type="submit"
                w="250px"
                m="auto"
                bg="black"
                color="white"
                _hover={{ opacity: "0.7" }}
                isLoading={loading}
                _active={{ opacity: "0.7" }}
              >
                LOGIN
              </Button>
            </Box>
          </form>
          <br />
          <Text
            fontSize="12px"
            color="gray"
            textAlign="center"
            fontWeight={600}
          >
            Don't have an account? &nbsp;
            <Link to="/signup" style={{ textDecoration: "underline" }}>
              SIGNUP
            </Link>
          </Text>
          <br />
          <Text
            fontSize="12px"
            color="gray"
            textAlign="center"
            fontWeight={600}
            mt="0px"
          >
            <a href="" style={{ textDecoration: "underline" }}>
              Terms of service
            </a>{" "}
            /{" "}
            <a href="" style={{ textDecoration: "underline" }}>
              Privacy Policy
            </a>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
