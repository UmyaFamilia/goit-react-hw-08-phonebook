import css from './ContactList.module.css';

import { useDispatch } from 'react-redux';
import { fetchContacts, deleteContact } from '../redux/reduseContact';
import { useSelector } from 'react-redux';
import React, { useEffect } from 'react';
export function ContactList() {
  let array = useSelector(state => state.addgetContact.contacts.items);
  let filterValue = useSelector(state => state.addgetContact.filter);
  const { isLoading } = useSelector(state => state.addgetContact.contacts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const remove = id => {
    dispatch(deleteContact(id));
  };

  const arrayFiltration = () => {
    if (filterValue.filter) {
      return array.filter(e =>
        e.name.toLowerCase().includes(filterValue.filter)
      );
    } else {
      return array;
    }
  };

  return (
    <>
      <h4>Contacts:</h4>
      {isLoading ? (
        <p> loading</p>
      ) : (
        <ul>
          {array ? (
            arrayFiltration().map(a => (
              <li key={a.id} className={css.number}>
                {`name:  ${a.name} number:  ${a.number}  id ${a.id}`}
                <button
                  onClick={() => {
                    remove(a.id);
                  }}
                  className={css.button}
                >
                  delete
                </button>
              </li>
            ))
          ) : (
            <>nothing</>
          )}
        </ul>
      )}
    </>
  );
}
