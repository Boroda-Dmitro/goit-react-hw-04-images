import { Triangle } from 'react-loader-spinner';

export const Loader = () => {
    return (
        <Triangle
          height="80"
          width="100%"
          color="#3f51b5"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      )
}
