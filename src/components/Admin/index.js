import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import { AuthUserContext } from '../Session';
import SignInPage from '../SignIn';

import '../Gallery/Gallery.css';

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      maxOrder: 0
    };

    this.updateMaxOrder = this.updateMaxOrder.bind(this);
  }

  updateMaxOrder(newValue) {
    this.setState({ maxOrder: newValue });
  }

  render() {
    const { maxOrder } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div className="gallery">
            <h1>Admin Page</h1>
            {authUser ? (
              <div>
                <UploadPhotoForm maxOrder={maxOrder}/>
                <hr style={{margin: '20px 0px'}} />
                <Photos maxOrderCallback={this.updateMaxOrder} />
              </div>
            ) : (
              <SignInPage />
            )}
          </div>
        )
      }
      </AuthUserContext.Consumer>
    );
  };
}

class EditableGalleryBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      maxOrder: 0,
      photos: [],
    };
  }

  componentDidMount() {
    this.props.firebase.getPhotos().onSnapshot(snapshot => {
      const photoObject = snapshot.docs;

      if (photoObject) {
        const photoGrid = photoObject.map(key => ({
          ...key.data(),
          uid: key.id
        }));

        this.setState({
          photos: photoGrid,
        });

        this.props.maxOrderCallback(photoObject.length);
      } else {
        this.setState({ photos: null });
      }
    });
  }

  componentWillUnmount() {
    // this.props.firebase.photos().off();
  }

  render() {
    const { photos } = this.state;

    return (
      <div>
        {photos ? (
          <PhotoGrid photos={photos} />
        ) : (
          <div>Empty</div>
        )}
      </div>
    );
  }
}

const Photos = withFirebase(EditableGalleryBase);

const PhotoGrid = ({ photos }) => (
  <div className="gallery-grid">
    {photos.map(photo => (
      <PhotoItem key={photo.uid} name={photo.name} date={photo.date} src={photo.src} order={photo.order} />
    ))}
  </div>
);


class PhotoItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: false,
    };
  }

  render() {
    const { src, name, date, order } = this.props;

    return (
      <div className="photo">
        <img src={src} alt={name} className='gallery-grid-img' />
        <span>
          <h4>#{order} - {name}</h4>
          <h5>{date}</h5>
        </span>
      </div>
    );
  };
}

const INITIAL_STATE = {
  name: '',
  date: '',
  startUpdateOrder: 0,
}

class UploadButton extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  setRef = ref => {
    this.file = ref;
  }

  upload = () => {
    const { name, date, startUpdateOrder } = this.state;
    const file = this.file.files[0];
    const mainImage = this.props.firebase.storage.child(this.file.files[0].name);

    mainImage.put(file).then((snapshot) => {
      mainImage.getDownloadURL().then((url) => {
        this.props.firebase.doUploadPhoto(name, date, url, parseInt(startUpdateOrder))
      }).then(() => {
        this.setState({ ...INITIAL_STATE });
      })
    });
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { name, date, startUpdateOrder } = this.state;
    const { maxOrder } = this.props;

    const isInvalid = name === '' || date === null;

    return (
      <span>
        <input type='file' text='Choose New Photo' ref={this.setRef} style={{padding: '0px 10px'}}/>
        <label style={{padding: '0px 10px'}}>
          <span style={{padding: '0px 10px'}}>Name:</span>
          <input name="name" type="text" value={name} onChange={this.onChange} style={{padding: '0px 10px'}} />
        </label>
        <label style={{padding: '0px 10px'}}>
          <span style={{padding: '0px 10px'}}>Date:</span>
          <input name="date" type="date" value={date} onChange={this.onChange} style={{padding: '0px 10px'}} />
        </label>
        <label style={{padding: '0px 10px'}}>
          <span style={{padding: '0px 10px'}}>Order (&lt;{maxOrder}):</span>
          <input name="startUpdateOrder" type="number" max={maxOrder} min={0} value={startUpdateOrder} onChange={this.onChange} style={{padding: '0px 10px'}} />
        </label>
        <button type="submit" onClick={this.upload} disabled={isInvalid} style={{margin: '0px 25px', padding: '2px 10px'}}>Upload</button>
      </span>
    );
  }
}

const UploadPhotoForm = withFirebase(UploadButton);

export default AdminPage;
