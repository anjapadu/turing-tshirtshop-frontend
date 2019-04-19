import React, { PureComponent } from 'react';
import Button from '../Button';
import ColorPicker from '../ColorPicker';
import Select from '../Select';


const BackFace = ({ colors, sizes, name, price, discounted_price, description }) => {
    return (<div
        className={"card-backface"}
    >
        <div className={"overlay"} />
        <div
            className={"backface-content"}
        >
            <h2>{name || "Product Name"}</h2>
            <h2
                className={"has-text-danger is-size-4"}
            >$ {discounted_price === 0 ? price : discounted_price}</h2>


            <div
                className={"is-flex-column"}
            >
                <ColorPicker
                    colors={colors}
                />
                <div>
                    <Select
                        placeholder={"Size"}
                        options={sizes.split(',')}
                    />
                    <Button
                        style={{
                            marginLeft: 10
                        }}
                        text={"Buy now"}
                        className={"is-danger is-rounded"}
                    />
                </div>
            </div>
            <div>
                <Button
                    text={"Add to cart"}
                    className={"is-danger is-rounded is-outlined"}
                />
                <Button
                    style={{
                        marginLeft: 10
                    }}
                    text={"..."}
                    className={"is-danger is-rounded"}
                >
                    <span className="icon is-small">
                        <i className="fas fa-ellipsis-h"></i>
                    </span>
                </Button>
            </div>
        </div>

    </div>)
}
class Card extends PureComponent {
    _renderPrice() {
        const {
            price,
            discounted_price
        } = this.props.product;
        if (discounted_price === 0) {
            return <p
                className={"has-text-danger price"}
            >
                <span>
                    $ {price || "00.00"}
                </span>
            </p>
        }
        return <p>
            <span
                className={"price disabled"}
            >$ {price}</span>
            <br />
            <span
                className={"hast-text-danger price"}
            >$ {discounted_price}</span>
        </p>
    }
    render() {
        const {
            product: {
                name,
                description,
                price,
                discounted_price,
                image,
                image_2,
                thumbnail,
                display,
                categoryName,
                categoryId,
                departmentId,
                departmentName,
                sizes,
                colors
            }
        } = this.props;
        return (<div className="card is-product">
            <div className="card-image">
                <figure className="image">
                    <img src={`http://localhost:3035/images/${image}`} alt="Placeholder image" />
                </figure>
            </div>
            <div className="card-content">
                <div className="media">
                    <div className="media-content has-text-centered">
                        <p className="title is-4">{name || "Product Name"}</p>
                    </div>
                </div>

                <div className="content has-text-centered">
                    {this._renderPrice()}
                </div>
            </div>

            <BackFace
                sizes={sizes}
                name={name}
                colors={colors}
                price={price}
                discounted_price={discounted_price}
                description={description}

            />

        </div>)
    }
}

export default Card;