import React, {useEffect} from 'react';

function Formula({ latex }) {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise();
    }
  }, [latex]);

  return <div>{latex}</div>;
}

export default Formula;