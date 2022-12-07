import "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import payment from "../images/pngwing.com.png";
import dish from "../images/pngwing.com (1).png";
import delivery from "../images/pngwing.com (2).png";
import delivered from "../images/pngwing.com (3).png";

const steps = [
  {
    status: "payment",
  },
  {
    status: "dish",
  },
  {
    status: "way",
  },
  {
    status: "delivered",
  },
];

export function DynaminBar({ transfer }) {
  const getStepPosition = (transferStatus) => {
    return steps.findIndex(({ status }) => status === transferStatus) + 1;
  };

  return (
    <>
      <div style={{ margin: 20,marginTop: 13 }}>
        <ProgressBar
          width={250}
          percent={100 * (getStepPosition(transfer) / steps.length)}
          filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
        >
          {steps.map((step, index, arr) => {
            return (
              <Step
                key={index}
                position={100 * (index / arr.length)}
                transition="scale"
                children={({ accomplished }) => (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      width: 20,
                      height: 20,
                      color: "white",
                    }}
                  >
                    {index + 1 === 1 ? (
                      <img src={payment} className="status" />
                    ) : index + 1 === 2 ? (
                      <img src={dish} className="status" />
                    ) : index + 1 === 3 ? (
                      <img src={delivery} className="status" />
                    ) : (
                      <img src={delivered} className="status" />
                    )}
                  </div>
                )}
              />
            );
          })}
        </ProgressBar>
      </div>
    </>
  );
}
