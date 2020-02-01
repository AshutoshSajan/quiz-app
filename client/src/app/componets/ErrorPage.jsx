import React from 'react';

export default function ErrorPage() {
  return (
    <div
      style={{
        height: '95vh',
        width: '100%',
        position: 'relative',
        textAlign: 'center'
      }}
    >
      <img
        src='https://3kllhk1ibq34qk6sp3bhtox1-wpengine.netdna-ssl.com/wp-content/uploads/2017/12/44-incredible-404-error-pages@3x-1560x760.png'
        alt='404 error page'
        style={{ height: '100%', width: '100%' }}
      />
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '10% ',
          transform: 'translateX(-50%)'
        }}
      >
        <h1 className='title is-1'>Page Not Found...</h1>
      </div>
    </div>
  );
}
