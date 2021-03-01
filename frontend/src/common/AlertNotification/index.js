import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

function AlertNotification(
  message = "",
  type = toast.TYPE.SUCCESS,
  position = toast.POSITION.TOP_CENTER,
  customClass = "custom-alert"
) {
  // const notification = () => {
  //   return <div
  //     className={`toastify ${type === toast.TYPE.SUCCESS ? "toastify-success" : "toastify-danger"
  //       } `}
  //   >
  //     <div className="toastify-icon">
  //       {type === toast.TYPE.SUCCESS && (
  //         <span className="success">
  //           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
  //             <g id="Group_18523" data-name="Group 18523" transform="translate(-592 -40)">
  //               <circle
  //                 id="Ellipse_5073"
  //                 data-name="Ellipse 5073"
  //                 cx="9"
  //                 cy="9"
  //                 r="9"
  //                 transform="translate(592 40)"
  //                 fill="#18af4b"
  //               ></circle>
  //               <path
  //                 id="Path_50861"
  //                 data-name="Path 50861"
  //                 d="M21.24,22.051,14.261,29.03a.9.9,0,0,1-1.282,0l-3.31-3.31a.907.907,0,0,1,1.282-1.282l2.669,2.669,6.338-6.338a.907.907,0,1,1,1.282,1.282Z"
  //                 transform="translate(585.345 24.382)"
  //                 fill="#f4fcfb"
  //                 fillRule="evenodd"
  //               ></path>
  //             </g>
  //           </svg>
  //         </span>
  //       )}
  //       {type === toast.TYPE.ERROR && (
  //         <span className="danger">
  //           <svg
  //             id="Group_18524"
  //             data-name="Group 18524"
  //             xmlns="http://www.w3.org/2000/svg"
  //             width="18"
  //             height="18"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               id="Path_59533"
  //               data-name="Path 59533"
  //               d="M9,0A9,9,0,1,1,0,9,9,9,0,0,1,9,0Z"
  //               transform="translate(0 0)"
  //               fill="#da1e28"
  //             ></path>
  //             <g id="Group_18525" data-name="Group 18525" transform="translate(5.211 5.21)">
  //               <line
  //                 id="Line_561"
  //                 data-name="Line 561"
  //                 x1="7.578"
  //                 y2="7.578"
  //                 stroke-width="1.5"
  //                 stroke="#fff"
  //                 stroke-linecap="round"
  //                 strokeLinejoin="round"
  //                 fill="none"
  //               ></line>
  //               <line
  //                 id="Line_562"
  //                 data-name="Line 562"
  //                 x2="7.578"
  //                 y2="7.578"
  //                 stroke-width="1.5"
  //                 stroke="#fff"
  //                 stroke-linecap="round"
  //                 strokeLinejoin="round"
  //                 fill="none"
  //               ></line>
  //             </g>
  //           </svg>
  //         </span>
  //       )}
  //     </div>
  //     <p>{message}</p>
  //   </div>
  // }
  return toast[type](message,
    { position: position, className: customClass, closeButton: true }
  );
}

export default AlertNotification;
