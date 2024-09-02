interface PopUpType {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const PopUp = ({ show, onClose, children }: PopUpType) => {
  if (!show) {
    return null;
  }

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          x
        </button>
        {children}
      </div>
      <style jsx>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .popup-content {
          background: white;
          padding: 20px;
          border-radius: 5px;
          position: relative;
          min-width: 300px;
          max-width: 60%;
          width: 100%;
          box-sizing: border-box;
        }

        .close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          border: none;
          background: none;
          font-size: 20px;
          cursor: pointer;
        }

        @media (max-width: 600px) {
          .popup-content {
            max-width: 90%;
            padding: 15px;
          }

          .close-button {
            font-size: 18px;
            top: 8px;
            right: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default PopUp;
