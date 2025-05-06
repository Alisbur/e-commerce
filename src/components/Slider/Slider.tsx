import { FC, useState, useCallback } from 'react';
import styles from './Slider.module.scss';
import ArrowSide from 'components/icons/ArrowSide';
import { TProductImageModel } from 'store/models';

type TSliderProps = {
  images: TProductImageModel[];
};

const Slider: FC<TSliderProps> = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const handleNextImage = useCallback(
    () => setCurrentImage(currentImage < images.length - 1 ? currentImage + 1 : 0),
    [images, currentImage],
  );

  const handlePrevImage = useCallback(
    () => setCurrentImage(currentImage > 0 ? currentImage - 1 : images.length - 1),
    [images, currentImage],
  );

  if (!images || !Array.isArray(images) || !images.length) return null;

  return (
    <div className={styles.slider}>
      <img
        src={images[currentImage].formats?.medium?.url ?? ''}
        alt={images[currentImage].alternativeText ?? 'Product image'}
        className={styles.slider__image}
      />
      {images.length && (
        <>
          <div role="button" className={styles.slider__button_left} onClick={handleNextImage}>
            <ArrowSide width={30} height={30} side="left" />
          </div>
          <div role="button" className={styles.slider__button_right} onClick={handlePrevImage}>
            <ArrowSide width={30} height={30} side="right" />
          </div>
        </>
      )}
    </div>
  );
};

export default Slider;
