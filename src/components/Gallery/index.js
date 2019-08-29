import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import PhotoItem from '../Photos/PhotoItem';
import './Gallery.css';

const Gallery = () => (
  <div className="gallery">
    <h2>
      Kyle Rohlfing - Wildlife Photographer
      <br />Omaha, Nebraska USA
    </h2>
    <hr style={{margin: '20px 0px'}} />
    <Photos />
  </div>
)

class GalleryBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
          <div>Something went wrong...</div>
        )}
      </div>
    )
  }
}

const Photos = withFirebase(GalleryBase);

const PhotoGrid = ({ photos }) => (
  <div className="gallery-grid">
    {photos.map(photo => (
      <PhotoItem key={photo.uid} name={photo.name} date={photo.date} src={photo.src} />
    ))}
  </div>
);

export default Gallery;
