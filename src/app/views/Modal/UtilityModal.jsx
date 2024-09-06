import CloseIcon from '@mui/icons-material/Close';
import { Card, IconButton } from '@mui/material';
import Modal from '@mui/material/Modal';
import { setUtilityModal } from 'app/redux/actions/ModalActions';
import { useDispatch, useSelector } from 'react-redux';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    minWidth: 300,
    maxWidth: 600,
    maxHeight: '90%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflow: 'auto',
};

const UtilityModal = ({ children }) => {
    const open = useSelector((state) => state.modal.openUtility);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(setUtilityModal(false));
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Card sx={style}>
                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <>{children}</>
            </Card>
        </Modal>
    );
};

export default UtilityModal;
