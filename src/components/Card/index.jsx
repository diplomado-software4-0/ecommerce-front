import PropTypes from "prop-types";
import "./card.css";

const Card = ({
  url,
  title,
  price,
  description,
  onAddToCart,
  onImageClick,
}) => {
  return (
    <div className="card">
      <img
        src={url}
        className="card-img-top"
        alt={title}
        onClick={onImageClick}
        style={{ cursor: "pointer" }}
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text truncate">{description}</p>
        <div className="card-footer">
          <span className="card-price">${price.toFixed(2)}</span>
          <button className="btn btn-primary" onClick={onAddToCart}>
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default Card;
