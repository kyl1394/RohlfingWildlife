import React from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../../actions';
import './ImageOverlay.css';

const MOUNT_8_10 = 6.0;
const MOUNT_16_20 = 11.50;
const PROFIT_MARGIN = 3.2;
const COST_8_10 = 3.33;
const COST_16_20 = 12.89;

const ImageOverlay = ({ items, total, selectedPhotoTitle, addToCart }) => (
    <div id="imageOverlay" className="modal">

        <span className="close" onClick={() =>  hideModal() }>&times;</span>

        <div className="overlay-content">
          <div className="image-container">
            <div className="obj">
              <img className="modal-content" alt={selectedPhotoTitle} id="img01" style={{maxWidth: '100%', maxHeight: '100%'}}/>
            </div>
          </div>
          <div className="image-info">
            <h1 id="caption" className="caption" style={{width: '800px'}}>{selectedPhotoTitle}</h1>
            <div className="pricing-container">
              <div className="frame-options-container">
                <div className="frame-options">
                  <div className="option-container">
                    <div className="option-8-10" onClick={() => addToCart(Math.random()%100, "8x10 - " + selectedPhotoTitle, getCost(COST_8_10, MOUNT_8_10))}>
                      <div>8x10</div>
                      <div>{asCurrency(getCost(COST_8_10, MOUNT_8_10))}</div>
                    </div>
                  </div>
                  <div className="option-container">
                    <div className="option-16-20" onClick={() => addToCart(Math.random()%100, "16x20 - " + selectedPhotoTitle, getCost(COST_16_20, MOUNT_16_20))}>
                      <div>16x20</div>
                      <div>{asCurrency(getCost(COST_16_20, MOUNT_16_20))}</div>
                    </div>
                  </div>
                </div>
                <div style={{width: '100%', paddingBottom: '50px'}}>
                  <div style={{paddingBottom: '10px'}}>
                      Selected Items:
                      {
                        getSelectedItemsHTML(items)
                      }
                  </div>
                  <div>
                    Total: {asCurrency(total)}
                  </div>
                </div>
              </div>
              <div id="paypal-button-container" className="paypal-button-container"></div>
            </div>
          </div>
        </div>
      </div>
);

const mapStateToProps = state => ({
    items: state.cart.itemList,
    total: state.cart.total,
    selectedPhotoTitle: state.photos.selectedPhotoTitle
});

const mapDispatchToProps = dispatch => ({
    addToCart: (id, name, cost) => dispatch(addToCart(id, name, cost))
});

function getSelectedItemsHTML(items) {
  var itemsHTML = [];
  var count = 0;
  items.forEach(item => {
    itemsHTML.push(
        <div style={{paddingLeft: '15px'}} key={item.name + "-" + count++}>{item.name}</div>
    );
  });

  return itemsHTML;
}

function asCurrency(num) {
    return "$" + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function getCost(cost, mount) {
    return ((cost + mount)*PROFIT_MARGIN);
  }
  
  export function hideModal() {
    var modal = document.getElementById("imageOverlay");
    modal.style.display = "none";
  };
  
  export function showModal(src, caption) {
    var modal = document.getElementById("imageOverlay");
    var modalImg = document.getElementById("img01");
  
    if (!document.getElementById('paypal-button-container').hasChildNodes()) {
      window.paypal.Buttons({
          // Set up the transaction
          createOrder: function(data, actions) {
              return actions.order.create({
                  purchase_units: [{
                      amount: {
                          value: 0.01
                      }
                  }]
              });
          },
  
          // Finalize the transaction
          onApprove: function(data, actions) {
              return actions.order.capture().then(function(details) {
                  // Show a success message to the buyer
                  alert('Transaction completed by ' + details.payer.name.given_name + '!');
                  hideModal();
              });
          }
      }).render('#paypal-button-container');
    }
  
    modal.style.display = "block";
    modalImg.src = src;
  }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ImageOverlay);