import { Carousel } from "antd";
import "antd/dist/reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getAllProducts, toggleLikeProduct } from "../api/ProductApi";
import "../static/css/home.css";
import icon1 from "../static/images/icon1.webp";
import icon2 from "../static/images/icon2.webp";
import icon3 from "../static/images/icon3.webp";
import icon4 from "../static/images/icon4.webp";
import first from "../static/images/slider1.webp";
import second from "../static/images/slider2.png";

import { toast } from "react-toastify";
import ChatAI from "./ChatAI";

const Home = (props) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState({});
  const [active, setActive] = useState(true);

  var rows = new Array(total).fill(0).map((zero, index) => (
    <li
      className={page === index ? "page-item active" : "page-item"}
      key={index}
    >
      <button
        className="page-link"
        style={{ borderRadius: 50 }}
        onClick={() => onChangePage(index)}
      >
        {index + 1}
      </button>
    </li>
  ));

  useEffect(() => {
    const token = localStorage.getItem("token") || null;
    console.log("TOKEN HOME:", token);
    getAllProducts(page, 12, active, token)
      .then((response) => {
        setProducts(response.content); // Lưu các sản phẩm vào state
        setTotal(response.totalPages);
      })
      .catch(() => toast.warning("Không có sản phẩm!!"));
  }, [page, localStorage.getItem("token")]);

  const onChangePage = (page) => {
    setPage(page);
  };

  const handleLike = (productId, currentLikeStatus) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Vui lòng đăng nhập trước khi yêu thích sản phẩm");
      return;
    }

    toggleLikeProduct(productId, !currentLikeStatus, token)
      .then((response) => {
        getAllProducts(page, 12, active, token).then((response) => {
          setProducts(response.content);
          setTotal(response.totalPages);
        });
      })
      .catch((error) => {
        console.error("Lỗi khi thực hiện thao tác like: ", error);
      });
  };

  return (
    <div>
      <Carousel autoplay autoplaySpeed={3000} style={{ width: "100%" }}>
        <div>
          <img
            src={first}
            alt="Second slide"
            style={{ width: "100%", height: "50%" }}
          />
        </div>
        <div>
          <img
            src={second}
            alt="First slide"
            style={{ width: "100%", height: "50%" }}
          />
        </div>
      </Carousel>

      {/* Các phần hiển thị sản phẩm khác */}
      <div className="col-11 container-fluid">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "nowrap",
            marginTop: "50px",
          }}
        >
          <div
            className="mb-5"
            style={{
              backgroundColor: "#F0F0F0",
              borderRadius: "10px",
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              width: "23%",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "100%",
                border: "1px solid #F05736",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={icon1}
                alt="icon1"
                style={{
                  width: "24px",
                  height: "24px",
                }}
              ></img>
            </div>
            <h4
              style={{
                fontWeight: "700",
                fontSize: "20px",
                color: "#212B38",
                marginBottom: "13px",
              }}
            >
              Giao hàng toàn quốc
            </h4>
            <p
              style={{
                fontWeight: "200",
                color: "#333333",
              }}
            >
              63 tỉnh thành
            </p>
          </div>

          <div
            className="mb-5"
            style={{
              backgroundColor: "#F0F0F0",
              borderRadius: "10px",
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              width: "23%",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "100%",
                border: "1px solid #F05736",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={icon2}
                alt="icon1"
                style={{
                  width: "24px",
                  height: "24px",
                }}
              ></img>
            </div>
            <h4
              style={{
                fontWeight: "700",
                fontSize: "20px",
                color: "#212B38",
                marginBottom: "13px",
              }}
            >
              Thử giày tại nhà
            </h4>
            <p
              style={{
                fontWeight: "200",
                color: "#333333",
              }}
            >
              Trước khi thanh toán
            </p>
          </div>
          <div
            className="mb-5"
            style={{
              backgroundColor: "#F0F0F0",
              borderRadius: "10px",
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              width: "23%",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "100%",
                border: "1px solid #F05736",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={icon3}
                alt="icon1"
                style={{
                  width: "24px",
                  height: "24px",
                }}
              ></img>
            </div>
            <h4
              style={{
                fontWeight: "700",
                fontSize: "20px",
                color: "#212B38",
                marginBottom: "13px",
              }}
            >
              Đổi trả linh hoạt
            </h4>
            <p
              style={{
                fontWeight: "200",
                color: "#333333",
              }}
            >
              Trong vòng 30 ngày
            </p>
          </div>
          <div
            className="mb-5"
            style={{
              backgroundColor: "#F0F0F0",
              borderRadius: "10px",
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              width: "23%",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "100%",
                border: "1px solid #F05736",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={icon4}
                alt="icon1"
                style={{
                  width: "24px",
                  height: "24px",
                }}
              ></img>
            </div>
            <h4
              style={{
                fontWeight: "700",
                fontSize: "20px",
                color: "#212B38",
                marginBottom: "13px",
              }}
            >
              Bảo hành miễn phí
            </h4>
            <p
              style={{
                fontWeight: "200",
                color: "#333333",
              }}
            >
              Suốt quá trình sử dụng
            </p>
          </div>
        </div>

        <h2
          style={{
            textAlign: "center",
            fontWeight: "600",
            padding: "30px 0",
          }}
        >
          Sản phẩm bán chạy nhất
        </h2>
        <div className="row padding d-flex">
          {products &&
            products.map((item) => (
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
                          onClick={() => handleLike(item.id, item.liked)}
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

      {/* Pagination */}
      <nav aria-label="Page navigation">
        <ul className="pagination offset-5 mt-3">
          <li className={page === 0 ? "page-item disabled" : "page-item"}>
            <button
              className="page-link"
              style={{ borderRadius: 50 }}
              onClick={() => onChangePage(0)}
            >
              {"<<"}
            </button>
          </li>
          {rows}
          <li className={page === total ? "page-item disabled" : "page-item"}>
            <button
              className="page-link"
              style={{ borderRadius: 50 }}
              onClick={() => onChangePage(total - 1)}
            >
              {`>>`}
            </button>
          </li>
        </ul>
      </nav>
      <div>
        <ChatAI></ChatAI>
      </div>
    </div>
  );
};

export default Home;
