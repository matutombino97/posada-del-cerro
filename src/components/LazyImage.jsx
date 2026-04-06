import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

/**
 * Componente para lazy loading de imágenes con blur-up effect
 */
export const LazyImage = ({
  src,
  alt,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzMzMzMzMyIvPjwvc3ZnPg==',
  className = '',
  onLoad,
}) => {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <img
      ref={ref}
      src={isVisible ? src : placeholder}
      alt={alt}
      className={`transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-75'} ${className}`}
      onLoad={onLoad}
      loading="lazy"
      decoding="async"
    />
  );
};

export default LazyImage;
