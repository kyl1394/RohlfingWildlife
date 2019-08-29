export const addToCart = (id, name, cost) => ({
    type: 'ADD_TO_CART',
    id,
    name,
    cost
})

export const selectPhoto = (title) => ({
    type: 'SELECT_PHOTO',
    title
})