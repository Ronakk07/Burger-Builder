import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends React.Component {

    // componentDidUpdate() {
    //     console.log('[OrderSummary] will update');
    // }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(ingredientKey => {
                return (
                    <li key={ingredientKey}>
                        <span style={{ textTransform: 'capitalize' }}>
                            {ingredientKey}: {this.props.ingredients[ingredientKey]}
                        </span>
                    </li>
                );
            });

        return (   
            <Aux>
                <h2>Your Order</h2>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout ?</p>
                <Button buttonType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button buttonType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        );
}
};

export default OrderSummary;