import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { orderStatus } from "../../../constants/orderStatusBtn";
import { pandingOrders, getUserAllOrders } from "../../../services/api/userApi";

const main = () => {
  const [orderDettails, setOrderDeatils] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderedItems, setOrderedItems] = useState([]);

  useEffect(async () => {
    await fetchPandingOrders();
  }, []);
  const fetchPandingOrders = async () => {
    setLoading(true);
    try {
      const res = await getUserAllOrders();
      setOrderedItems(res.data.allOrders);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  // console.log(orderedItems);
  const showOrders = item => {
    return (
      <>
        {item.length > 0 ? (
          <>
            <h3>Your Orders </h3>
            <table className="table cart-table table-responsive-xs">
              <thead>
                <tr className="table-head">
                  <th scope="col">Order Id</th>
                  <th scope="col">product name</th>
                  <th scope="col">price</th>
                  <th scope="col">quantity</th>
                  <th scope="col">Status</th>
                  <th scope="col">time</th>
                </tr>
              </thead>
              {orderedItems.map((item, index) => {
                // console.log(item.price);
                return (
                  <tbody>
                    <tr>
                      <td>#{item.id}</td>
                      <td>
                        <Link
                        // to={`/product/${item.slug}`}
                        >
                          {item.product_name}
                        </Link>
                      </td>
                      <td>{item.price}</td>
                      <td>{item.qty}</td>
                      <td>
                        {orderStatus.map(data => (
                          <>
                            {data.name === item.status ? (
                              <span class={`badge ${data.badge}`}>
                                {item.status}
                              </span>
                            ) : null}
                          </>
                        ))}
                        {/* <span class="badge badge-info">{item.status}</span> */}
                      </td>
                      <td>
                        {item.order_date.replace(/T/, " ").replace(/\..+/, "")}
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </>
        ) : (
          <div className="text-center">
            <a href="/shop">
              <button
                className="btn btn-lg rounded btn-outline "
                style={{ background: "#ff4c3b", color: "white" }}
              >
                Start Shopping{" "}
              </button>
            </a>
          </div>
        )}
      </>
    );
  };
  return (
    <div className="w-100">
      {loading ? (
        <div>
          <div className="loading-cls"></div>
        </div>
      ) : (
        showOrders(orderedItems)
      )}
    </div>
  );
};

export default main;
