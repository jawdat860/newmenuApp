import { Modal } from "@telegram-apps/telegram-ui";
import { ModalHeader } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import { useContext, useState } from "react";
import WebApp from "@twa-dev/sdk";
import { FaCartShopping } from "react-icons/fa6";
import CartContext from "../store/CartContext";
import BuyItem from "./BuyItem";
import image from "../../assets/product.png";
import classes from "./HeaderCartButton.module.css";
import questionIco from "../../assets/ico/question.svg";
import { useNavigate } from "react-router-dom";
import { LocalText } from "../LocakText/LocalText";
function BuyPage() {
  const cartCtx = useContext(CartContext);
  const [isBuyPageOpen, setIsBuyPageOpen] = useState(false);
  const [questionShow, setQuestionShow] = useState(false);
  const nav = useNavigate();
  // Initialize navigator and integration with React Router

  const totalAmount = `${cartCtx.totalAmount} ₽ `;
  const hasItems = cartCtx.items.length > 0;
  const numberOfCartItems = cartCtx.items.reduce(
    (curNumber, item) => curNumber + item.amount,
    0
  );

  // Handle order button click to navigate to /form
  const handleOrderClick = () => {
    setIsBuyPageOpen(false);

    // Use the Telegram navigator to change the route
    nav("/order");
  };

  return (
    <>
      <div>
        <button
          className={`bg-gradient-to-r flex items-center relative rounded-full w-[100%] justify-center max-h-[36px] from-primary to-secondary hover:scale-105 duration-200 text-white py-2 px-2 flex items-center gap-3 ${classes.button}`}
          onClick={() => setIsBuyPageOpen(true)}
        >
          <FaCartShopping
            className={`text-xl      text-white drop-shadow-sm cursor-pointer  `}
          ></FaCartShopping>
          {numberOfCartItems > 0 && (
            <span className={`${classes.badge} text-[17px]`}>
              {numberOfCartItems}
            </span>
          )}
          {numberOfCartItems > 0 ? (
            <span className="text-[20px]">{totalAmount}</span>
          ) : (
            ""
          )}
        </button>
      </div>
      {/* Buy Page Modal */}
      {isBuyPageOpen && (
        <Modal
          header={
            <ModalHeader
              style={{ backgroundColor: "transparent", padding: "1rem 2rem" }}
            >
              Service Details
            </ModalHeader>
          }
          open={isBuyPageOpen}
          onOpenChange={(open) => setIsBuyPageOpen(open)}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "transparent",
            height: "100%",
          }}
        >
          <div
            id="genn-BuyPage-all"
            className="h-full bg-[#eee]  py-[20px] pb-[0] px-[0px]   rounded-lg shadow-xl flex flex-col"
          >
            <div className="flex  gap-[20px] justify-center mb-[20px] ">
              <h2 className=" text-[20px]  font-[600]">
                {LocalText.BuyPage.titleHead}
              </h2>
              <img
                className="w-[20px] items-center"
                src={questionIco}
                alt={LocalText.BuyPage.titleHead}
                onClick={() => {
                  setQuestionShow(!questionShow);
                }}
              />
            </div>
            {questionShow && (
              <div className="mb-[20px] px-[10px] text-center">
                {LocalText.BuyPage.iscriptionHead}
              </div>
            )}
            <div
              id="genn-BuyItem-block-card"
              className="overflow-y-auto flex-grow p-[15px]"
            >
              {hasItems ? (
                <ul className="flex flex-col gap-2">
                  {cartCtx.items.map((item) => (
                    <BuyItem
                      key={item.id}
                      name={item.name}
                      amount={item.amount}
                      price={item.price}
                      onRemove={() => cartCtx.removeItem(item.id)}
                      onAdd={() => cartCtx.addItem({ ...item, amount: 1 })}
                      onRemoveAll={() => cartCtx.removeItemall(item.id)}
                    />
                  ))}
                </ul>
              ) : (
                <div
                  id="genn-BuyPage-img"
                  className="flex justify-center items-center h-full"
                >
                  <img src={image} alt="Empty Cart" />
                </div>
              )}
            </div>

            <div className="p-[15px] boxShadow-buttons bg-white pb-[10px] border-t-[1px] border-black ">
              <div
                id="genn-BuyPage-sum"
                className="flex justify-between items-center text-gray-900 dark:text-white text-lg font-semibold mb-4"
              >
                <span>Cумма:</span>
                <span className="flex-[1] border-b-[1.9px] border-dashed border-black mx-[5px]">
                  <span></span>
                </span>
                <span>{totalAmount}</span>
              </div>

              <div id="genn-BuyPage-buttons" className="flex justify-end gap-4">
                <button
                  id="genn-BuyPage-button-order"
                  className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md transition duration-200"
                  onClick={() => setIsBuyPageOpen(false)}
                >
                  Закрывать
                </button>

                {hasItems && (
                  <button
                    id="genn-BuyPage-button-close"
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white py-2 px-6 rounded-md shadow-md transition-all duration-200"
                    onClick={handleOrderClick} // Handle the order click to navigate to the form
                  >
                    Заказть
                  </button>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default BuyPage;
