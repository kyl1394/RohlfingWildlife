import React from 'react';
import { connect } from 'react-redux';
import { selectPhoto } from '../../actions';
import { showModal } from '../ImageOverlay';

const PhotoItem = ({ name, date, src, selectPhoto }) => (
    <div className="photo" onClick={() => {
      selectPhoto(name);
      showModal(src, name)
    }}>
      <img src={src} alt={name} className='gallery-grid-img' />
      <span>
        <h4>{name}</h4>
        <h5>{date}</h5>
      </span>
    </div>
  )
  
  const mapStateToProps = state => ({
    items: state.cart.itemList,
    total: state.cart.total
  });
  
  const mapDispatchToProps = dispatch => ({
    selectPhoto: (title) => dispatch(selectPhoto(title))
  });

  export default connect(
      mapStateToProps,
      mapDispatchToProps
  )(PhotoItem)