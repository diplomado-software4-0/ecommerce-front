import PropTypes from "prop-types";

const Card = ({
  url,
  title,
  price,
  originalPrice,
  description,
  onAddToCart,
  onImageClick,
}) => {
  return (
    <div className="card" style={{ width: "18rem", margin: "10px" }}>
      <img
        src={url}
        className="card-img-top"
        alt={title}
        onClick={onImageClick}
        style={{ cursor: "pointer" }}
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        {originalPrice && originalPrice !== price ? (
          <div>
            <span style={{ textDecoration: "line-through", color: "red" }}>
              ${originalPrice.toFixed(2)}
            </span>{" "}
            <span style={{ fontWeight: "bold" }}>${price.toFixed(2)}</span>
          </div>
        ) : (
          <span style={{ fontWeight: "bold" }}>${price.toFixed(2)}</span>
        )}
        <button className="btn btn-primary" onClick={onAddToCart}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

Card.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  originalPrice: PropTypes.number,
  description: PropTypes.string.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default Card;
