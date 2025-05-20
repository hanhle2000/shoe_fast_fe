import React, { useState, useEffect } from "react";
import { searchByKeyword } from "../api/ProductApi";
import { NavLink } from "react-router-dom";

const Search = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    searchByKeyword(0, 10, props.keyword)
      .then((response) => {
        const productData = response.data.content || [];
        setProducts(Array.isArray(productData) ? productData : []);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProducts([]); // Ensure we still set an empty array in case of error
      });
  }, [props.keyword]);

  return (
    <div>
      <div className="container-fluid padding">
        <div className="row welcome mini-card">
          <div className="text-danger">
            <h4 className="title">Kết quả tìm kiếm</h4>
          </div>
        </div>
      </div>
      <div className="col-11 container-fluid card">
        <div className="row padding d-flex">
          {products.length === 0 && (
            <div className="error-template">
              <h5 style={{ textAlign: 'center' }}>Không sản phẩm nào được tìm thấy</h5>
            </div>
          )}
          {products &&
            products.map((item, index) => (
                <div className="col-md-3 mb-5" key={item.id}>
                <div
                  className="h-100"
                  style={{
                    position: "relative",
                    borderRadius: "15px",
                    overflow: "hidden",
                  }}
                >
                  <div className="d-flex justify-content-between position-relative">
                    <div className="label-new">
                      <span
                        className="badge text-white small d-flex align-items-center px-2 py-1"
                        style={{
                          backgroundColor: "#f94227",
                        }}
                      >
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <span
                          style={{
                            marginLeft: "3px",
                          }}
                        >
                          New
                        </span>
                      </span>
                    </div>
                  </div>

                  <NavLink
                    to={`/product-detail/${item.id}`}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={item.image}
                      alt="Product"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </NavLink>

                  <div className="card-body px-2 pb-2 pt-3">
                    <p className="text-warning d-flex align-items-center mb-2">
                      <i className="fa fa-star" aria-hidden="true"></i>
                      <i className="fa fa-star" aria-hidden="true"></i>
                      <i className="fa fa-star" aria-hidden="true"></i>
                      <i className="fa fa-star" aria-hidden="true"></i>
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </p>
                    <p className="mb-0">
                      <strong>
                        <NavLink
                          to={`/product-detail/${item.id}`}
                          className="text-secondary "
                        >
                          {item.name}
                        </NavLink>
                      </strong>
                    </p>
                    <p className="mb-1">
                      <small>
                        <NavLink to="#" className="text-secondary ">
                          {item.brand}
                        </NavLink>
                      </small>
                    </p>
                    <div className="d-flex mb-3 justify-content-between">
                      <div>
                        <p className="mb-0 small">
                          <b>Yêu thích: </b> {item.view} lượt
                        </p>
                        <p
                          className="mb-0 small"
                          style={{
                            fontSize: "15px",
                            marginTop: "5px",
                          }}
                        >
                          <span
                            style={{
                              fontWeight: 600,
                            }}
                          >
                            {(
                              (item.price * (100 - item?.discount)) /
                              100
                            ).toLocaleString()}
                            đ
                          </span>
                          <span
                            style={{
                              textDecoration: "line-through",
                              marginLeft: "7px",
                              color: "#CECECE",
                              fontSize: "13px",
                            }}
                          >
                            {item.price.toLocaleString()}đ
                          </span>
                          <span
                            style={{
                              border: "1px solid #F05736",
                              borderRadius: "3px",
                              marginLeft: "5px",
                              color: "#F05736",
                              padding: "1px",
                              fontSize: "13px",
                            }}
                          >
                            {item.discount}%
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div className="col px-0 ">
                        <NavLink
                          to={`/product-detail/${item.id}`}
                          exact
                          className="btn btn-outline-primary btn-block"
                        >
                          Thêm vào giỏ
                          <i
                            className="fa fa-shopping-basket"
                            aria-hidden="true"
                          ></i>
                        </NavLink>
                      </div>
                      <div className="ml-2">
                        <NavLink
                          to="#"
                          className="btn btn-outline-success"
                          data-toggle="tooltip"
                          data-placement="left"
                          title="Add to Wishlist"
                        >
                          <i
                            className={`fa fa-heart ${
                              item.liked ? "text-danger" : ""
                            }`}
                            aria-hidden="true"
                          ></i>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
