import './InfoToolTip.css';

function InfoTooltip( { isPopupOpened, popupTitle, onClose } ) {
    
  return (
    <div className={`popup ${ isPopupOpened && 'popup_visible'}`}>
      <div className="popup__content">
        <button 
          className="popup__close-button" 
          type="button"
          onClick={ onClose }
        >
        </button>
        <h3 
          className="popup__title">
          { popupTitle }
        </h3>
      </div>
    </div>
  )
}
  
export default InfoTooltip;
