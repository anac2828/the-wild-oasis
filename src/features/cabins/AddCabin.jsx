import Button from '../../ui/Button'
import CreateCabinForm from './CreateCabinForm'
import Modal from '../../ui/Modal'

// Modal Component displays in the cabins page
function AddCabin() {
  return (
    // <div> is too keep the button from expanding across the page
    <div>
      <Modal>
        {/* opens props links the button to the window it should open (in case there are muliple modal windows in the same modal component*/}
        <Modal.Open windowNameToOpen='cabin-form'>
          <Button>Add new Cabin</Button>
        </Modal.Open>
        <Modal.Window windowName='cabin-form'>
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  )
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

export default AddCabin
