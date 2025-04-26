import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Check, AlertCircle, Bell, Info } from "lucide-react";

const ToastNotification = ({
  message,
  title,
  isVisible,
  onClose,
  type = "success",
  duration = 3000,
  position = "bottom-right",
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]);

  const icons = {
    success: <Check className="text-green-500" size={20} />,
    cart: <ShoppingCart className="text-blue-500" size={20} />,
    error: <AlertCircle className="text-red-500" size={20} />,
    info: <Info className="text-indigo-500" size={20} />,
    notification: <Bell className="text-amber-500" size={20} />,
  };

  const styles = {
    success: {
      bg: "bg-gradient-to-r from-green-50 to-green-100",
      border: "border-green-500",
      text: "text-green-800",
      progress: "bg-green-500",
    },
    cart: {
      bg: "bg-gradient-to-r from-blue-50 to-blue-100",
      border: "border-blue-500",
      text: "text-blue-800",
      progress: "bg-blue-500",
    },
    error: {
      bg: "bg-gradient-to-r from-red-50 to-red-100",
      border: "border-red-500",
      text: "text-red-800",
      progress: "bg-red-500",
    },
    info: {
      bg: "bg-gradient-to-r from-indigo-50 to-indigo-100",
      border: "border-indigo-500",
      text: "text-indigo-800",
      progress: "bg-indigo-500",
    },
    notification: {
      bg: "bg-gradient-to-r from-amber-50 to-amber-100",
      border: "border-amber-500",
      text: "text-amber-800",
      progress: "bg-amber-500",
    },
  };

  const positions = {
    "top-right": "fixed top-6 right-6",
    "top-left": "fixed top-6 left-6",
    "bottom-right": "fixed bottom-6 right-6",
    "bottom-left": "fixed bottom-6 left-6",
    "top-center": "fixed top-6 left-1/2 transform -translate-x-1/2",
    "bottom-center": "fixed bottom-6 left-1/2 transform -translate-x-1/2",
  };

  const getAnimations = (pos) => {
    if (pos.includes("right")) {
      return {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 50 },
      };
    } else if (pos.includes("left")) {
      return {
        initial: { opacity: 0, x: -50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 },
      };
    } else {
      return {
        initial: { opacity: 0, y: pos.includes("top") ? -20 : 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: pos.includes("top") ? -20 : 20 },
      };
    }
  };

  const animations = getAnimations(position);

  const ProgressBar = () => (
    <motion.div
      className={`absolute bottom-0 left-0 h-1 ${styles[type].progress}`}
      initial={{ width: "100%" }}
      animate={{ width: "0%" }}
      transition={{ duration: duration / 1000, ease: "linear" }}
    />
  );

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`z-50 ${positions[position]}`}
          initial={animations.initial}
          animate={animations.animate}
          exit={animations.exit}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          <div
            className={`relative flex items-center p-4 rounded-lg shadow-lg border-l-4 ${styles[type].border} ${styles[type].bg} backdrop-blur-sm overflow-hidden max-w-md w-full`}
            style={{
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white bg-opacity-50 mr-4">
              {icons[type]}
            </div>
            <div className="flex-1">
              {title && (
                <h4 className={`font-bold ${styles[type].text}`}>{title}</h4>
              )}
              <p className={`${styles[type].text} text-sm`}>{message}</p>
            </div>
            <button
              onClick={onClose}
              className="ml-2 p-1 rounded-full bg-white bg-opacity-50 text-gray-500 hover:text-gray-700 hover:bg-opacity-70 transition-all duration-200"
            >
              <X size={16} />
            </button>
            <ProgressBar />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ToastExample = () => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = (type) => {
    const newNotification = {
      id: Date.now(),
      type,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Notification`,
      message: `This is a ${type} notification example with enhanced styling.`,
      position: "bottom-right",
    };

    setNotifications([...notifications, newNotification]);
  };

  const removeNotification = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => showNotification("success")}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Success
        </button>
        <button
          onClick={() => showNotification("error")}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Error
        </button>
        <button
          onClick={() => showNotification("info")}
          className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
        >
          Info
        </button>
        <button
          onClick={() => showNotification("cart")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Cart
        </button>
        <button
          onClick={() => showNotification("notification")}
          className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600"
        >
          Notification
        </button>
      </div>

      {notifications.map((notification) => (
        <ToastNotification
          key={notification.id}
          isVisible={true}
          type={notification.type}
          title={notification.title}
          message={notification.message}
          position={notification.position}
          onClose={() => removeNotification(notification.id)}
          duration={5000}
        />
      ))}
    </div>
  );
};

export default ToastNotification;
export { ToastExample };
