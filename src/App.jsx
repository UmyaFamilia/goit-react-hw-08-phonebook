import { ContactList } from './components/ContactList/ContactLIst';

import { Form } from './components/Form/Form';
import { Filter } from './components/Filter/Filter';

export function App() {
  return (
    <div className="container">
      <Form />
      <Filter />
      <ContactList />
      {/* {isLoading ? <p>is Loading...</p> : } */}
    </div>
  );
}
