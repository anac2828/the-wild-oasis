import styled from 'styled-components';
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiTrash,
} from 'react-icons/hi2';
import { format, isToday } from 'date-fns';
import { useNavigate } from 'react-router-dom';

import { useDeleteBooking } from './useDeleteBooking';

import { formatCurrency } from '../../utils/helpers';
import { formatDistanceFromNow } from '../../utils/helpers';
import useCheckout from '../check-in-out/useCheckout';

import Tag from '../../ui/Tag';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
`;

const Paid = styled.div`
  font-weight: ${(props) => (props.$paid ? '600' : '')};
`;

function BookingRow({
  booking: {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    isPaid,
    guests: { fullName: guestName, email }, //Renames the guests data
    cabins: { name: cabinName }, //Renames the cabins data
  },
}) {
  const { isDeleting, deleteBooking } = useDeleteBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const navigate = useNavigate();
  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  }; //Used to update the color of the Tag component

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      {/* Guest info */}
      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      {/* Booking Date */}
      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}{' '}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), 'MMM dd yyyy')} &mdash;{' '}
          {format(new Date(endDate), 'MMM dd yyyy')}
        </span>
      </Stacked>

      {/* Booking status */}
      <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>

      {/* Booking paid status */}
      <Paid $paid={isPaid}>{isPaid ? 'Paid' : 'Not Paid'}</Paid>

      {/* Booking amount */}
      <Amount>{formatCurrency(totalPrice)}</Amount>

      {/* BUTTONS TO CHECK IN AND OUT OR DELETE BOOKING */}
      {/* The Modal component is need because the delete button will open a window */}
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            {/* SEE DETAILS */}
            <Menus.Button
              icon={<HiArrowDownOnSquare />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              See details
            </Menus.Button>

            {/* CHECKIN */}
            {status === 'unconfirmed' && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Check in
              </Menus.Button>
            )}

            {/* CHECKOUT */}
            {status === 'checked-in' && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkout(bookingId)}
                disabled={isCheckingOut}
              >
                Check out
              </Menus.Button>
            )}

            {/* DELETE */}
            <Modal.Open opens='delete'>
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        {/* CONFIRM DELETE MODAL WINDOW*/}
        <Modal.Window name='delete'>
          <ConfirmDelete
            resourceName='bookings'
            disabled={isDeleting}
            onConfirm={() => deleteBooking(bookingId)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
