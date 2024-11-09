type LoaderProps = {
  className?: string;
};

function Loader({ className }: LoaderProps) {
  return (
    <span
      className={`inline-block w-[40px] h-[40px] border-4 border-primary-light border-b-transparent rounded-full animate-spin ${className ?? ''}`}
    ></span>
  );
}

export default Loader;
