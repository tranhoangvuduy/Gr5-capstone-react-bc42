import React from "react";
import { AdminSignin } from "../../Pages";

const AdminSigninLayout = () => {
  return (
    <main>
      <section>
        <div className="relative flex items-center min-h-screen p-0 overflow-hidden bg-center bg-cover">
          <div className="container z-1">
            <div className="flex flex-wrap -mx-3">
              <div
                className="flex flex-col w-full max-w-full px-3 lg:mx-0 shrink-0 
                md:flex-0 md:w-7/12 lg:w-5/12 xl:w-4/12"
              >
                <div
                  className="relative flex flex-col min-w-0 break-words bg-transparent 
                  border-0 shadow-none lg:py4 rounded-2xl bg-clip-border"
                >
                  <div className="p-6 pb-0 mb-0">
                    <h4 className="font-bold">Sign In</h4>
                    <p className="mb-0">
                      Enter your username and password to sign in
                    </p>
                  </div>

                  <div className="flex-auto p-6">
                    <AdminSignin />
                  </div>
                </div>
              </div>

              <div
                className="absolute top-0 right-0 flex-col justify-center hidden w-6/12 h-full 
                max-w-full px-3 pr-0 my-auto text-center flex-0 lg:flex"
              >
                <div
                  className="relative flex flex-col justify-center h-full bg-cover px-24 m-4 overflow-hidden 
                 rounded-xl "
                >
                  <span className="absolute top-0 left-0 w-full h-full bg-center bg-cover  opacity-60 bg-gray-100">
                    <div
                      className="bg-indigo-700"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        borderRadius: "50%",
                        width: "35%",
                        height: "35%",
                      }}
                    ></div>
                    <div
                      className="absolute bottom-0 left-0 w-full h-16 
                    flex justify-center items-center"
                      style={{
                        height: "50%",
                        backgroundColor: "rgba(244,244,244,0.2)",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <div className="flex flex-col justify-center items-center">
                        <div className="text-gray-700 z-20 text-4xl font-bold">
                          Welcome Back
                        </div>
                        <div className="text-gray-700 z-20 text-lg font-normal">
                          Sign in to your account
                        </div>
                      </div>
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminSigninLayout;
