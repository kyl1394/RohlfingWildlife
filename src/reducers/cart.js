const cart = (state = {itemList: [], total: 0}, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                itemList: [
                    ...state.itemList,
                    {
                        id: action.id,
                        name: action.name,
                        cost: action.cost
                    }
                ],
                total: state.total + action.cost
            }
        default:
            return state;
    }
}

export default cart;