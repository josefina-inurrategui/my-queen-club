import React from 'react'

const Preview = ({fotos}) => {
    return (
        <>
          {coverPhotoGallery && coverPhotoGallery?.map((or) => {
            return (
              <>
                <div className='position-relative'>
                  <img className={styles.image} key={or} src={or} alt={or} />
                  <div className={`position-absolute ${styles.btnDelete}`} onClick={() => handleDeleteCover(or)}> x </div>
                </div>
              </>
            )
          })
          }
            
        </>
    )
}

export default Preview