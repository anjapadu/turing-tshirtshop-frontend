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
            >$ {discounted_price}</h2>
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
            <Button
                text={"Add to cart"}
                className={"is-danger is-rounded"}
            />
        </div>

    </div>)
}
class Card extends PureComponent {
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
                        {/* <p className="subtitle is-5">@johnsmith</p> */}
                    </div>
                </div>

                <div className="content has-text-centered">
                    <p><span
                        style={{
                            textDecorationLine: 'line-through'
                        }}
                    >${price || "00.00"}</span> <span
                        className={"discounted-price is-size-3"}
                    >${discounted_price || "00.00"}</span></p>

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