const photos = (state = { selectedPhotoTitle: "" }, action) => {
    switch (action.type) {
        case 'SELECT_PHOTO':
            console.log(action.title);
            return {
                selectedPhotoTitle: action.title
            }
        default:
            return state;
    }
}

export default photos;