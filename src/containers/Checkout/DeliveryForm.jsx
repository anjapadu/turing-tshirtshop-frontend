import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Row from "../../components/Row";
import Col from "../../components/Col";
import Input from "../../components/Input";
import Select from "../../components/Select";
import { checkoutSelector } from '../../selectors/checkout';
import { userSelector } from '../../selectors/user'
import { setCheckoutReducerValue } from '../../actions'


class DeliveryForm extends PureComponent {
    constructor(props) {
        super(props);
        let name = this.props.name.replace(/\s+/g, ' ').split(' ');
        this.props.setCheckoutReducerValue({
            name: "firstname",
            value: name[0]
        })
        this.props.setCheckoutReducerValue({
            name: "lastname",
            value: name[1]
        })
    }
    render() {
        const { setCheckoutReducerValue, shippingRegion, firstname, lastname, address_1, address_2, city, region, postal_code, country, shipping_region_id, shipping_id } = this.props;
        return <React.Fragment>
            <Row>
                <Col>
                    <Input
                        isLarge
                        value={firstname}
                        onChange={(value) => setCheckoutReducerValue({
                            name: 'firstname',
                            value
                        })}
                        placeholder={"Name"}
                        icon={'fa-user'}
                    />
                </Col>
                <Col>
                    <Input
                        isLarge
                        placeholder={"Lastname"}
                        icon={'fa-user'}
                        value={lastname}
                        onChange={(value) => setCheckoutReducerValue({
                            name: 'lastname',
                            value
                        })}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Input
                        value={address_1}
                        onChange={(value) => setCheckoutReducerValue({
                            name: 'address_1',
                            value
                        })}
                        isLarge
                        placeholder={"Address"}
                        icon={'fa-user'}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Input
                        value={address_2}
                        onChange={(value) => setCheckoutReducerValue({
                            name: 'address_2',
                            value
                        })}
                        isLarge
                        placeholder={"Address 2"}
                        icon={'fa-user'}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Input
                        value={city}
                        onChange={(value) => setCheckoutReducerValue({
                            name: 'city',
                            value
                        })}
                        isLarge
                        placeholder={"City"}
                        icon={'fa-user'}
                    />
                </Col>
                <Col>
                    <Input
                        value={region}
                        onChange={(value) => setCheckoutReducerValue({
                            name: 'region',
                            value
                        })}
                        isLarge
                        placeholder={"State"} //Region
                        icon={'fa-user'}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Input
                        value={country}
                        onChange={(value) => setCheckoutReducerValue({
                            name: 'country',
                            value
                        })}
                        isLarge
                        placeholder={"Country"}
                        icon={'fa-user'}
                    />
                </Col>
                <Col>
                    <Input
                        value={postal_code}
                        onChange={(value) => setCheckoutReducerValue({
                            name: 'postal_code',
                            value
                        })}
                        isLarge
                        placeholder={"Zip code"}
                        icon={'fa-user'}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>Shipping</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Select
                        disableAutoselect
                        value={shipping_region_id ? shipping_region_id.value : undefined}
                        isForm
                        hasSelectOption
                        onChange={(value) => {
                            if (value.index)
                                setCheckoutReducerValue({
                                    name: "shipping_region_id",
                                    value
                                })
                            else {
                                setCheckoutReducerValue({
                                    name: "shipping_region_id",
                                    value: null
                                })
                                setCheckoutReducerValue({
                                    name: 'shipping_id',
                                    value: null
                                })
                            }

                        }}
                        isObjectOptions
                        options={shippingRegion}
                    />
                </Col>
                <Col>
                    {shipping_region_id && <Select
                        disableAutoselect
                        value={shipping_id ? shipping_id.value : undefined}
                        isForm
                        onChange={(value) => {
                            if (value.index) {
                                setCheckoutReducerValue({
                                    name: 'shipping_id',
                                    value
                                })
                            }
                            else
                                setCheckoutReducerValue({
                                    name: 'shipping_id',
                                    value: null
                                })

                        }}
                        hasSelectOption
                        isObjectOptions
                        options={shippingRegion[shipping_region_id.index].shippingOptions}
                    />}
                </Col>
            </Row>
        </React.Fragment>
    }
}

const mapStateToProps = (state) => {
    const {
        firstname,
        lastname,
        address_1,
        address_2,
        city,
        region,
        postal_code,
        country,
        shipping_region_id,
        shipping_id
    } = checkoutSelector(state);
    const { name } = userSelector(state);
    return {
        name,
        firstname,
        lastname,
        address_1,
        address_2,
        city,
        region,
        postal_code,
        country,
        shipping_region_id,
        shipping_id
    }
}

export default connect(mapStateToProps, {
    setCheckoutReducerValue
})(DeliveryForm)