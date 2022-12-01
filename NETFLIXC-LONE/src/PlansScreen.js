import React, { useEffect, useState } from "react";

import {selectUser} from "../features/userSlice";
import db from "../firebase";
import "./PlansScreen.css";
import { LoadStrip} from "@stripe/stripe-js";

function PlansScreen(){
  const [product, setProducts] = useState([]);
  const user = userselector(selectUser);
  const [subscription,setSubscription] = useState(null);

    useEffect(() => {
        db.collection('customers')
        .doc(user.uid)
        .collection('subscriptions')
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach(async (subscription) => {
                setSubscription({
                    role:subscription.data().role,
                      current_period_end: subscription.data().current_period_end.seconds,
                      current_period_start: subscription.data().current_period_start
                      .seconds,
                });
            });
        });
}, [user.uid]);

  useEffect(() => {
    db.collection("products")
    .where("active", "==", true)
    .get()
    .then(querySnapshot => {
        const product = {};
        querySnapshot.forEach(async productDoc => {
            products[productDoc.id] = productDoc.data();
            const priceSnap = await productDoc.ref.collection("prices").get();
            priceSnap.docs.forEach(price => {
                products[productDoc.id].prices = {
                    PriceId: document.id,
                    priceData: price.data(),
                };
            });
        });
        setProducts(products);
    });
  },  []);

  console.log(products);
  console.log(subscription);

  const loadcheckout=async(priceId) => {
    const docRef =await db
    .collection("customers")
    .doc(user.uid)
    .collection("checkout_sessions")
    .add({
        price:priceId,
        success_url:window.location.origin,
        cancel_url:window.location.origin,
    });
    
    doc.Ref.onsnapshot(async(snap) => {
        const{error,sessionId}=snap.data();

        if(error) {
            //show error to your customer
            //inspect your cloud function logs in th firebase console
            alert('An error occuerd:${error.message}');
        }

        if(sessionId) {
            //we have a question lets redirect to checkout
            //init stipe

            const stripe = await loadstripe( 
              "1.38 jeb lien naarech"
            );
            stripe.redirection ({sessionId});
        }
    });
};

  return (
  <div className="plansScreen">
        <br/>
        {subscription && (
        <p>
        Renwal date:{" "}
        {new Date(
          subscription?.current_period_end * 1000
        ).toLocaleDateString()}
          </p>
        )}
    {Object.entries(products).map(([productId, productData]) => {
        //TODO: add some logic check if the user's subscription is active...
        const iscurrentpackage = productData.name
        ?.tolowercase()
        .includes(subscription?.role);

        return(
            <div 
            key={productID}
            className={`${
                isCurrentPackage && "plansScreen_plan--disabled"
                } plansScreen__plan`}
              > 
               <div className="plansScreen__info">
                  <h5>{productData.name}</h5>
                  <h6>{productData.descroption}</h6>
               </div>

               <button
                onclick={() =>
                !isCurrnrtPackage && loadcheckout(productdata.price.priceId)
                }
              >              
               {iscurrentpackage?"current package":"subscribe"}
              </button>
            </div>
         );
      })}
  </div>
  );
}

export default PlansScreen;