import { Component } from 'react';
import { fetchImages } from '../servises/pixabay_Api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import { Modal } from './Modal/Modal';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';

export class App extends Component {
  state = {
    search: '',
    images: [],
    page: 1,
    isLoading: false,
    total: 0,
    error: null,
    showModal: false,
    imageInfo: { modalImage: '', tags: '' },
  };

  componentDidUpdate(_, prevState) {
    const { search, page } = this.state;
    if (search !== prevState.search || prevState.page !== page) {
      this.getImages(search, page);
    }
  }

  onSubmit = searchImages => {
    this.setState({ search: searchImages, page: 1, images: [] });
  };

  getImages = async (search, page) => {
    this.setState({ isLoading: true });
    try {
      const { Arr, total } = await fetchImages(search, page);
      if (Arr.length === 0) {
        return toast.error(`No images on search ${search}`);
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...Arr],
        total,
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onLoadMoreClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onOpenModal = (modalImage, tags) => {
    this.setState({ showModal: true, imageInfo: { modalImage, tags } });
  };

  onCloseModal = () => {
    this.setState({
      showModal: false,
      imageInfo: { modalImage: '', tags: '' },
    });
  };

  render() {
    const {
      images,
      isLoading,
      total,
      error,
      showModal,
      imageInfo: { modalImage, tags },
    } = this.state;
    const totalPage = total / images.length;
    return (
      <section className={css.App}>
        <Searchbar onSubmit={this.onSubmit} />
        {images.length > 0 && (
          <ImageGallery images={images} onOpenModal={this.onOpenModal} />
        )}
        {isLoading && <Loader />}
        {totalPage > 1 && !isLoading && images.length > 0 && (
          <Button loadMore={this.onLoadMoreClick} />
        )}
        {error && <h2>An error occurred on the server</h2>}
        {showModal && (
          <Modal
            onCloseModal={this.onCloseModal}
            modalImage={modalImage}
            tags={tags}
          />
        )}
        <ToastContainer position="top-center" autoClose={2000} theme="light" />
      </section>
    );
  }
}
