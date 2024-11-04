import React, { useState, useEffect, useContext } from "react";
import { Modal, VisuallyHidden } from "@telegram-apps/telegram-ui";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ModalHeader } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import CartContext from "../store/CartContext";
import image from "../../assets/biryani_cover.jpg";
import { FaHeart, FaShoppingBag, FaShoppingCart } from "react-icons/fa";
import { SlLike } from "react-icons/sl";
import { SlDislike } from "react-icons/sl";
import { LocalText } from "../LocakText/LocalText";
const ServiceModal = ({ isOpen, onClose, service }) => {
  const [quantity, setQuantity] = useState(1);
  const [amountIsValid, setAmountIsValid] = useState(true);
  const [love, setLove] = useState(false);
  const [Dislove, setDisLove] = useState(false);
  const cartCtx = useContext(CartContext);

  // Reset quantity and validation state when the modal is opened
  useEffect(() => {
    if (service) {
      const existingItem = cartCtx.items.find((item) => item.id === service.id);
      setQuantity(existingItem ? existingItem.amount : 1); // Set to existing amount or default to 1
      setAmountIsValid(true);
      if (cartCtx && Array.isArray(cartCtx.itemsFavourite)) {
        const existingItemLove = cartCtx.itemsFavourite.find(
          (item) => item.id === service.id
        );
        setLove(existingItemLove ? existingItemLove.love : false);
      }
      if (cartCtx && Array.isArray(cartCtx.itemsDisFavourite)) {
        const existingItemLove = cartCtx.itemsDisFavourite.find(
          (item) => item.id === service.id
        );
        setDisLove(existingItemLove ? existingItemLove.Dislove : false);
      }
    }
  }, [
    isOpen,
    cartCtx.items,
    cartCtx.itemsFavourite,
    cartCtx.itemsDisFavourite,
    service,
  ]);
  console.log(isOpen);
  if (!service) return null;
  console.log(service);
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < 5) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (quantity < 1 || quantity > 5) {
      setAmountIsValid(false);
      return;
    }

    cartCtx.addItem({
      id: service.id,
      name: service.title,
      amount: quantity,
      price: service.price,
    });

    setAmountIsValid(true); // Reset validation on successful add to cart
    onClose(); // Optionally close the modal after adding to the cart
  };
  const addToFavouriteHandler = () => {
    cartCtx.addItemToFavourite({
      id: service.id,
      title: service.title,
      amount: quantity,
      price: service.price,
      description: service.description,
      love: true,
      Dislove: false,
    });
  };
  const addToDisFavouriteHandler = () => {
    cartCtx.addItemToDisFavourite({
      id: service.id,
      title: service.title,
      amount: quantity,
      price: service.price,
      description: service.description,
      love: false,
      Dislove: true,
    });
  };

  return (
    <Modal
      header={
        <ModalHeader style={{ backgroundColor: "transparent" }}>
          Service Details
        </ModalHeader>
      }
      open={isOpen}
      onOpenChange={(open) => onClose(open)}
      dismissible={true}
      style={{
        backgroundColor: "transparent",
        bottom: "0",
        display: "flex",
        alignContent: "space-between",
        minHeight: "100%",
      }}
    >
      <DialogTitle>
        <VisuallyHidden>{service.title}</VisuallyHidden>
      </DialogTitle>

      <div
        id="genn-ServiceModal-all"
        className="rounded-t-lg shadow-lg w-full flex-[1] flex flex-col text-center bg-[#eee]     "
      >
        <div
          id="genn-ServiceModal-img"
          className="relative w-full"
          style={{ backgroundColor: "transparent" }}
        >
          <img
            className="w-full h-[260px] object-cover rounded-t-[40px]"
            alt={service.title}
            src={image}
          />
          <div className="bg-[#eee]  absolute w-[100%] h-[40px] z-[2] rounded-t-[40px] bottom-[-9px]"></div>
        </div>
        <div className="relative rounded-t-[40px] w-[100%]   dark:bg-gray-800  z-[100] flex-1 pt-[10px] flex flex-col bg-[#eee] ">
          <div className="flex flex-col flex-[1] ">
            <div id="genn-ServiceModal-question " className="flex">
              <div
                className={`genn-ma w-[100%] flex gap-[10px] justify-between py-[10px] px-[20px] ${
                  !love & !Dislove ? `bg-[#f6f6f6]` : ``
                }  rounded-[20px] items-center mt-[-20px] mx-[10px]  ${
                  love ? `bg-[#ecffee]` : ``
                } ${Dislove ? `bg-[#ffecec]` : ``}`}
              >
                <div>
                  {!love & !Dislove ? (
                    <div className="block  text-left leading-[1]">
                      {" "}
                      <div className="text-[14px]">
                        {LocalText.ServiceModal.likeq}
                      </div>{" "}
                      {
                        <h5 className="text-[16px] font-[600]">
                          {service.title}?
                        </h5>
                      }
                    </div>
                  ) : love ? (
                    <div className="block  text-left leading-[1]">
                      {" "}
                      <div className="text-[14px] text-[#1dc000]">
                        {LocalText.ServiceModal.like}
                      </div>{" "}
                      {
                        <h5 className="text-[16px] font-[600] ">
                          {service.title}
                        </h5>
                      }
                    </div>
                  ) : (
                    <div className="block  text-left leading-[1]">
                      {" "}
                      <div className="text-[14px] text-[#ef4444]">
                        {LocalText.ServiceModal.noLike}
                      </div>{" "}
                      {
                        <h5 className="text-[16px] font-[600]">
                          {service.title}
                        </h5>
                      }
                    </div>
                  )}
                </div>
                <div className="genn-art-2 flex">
                  <div className="like">
                    {love ? (
                      <SlLike
                        className=" text-[25px] text-[#1dc000]"
                        onClick={addToFavouriteHandler}
                      />
                    ) : (
                      <SlLike
                        className=" text-[25px] "
                        onClick={addToFavouriteHandler}
                      />
                    )}
                  </div>
                  <div className="Dislike">
                    {Dislove ? (
                      <SlDislike
                        className=" text-[25px] text-red-500"
                        onClick={addToDisFavouriteHandler}
                      />
                    ) : (
                      <SlDislike
                        className=" text-[25px] "
                        onClick={addToDisFavouriteHandler}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div id="genn-ServiceModal-TitleAndDescription">
              <h2 className="text-xl font-bold mb-[10px] dark:text-white mt-[30px]">
                {service.title}
              </h2>
              <p className="dark:text-gray-300 mb-4 max-h-[100px] overflow-y-scroll">
                {service.description}
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="  items-center gap-[10px]  flex justify-between   bg-[white] p-[10px]"
          >
            <div
              id="genn-ServiceModal-form-price"
              className="text-lg py-[20px] min-w-[120px] font-bold text-primary dark:text-secondary "
            >
              {service.price * quantity} ₽
            </div>
            <div
              id="genn-ServiceModal-form-buttons"
              className="relative rounded-[20px] flex items-center flex-[30%]  aling-center border-[1px] border-solid border-[#ddd] "
            >
              <button
                type="button"
                onClick={handleDecrement}
                className={`  pt-0 pr-[25px] pb-[0] pl-[15px]   h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none font-bold text-[30px] flex justify-center items-center mt-[-4px]`}
              >
                -
              </button>
              <input
                type="text"
                id="quantity-input"
                value={quantity}
                readOnly
                className="w-[100%] border-x-0 border-gray-300 h-11 font-medium text-center text-gray-900 text-sm focus:ring-blue-500  block  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <button
                type="button"
                onClick={handleIncrement}
                disabled={quantity >= 5}
                className={`${
                  quantity >= 5
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-200 dark:hover:bg-gray-600"
                } pt-0 pr-[15px] pb-[0] pl-[25px] font-bold text-[20px] flex justify-center items-center`}
              >
                +
              </button>
            </div>
            <div
              id="genn-ServiceModal-form-ShoppingCart"
              className="flex items-center gap-[10px] flex-[1] "
            >
              <button
                className=" bg-colorBtnCart py-[10px] px-[10px] rounded-[10px] w-full flex items-center justify-center "
                role="button"
                type="submit"
              >
                <FaShoppingCart className="text-colorBtnCartText" />
                {/* <span className="ml-2 block">{service.price * quantity} ₽</span> */}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ServiceModal;