import PropTypes from 'prop-types'

function ModalFooter({ children, showEscHint = true }) {
  return (
    <div className="modal-footer-wrapper">
      <div className="modal-footer">
        {children}
      </div>
      {showEscHint && (
        <div className="text-muted text-center mt-2" style={{ fontSize: '0.875rem' }}>
          <kbd>ESC</kbd> para fechar
        </div>
      )}
    </div>
  )
}

ModalFooter.propTypes = {
  children: PropTypes.node.isRequired,
  showEscHint: PropTypes.bool
}

export default ModalFooter