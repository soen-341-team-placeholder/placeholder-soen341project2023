import React, { useState } from "react";
import "..styles/Subscribe.css";

function SubscriptionButton() {
  const [subscribed, setSubscribed] = useState(false);

  function handleClick() {
    setSubscribed(!subscribed);
    // Subscription function
  }

  return (
    <div className="Subscribe">
        <button
            className={subscribed ? "subscribed" : ""}
            onClick={handleClick}
        >
      {subscribed ? "Subscribed" : "Subscribe"}
        </button>
    </div>
  );
}

export default SubscriptionButton;