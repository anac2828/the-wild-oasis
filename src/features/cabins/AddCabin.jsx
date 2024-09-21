import Button from '../../ui/Button';
import CreateCabinForm from './CreateCabinForm';
import Modal from '../../ui/Modal';

// opens='cabin-form' and name='cabin-form' link the button and the window together in case there is more than one modal window

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens='cabin-form'>
          <Button>Add new Cabin</Button>
        </Modal.Open>
        <Modal.Window name='cabin-form'>
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
  // const [isOpenModal, setisOpenModal] = useState(false); //Modal state should be handled in the modal component like above.
  // return (
  //   <div>
  //     <Button onClick={() => setisOpenModal((isOpenModal) => !isOpenModal)}>
  //       Add new cabin
  //     </Button>
  //     {isOpenModal && (
  //       <Modal onClose={() => setisOpenModal(false)}>
  //         <CreateCabinForm onCloseModal={() => setisOpenModal(false)} />
  //       </Modal>
  //     )}
  //   </div>
  // );
}

export default AddCabin;
