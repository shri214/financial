import React from 'react';
import './style.scss';
function Loader() {
  return (
    <div className="wrapper">
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loader;
