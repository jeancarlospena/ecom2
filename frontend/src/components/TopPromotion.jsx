import React, { useEffect, useState } from "react";

const TopPromotion = () => {
  const [messageInd, setMessageInd] = useState(0);
  const promoMessages = [
    "Free shipping for all U.S. orders over $75",
    "Luxury quality, and honestly priced",
    "Need help? Chat with us anytime",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageInd((messageInd) => (messageInd + 1) % promoMessages.length);
    }, 10000);
  }, []);
  return <div className="top-promotion">{promoMessages[messageInd]}</div>;
};

export default TopPromotion;
