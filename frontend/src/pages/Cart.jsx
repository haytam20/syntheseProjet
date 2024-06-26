import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import axios from 'axios';
import React, { Fragment, useState } from 'react';

export default function Cart() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [open, setOpen] = React.useState(true);
  const [isReserving, setIsReserving] = useState(false);
  const [reservationError, setReservationError] = useState(null);
  const [reservationSuccess, setReservationSuccess] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleReserve = async () => {
    if (cartItems.length === 0) {
      setReservationError('Cart is empty. Please add products to proceed.');
      return;
    }
  
    setIsReserving(true);
    setReservationError(null);
    setReservationSuccess(null);
  
    try {
      const userData = JSON.parse(localStorage.getItem('ACCESS_TOKEN'));
      if (userData) {
        const reservationData = cartItems.map((item) => ({
          user_id: userData.id,
          name: item.name,
          price: item.price,
          description: item.description || '',
          qty: item.qty,
          file_path: item.file_path, // Include file_path here
        }));
  
        const response = await axios.post('http://localhost:8000/api/reservations', { cartItems: reservationData });
        console.log(response.data.message);
        clearCart();
        setReservationSuccess('Reservation successful!');
      } else {
        setReservationError('User data not found in localStorage');
      }
    } catch (error) {
      setReservationError('Error reserving: ' + error.message);
    } finally {
      setIsReserving(false);
      setIsConfirmOpen(false);
    }
  };
  const openConfirmDialog = () => {
  setIsConfirmOpen(true);
};
  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="absolute -inset-0.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                              {cartItems.map((product) => (
                                <li key={product.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={`http://127.0.0.1:8000/${product.file_path}`}
                                      alt={product.name}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <a href="#">{product.name}</a>
                                        </h3>
                                        <p className="ml-4">{product.price} DH</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-gray-500">Qty {product.qty}</p>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-red-500 hover:text-red-700"
                                          onClick={() => removeFromCart(product.id)}
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Total</p>
                          <p>{cartItems.reduce((total, product) => total + Number(product.price) * product.qty, 0)} DH</p>
                        </div>
                        {cartItems.length > 0 && (
                          <button onClick={clearCart} className="mt-0.5 text-sm font-medium text-red-400 hover:text-red-600 text-bold">
                            Remove all products
                          </button>
                        )}
                        <div className="mt-6">
                          <button
                            className="flex items-center uppercase justify-center rounded-md border border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-500"
                            onClick={openConfirmDialog}
                            disabled={isReserving || cartItems.length === 0}
                          >
                            {isReserving ? 'Reserving...' : 'Reserve Now'}
                          </button>
                          {reservationError && <p className="mt-2 text-red-500">{reservationError}</p>}
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            <Link to={"/app/product"}>
                              or{' '}
                              <button
                                type="button"
                                className="font-medium text-green-600 hover:text-green-500"
                                onClick={() => setOpen(false)}
                              >
                                Continue Shopping
                                <span aria-hidden="true"> &rarr;</span>
                              </button>
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <Transition.Root show={isConfirmOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setIsConfirmOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <XMarkIcon onClick={() => setIsConfirmOpen(false)} className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                        Confirm Reservation
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to reserve these items? This action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                  {reservationSuccess && <p className="mt-2 text-green-500">{reservationSuccess}</p>}
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-gray-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={handleReserve}
                    >
                      Reserve
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-red-500 hover:text-white sm:mt-0 sm:w-auto sm:text-sm"
                      onClick={() => setIsConfirmOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
