import React from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../apis/axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../.././hoc/WithErrorHandler';

const INGREDIENTS_PRICE = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}

class BurgerBuilder extends React.Component {

    state = {
        ingredients: null,
        totalPrize: 5,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: null
    }

    componentDidMount() {
        axios.get('https://burgerapp-531d2.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            }).catch(error => {
                this.setState({ error: true });
            });
    }

    updatedPurchaseState = (updatedIngredients) => {
        // const updatedIngredients = { ...this.state.ingredients };
        const sum = Object.keys(updatedIngredients)
            .map(ingredientKey => {
                return updatedIngredients[ingredientKey];
            })
            .reduce((sum, currentElement) => {
                return sum + currentElement;
            },0);
        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const previousStateCount = this.state.ingredients[type];
        const updatedCount = previousStateCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrize;
        const newPrize = oldPrice + priceAddition;
        this.setState({ totalPrize: newPrize, ingredients: updatedIngredients });
        this.updatedPurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const previousStateCount = this.state.ingredients[type];
        if (previousStateCount <= 0) {
            return 
        }
        const updatedCount = previousStateCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const prizeDeduction = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrize;
        const newPrize = oldPrice - prizeDeduction;
        this.setState({ totalPrize: newPrize, ingredients: updatedIngredients });
        this.updatedPurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.price,
            customer: {
                name: 'Ronak khangaonkar',
                address: {
                    street: 'Mumbai',
                    zipcode: 41351,
                    country: 'India'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false, purchasing: false });
            }).catch(error => {
                this.setState({ loading: false, purchasing: false });
            });
    }

    render() {
        
        const disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!!!</p> : <Spinner />;

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrize}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients}
                price={this.state.totalPrize}
                purchaseCancelled={this.purchaseCancelHandler} 
                purchaseContinued={this.purchaseContinueHandler}
            />
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);