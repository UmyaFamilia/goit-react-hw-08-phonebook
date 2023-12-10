import css from './Filter.module.css';
import { useDispatch } from 'react-redux';
import { findNecessary } from '../redux/reduseContact';
export const Filter = () => {
  const dispatch = useDispatch();
  const find = ({ target: { value } }) => {
    dispatch(findNecessary({ filter: value.toLowerCase() }));
  };
  return (
    <div className={css.filterCover}>
      <label htmlFor="find">find contacts by name</label>
      <input className={css.inpute} name="find" type="text" onChange={find} />
    </div>
  );
};
