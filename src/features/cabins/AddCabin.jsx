import Button from '../../ui/Button';
import CreateCabinForm from './CreateCabinForm';
import Modal from '../../ui/Modal';

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens='cabin-form'>
          {/* will be cloned to give it access to the open handler */}
          <Button>Add new Cabin</Button>
        </Modal.Open>
        <Modal.Window name='cabin-form'>
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
  //   const [isOpenModal, setisOpenModal] = useState(false);
  //   return (
  //     <div>
  //       <Button onClick={() => setisOpenModal((isOpenModal) => !isOpenModal)}>
  //         Add new cabin
  //       </Button>
  //       {isOpenModal && (
  //         <Modal onClose={() => setisOpenModal(false)}>
  //           <CreateCabinForm onCloseModal={() => setisOpenModal(false)} />
  //         </Modal>
  //       )}
  // </div>
  //   );
}

export default AddCabin;
