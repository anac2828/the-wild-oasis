import styled from 'styled-components'
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2'

//
import { useDeleteCabin } from './useDeleteCabin'
import { useCreateCabin } from './useCreateCabin'
//
import { formatCurrency } from '../../utils/helpers'
//
import Modal from '../../ui/Modal'
import CreateCabinForm from './CreateCabinForm'
import ConfirmDelete from '../../ui/ConfirmDelete'
import Table from '../../ui/Table'
import Menus from '../../ui/Menus'

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`

// ** COMPONENT
function CabinRow({ cabin }) {
  // Cabin data passed by the Table Component
  const {
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    id: cabinId,
    description,
  } = cabin
  // Custom hooks to create and delete cabins
  const { isDeleting, deleteCabin } = useDeleteCabin()
  const { isCreating, createCabin } = useCreateCabin()

  // Creates a copy of a cabin
  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    })
  }

  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        {/* Open cabin form to edit */}
        {/* Modal provides the context to the children inside the Modal Window. Modal is not a styled component*/}
        <Modal>
          {/* Menu is a styled div component that holds the toggle button and list */}
          <Menus.Menu>
            {/* Three dots button to open and close the Menus.List */}
            <Menus.Toggle id={cabinId} />

            {/* LIST OF BUTTONS */}
            {/* To open Menus.List (ul) cabinId must match the Toggle cabinId */}
            <Menus.List id={cabinId}>
              {/* Menus.Button is inside an li element */}

              {/* DUPLICATE CABIN - This does not open a modal window, so it does not need a Modal.Open*/}
              <Menus.Button
                icon={<HiSquare2Stack />}
                onClick={handleDuplicate}
                disaled={isCreating}
              >
                Duplicate
              </Menus.Button>

              {/* BUTTONS TO OPEN MODAL WINDOW - Model.Open is not a styled component*/}
              {/* Edit cabin button */}
              <Modal.Open windowNameToOpen='cabin-form'>
                {/* When the button is clicked the CreateCabinForm window will open and the Menus.List will close. This works because the button is inside the Modal.Open component and calls both the open() in the Modal.Open and handleClick() in the Menus.Button  */}
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              {/* Delete cabin button */}
              <Modal.Open windowNameToOpen='delete'>
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            {/* MODAL WIDOWS  */}
            {/* Edit cabin form */}
            <Modal.Window windowName='cabin-form'>
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            {/* Delete cabin confirmation window */}
            <Modal.Window windowName='delete'>
              <ConfirmDelete
                resourceName='cabins'
                disabled={isDeleting}
                onConfirm={() => deleteCabin(cabinId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  )
}

export default CabinRow
